export class AuthService {
  async register(email: string, username: string, password: string) {
    // TODO: Hash password, create user, generate tokens
    throw new Error('Not implemented');
  }

  async login(email: string, password: string) {
    // TODO: Verify credentials, generate tokens
    throw new Error('Not implemented');
  }

  async refresh(refreshToken: string) {
    // TODO: Validate refresh token, rotate tokens
    throw new Error('Not implemented');
  }

  async logout(userId: string) {
    // TODO: Invalidate refresh tokens
    throw new Error('Not implemented');
  }
}
