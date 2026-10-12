"use client";

export default function PixelCharacter({ size = 120 }: { size?: number }) {
  const pixel = 4;
  const cols = 15;
  const rows = 18;

  const colors: Record<string, string> = {
    "H": "#2a2a3a",     // hair
    "S": "#e8a838",     // skin
    "D": "#1e1a35",     // hoodie dark
    "L": "#2a2444",     // hoodie light
    "P": "#151227",     // pants
    "B": "#1a1530",     // boots
    "R": "#4ec9b0",     // headphones
    "C": "#e06c75",     // coffee cup
    "K": "#b07d28",     // coffee
    "G": "#e8a838",     // glow
    "T": "transparent", // transparent
  };

  const map: string[][] = [
    // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14
    ["T","T","T","T","H","H","H","H","H","H","H","T","T","T","T"], // 0
    ["T","T","T","H","H","H","H","H","H","H","H","H","T","T","T"], // 1
    ["T","T","T","H","S","S","S","S","S","S","H","T","T","T","T"], // 2
    ["T","T","T","H","S","S","S","S","S","S","H","T","T","T","T"], // 3
    ["T","R","T","H","S","S","H","H","S","S","H","T","R","T","T"], // 4  headphones
    ["T","R","R","T","S","S","S","S","S","S","T","R","R","T","T"], // 5  headphones
    ["T","T","T","D","D","D","D","D","D","D","D","D","T","T","T"], // 6  hoodie top
    ["T","D","D","D","L","L","L","D","D","L","L","L","D","D","T"], // 7
    ["T","D","L","L","L","D","D","D","D","D","D","L","L","D","T"], // 8
    ["T","D","L","L","L","D","D","D","D","D","D","L","L","D","T"], // 9
    ["T","D","L","L","L","D","D","D","D","D","D","L","L","D","T"], // 10
    ["T","D","L","L","L","D","D","D","D","D","D","L","L","D","T"], // 11
    ["T","D","D","D","D","D","D","D","D","D","D","D","D","D","T"], // 12
    ["T","T","D","D","D","D","D","D","D","D","D","D","D","T","T"], // 13
    ["T","T","T","P","P","P","T","T","T","P","P","P","T","T","T"], // 14 pants
    ["T","T","T","P","P","P","T","T","T","P","P","P","T","T","T"], // 15
    ["T","T","T","B","B","B","T","T","T","B","B","B","T","T","T"], // 16 boots
    ["T","T","T","B","B","B","T","T","T","B","B","B","T","T","T"], // 17
  ];

  const cells: { x: number; y: number; color: string }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const c = map[row][col];
      if (c !== "T") {
        cells.push({
          x: col * pixel,
          y: row * pixel,
          color: colors[c] || "transparent",
        });
      }
    }
  }

  return (
    <svg
      width={size}
      height={(size / cols) * rows}
      viewBox={`0 0 ${cols * pixel} ${rows * pixel}`}
      className="sprite-idle"
      shapeRendering="crispEdges"
      aria-label="Pixel art character of Farzad"
    >
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width={pixel}
          height={pixel}
          fill={cell.color}
        />
      ))}
    </svg>
  );
}
