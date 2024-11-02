

export async function calculateMatrixChainOrder(dimensions, updateAnimation) {
  const n = dimensions.length - 1;
  const minCostTable = Array.from({ length: n }, () => Array(n).fill(Infinity));
  const splitIndexTable = Array.from({ length: n }, () => Array(n).fill(null));

  for (let i = 0; i < n; i++) {
    minCostTable[i][i] = 0;
    await updateAnimation(i, i, 1); // Line 1: Initialization
  }

  for (let L = 2; L <= n; L++) {
    for (let i = 0; i <= n - L; i++) {
      const j = i + L - 1;
      await updateAnimation(i, j, 2); // Line 2: Outer loop
      for (let k = i; k < j; k++) {
        const q = minCostTable[i][k] + minCostTable[k + 1][j] + dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
        if (q < minCostTable[i][j]) {
          minCostTable[i][j] = q;
          splitIndexTable[i][j] = k;
        }
        await updateAnimation(i, j, 3); // Line 3: Inner loop
      }
    }
  }

  return { minCostTable, splitIndexTable };
}
