import React from 'react';
import GridLayout from 'react-grid-layout';

const HoneycombGrid = () => {
  const numRows = 10; // Number of rows
  const numCols = 10; // Number of columns

  const layout = [];
  const hexWidth = 100;
  const hexHeight = 86;
  const hexHorizontalOffset = hexWidth * 0.75;
  const hexVerticalOffset = hexHeight * 0.5;

  for (let row = 0; row < numRows; row++) {
    const isRowEven = row % 2 === 0;
    const yOffset = isRowEven ? hexVerticalOffset : 0;

    for (let col = 0; col < numCols; col++) {
      const x = col * hexHorizontalOffset;
      const y = row * hexVerticalOffset + yOffset;

      layout.push({
        i: `hex-${row}-${col}`,
        x: x,
        y: y,
        w: 1,
        h: 1,
      });
    }
  }

  return (
    <GridLayout className="layout" layout={layout} cols={numCols} rowHeight={hexHeight} width={800}>
      {layout.map(item => (
        <div key={item.i}>{item.i}</div>
      ))}
    </GridLayout>
  );
};

export default HoneycombGrid;
