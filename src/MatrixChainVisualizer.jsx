import React, { useState } from "react";
import CodeHighlighter from "./CodeHighlighter";
import DpTables from "./DpTables";
import "./MatrixChainVisualizer.css"; 

const algorithmCode = [
  "function matrixChainOrder(p) {",
  "  let n = p.length - 1;",
  "  let m = Array(n + 1).fill().map(() => Array(n + 1).fill(Infinity));",
  "  let s = Array(n + 1).fill().map(() => Array(n + 1).fill(0));",
  "  for (let i = 1; i <= n; i++) {",
  "    m[i][i] = 0;",
  "  }",
  "  for (let L = 2; L <= n; L++) {",
  "    for (let i = 1; i <= n - L + 1; i++) {",
  "      let j = i + L - 1;",
  "      for (let k = i; k < j; k++) {",
  "        let q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];",
  "        if (q < m[i][j]) {",
  "          m[i][j] = q;",
  "          s[i][j] = k;",
  "        }",
  "      }",
  "    }",
  "  }",
  "  return { m, s };",
  "}",
];

const MatrixChainVisualizer = () => {
  const [dimensions, setDimensions] = useState([]);
  const [minCostTable, setMinCostTable] = useState([[]]);
  const [splitIndexTable, setSplitIndexTable] = useState([[]]);
  const [currentLine, setCurrentLine] = useState(-1);
  const [currentCell, setCurrentCell] = useState({});
  const [speed, setSpeed] = useState(500);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const handleDimensionsChange = (e) => {
    const dims = e.target.value.split(",").map(Number);
    setDimensions(dims);
    // Initialize DP tables with n x n dimensions
    const n = dims.length - 1;
    setMinCostTable(Array(n).fill().map(() => Array(n).fill(Infinity)));
    setSplitIndexTable(Array(n).fill().map(() => Array(n).fill(0)));
  };

  const animateMatrixChainOrder = async () => {
    const n = dimensions.length - 1; // This should give the number of matrices
    if (n < 1) {
      alert("Please enter at least two dimensions.");
      return;
    }

    setIsAnimating(true);
    const { m, s } = await matrixChainOrder(dimensions);
    setMinCostTable(m);
    setSplitIndexTable(s);
    setIsAnimating(false);
  };

  const matrixChainOrder = async (p) => {
    const n = p.length - 1; // This should give the number of matrices
    // Initialize the DP tables
    const m = Array(n).fill().map(() => Array(n).fill(Infinity));
    const s = Array(n).fill().map(() => Array(n).fill(0));

    // Populate the DP tables
    for (let i = 0; i < n; i++) {
      m[i][i] = 0; // Cost is zero when multiplying one matrix
      await animateStep(4, { i, j: i });
      setMinCostTable([...m]);
    }

    for (let L = 2; L <= n; L++) { // L is the chain length
      await animateStep(5, { L });
      for (let i = 0; i < n - L + 1; i++) {
        const j = i + L - 1; // Correctly calculate j
        await animateStep(6, { i, j });
        for (let k = i; k < j; k++) {
          // Calculate cost of multiplying the chain
          const q = m[i][k] + m[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
          await animateStep(9, { i, j, k, q });
          if (q < m[i][j]) {
            m[i][j] = q; // Update the minimum cost
            s[i][j] = k; // Update the split index
            await animateStep(11, { i, j, k });
          }
          setMinCostTable([...m]);
          setSplitIndexTable([...s]);
        }
      }
    }
    return { m, s };
  };

  const animateStep = async (line, cell = {}) => {
    setCurrentLine(line);
    setCurrentCell(cell);
    await new Promise((resolve) => setTimeout(resolve, speed));
  };

  return (
    <div className="visualizer-container">
      <div className="controls-section">
        <h1>Matrix Chain Multiplication Visualizer</h1>
        <div>
          <label>Enter Matrix Dimensions (comma-separated): </label>
          <input
            type="text"
            onChange={handleDimensionsChange}
            placeholder="e.g., 10,20,30,40,30"
            disabled={isAnimating}
          />
        </div>
        <button onClick={animateMatrixChainOrder} disabled={isAnimating}>
          {isAnimating ? "Calculating..." : "Start " }
        </button>
        <div>
          <label>Animation Speed (ms): </label>
          <input
            type="range"
            min="100"
            max="2000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isAnimating}
          />
        </div>
        <div className="code-toggle">
          <button className="toggle-code-button" onClick={() => setShowCode(!showCode)}>
            {showCode ? "▼ Hide Code" : "► Show Code"}
          </button>
        </div>
      </div>
      <div className="tables-section">
        <DpTables
          minCostTable={minCostTable}
          splitIndexTable={splitIndexTable}
          currentCell={currentCell}
        />
      </div>
      <div className={`code-container ${showCode ? "show" : "hide"}`}>
        <CodeHighlighter code={algorithmCode} currentLine={currentLine} />
      </div>
      <footer className="footer">
        <p>© Heba Jamal</p>
        <div className="social-links">
          <a href="https://github.com/lh-rubz" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github" ></i>
          </a>
          <a href="https://linkedin.com/in/heba-jamal-343950289" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MatrixChainVisualizer;
