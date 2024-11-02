import React from "react";
import "./DpTables.css"; 

const DpTables = ({ minCostTable, splitIndexTable, currentCell }) => {
  const renderTable = (table, title) => {
    if (!table || table.length === 0) return null;

    return (
      <div className="table-container">
        <h3>{title}</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th></th>
              {table[0].map((_, index) => (
                <th key={index}>{index}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={i}>
                <th>{i}</th>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={
                      currentCell.i === i && currentCell.j === j
                        ? "highlighted-cell"
                        : ""
                    }
                  >
                    {(cell === Infinity|| i>j) ? " " : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="dp-tables">
      {renderTable(minCostTable, "Minimum Cost Table")}
      {renderTable(splitIndexTable, "Split Index Table")}
    </div>
  );
};

export default DpTables;
