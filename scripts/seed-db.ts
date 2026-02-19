import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgresql://nexus:nexus_dev@localhost:5432/nexus_crypto';

async function seed() {
  const sql = postgres(connectionString);

  console.log('Seeding database...');

  // Seed education content
  await sql`
    INSERT INTO education_content (title, slug, category, difficulty, body, estimated_minutes, "order")
    VALUES
      ('What is Bitcoin?', 'what-is-bitcoin', 'basics', 'beginner', 'Bitcoin is a decentralized digital currency...', 5, 1),
      ('Understanding Blockchain', 'understanding-blockchain', 'basics', 'beginner', 'A blockchain is a distributed ledger...', 8, 2),
      ('Introduction to DeFi', 'intro-to-defi', 'defi', 'intermediate', 'Decentralized Finance (DeFi) refers to...', 10, 3),
      ('Technical Analysis Basics', 'ta-basics', 'technical_analysis', 'beginner', 'Technical analysis is the study of price charts...', 12, 4),
      ('Reading Candlestick Charts', 'candlestick-charts', 'technical_analysis', 'beginner', 'Candlestick charts show the open, high, low, close...', 8, 5),
      ('How AI Predicts Crypto Prices', 'ai-crypto-predictions', 'ai_ml', 'intermediate', 'Machine learning models can analyze patterns...', 15, 6)
    ON CONFLICT (slug) DO NOTHING
  `;

  console.log('Database seeded successfully!');
  await sql.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
