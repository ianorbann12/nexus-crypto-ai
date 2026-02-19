import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgresql://nexus:nexus_dev@localhost:5432/nexus_crypto';
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
