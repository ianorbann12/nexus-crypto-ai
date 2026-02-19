export function calculatePnL(
  currentPrice: number,
  avgBuyPrice: number,
  amount: number,
): { pnl: number; pnlPercent: number } {
  const pnl = (currentPrice - avgBuyPrice) * amount;
  const pnlPercent = avgBuyPrice > 0 ? ((currentPrice - avgBuyPrice) / avgBuyPrice) * 100 : 0;
  return { pnl, pnlPercent };
}

export function calculatePortfolioAllocation(
  holdings: Array<{ value: number }>,
): Array<{ percentage: number }> {
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  if (totalValue === 0) return holdings.map(() => ({ percentage: 0 }));
  return holdings.map((h) => ({
    percentage: (h.value / totalValue) * 100,
  }));
}
