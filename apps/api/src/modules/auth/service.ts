import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { users, refreshTokens } from '../../db/schema';
import { db } from '../../db';

const SALT_ROUNDS = 12;
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

export class AuthService {
  constructor(private app: FastifyInstance) {}

  async register(email: string, username: string, password: string) {
    const existingEmail = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existingEmail.length > 0) {
      throw new AuthError(409, 'Email already registered');
    }

    const existingUsername = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username.toLowerCase()))
      .limit(1);

    if (existingUsername.length > 0) {
      throw new AuthError(409, 'Username already taken');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const [newUser] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        passwordHash,
      })
      .returning();

    const accessToken = this.generateAccessToken(newUser);
    const refreshToken = await this.createRefreshToken(newUser.id);

    return {
      user: sanitizeUser(newUser),
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      throw new AuthError(401, 'Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new AuthError(401, 'Invalid email or password');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.createRefreshToken(user.id);

    return {
      user: sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  }

  async refresh(token: string) {
    const [storedToken] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .limit(1);

    if (!storedToken) {
      throw new AuthError(401, 'Invalid refresh token');
    }

    if (storedToken.expiresAt < new Date()) {
      await db.delete(refreshTokens).where(eq(refreshTokens.id, storedToken.id));
      throw new AuthError(401, 'Refresh token expired');
    }

    // Token rotation: delete old, issue new
    await db.delete(refreshTokens).where(eq(refreshTokens.id, storedToken.id));

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, storedToken.userId))
      .limit(1);

    if (!user) {
      throw new AuthError(401, 'User not found');
    }

    const accessToken = this.generateAccessToken(user);
    const newRefreshToken = await this.createRefreshToken(user.id);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: string) {
    await db.delete(refreshTokens).where(eq(refreshTokens.userId, userId));
  }

  async getUserById(userId: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new AuthError(404, 'User not found');
    }

    return sanitizeUser(user);
  }

  private generateAccessToken(user: { id: string; email: string; username: string }): string {
    return this.app.jwt.sign(
      { sub: user.id, email: user.email, username: user.username },
      { expiresIn: ACCESS_TOKEN_EXPIRY },
    );
  }

  private async createRefreshToken(userId: string): Promise<string> {
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    await db.insert(refreshTokens).values({ userId, token, expiresAt });

    return token;
  }
}

function sanitizeUser(user: typeof users.$inferSelect) {
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

export class AuthError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}
