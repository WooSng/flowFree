import chalk from 'chalk';
const na = chalk.bgBlack("  ");   // The double space is important
const colors = [chalk.bgRed, chalk.bgGreen, chalk.bgYellow, chalk.bgBlue, chalk.bgMagenta, chalk.bgCyan, /*... add more colors as needed ...*/];

const n = 8; // Grid dimension
const chain_limit = n - 4; // Minimum line length
const iter = 800; // Number of iterations

// Generates the initial state of the grid with horizontal lines of length 'n'
function baseMatrix(dim) {
  const A = [];
  for (let i = 0; i < dim; i++) {
    A.push([]);
    for (let j = 0; j < dim; j++) {
      A[i].push({ pos: [i + 1, j + 1], color: colors[i] });
    }
  }
  return A;
}

// This function extends/shrinks two lines whose tails share an edge
function edgeSwitch(A) {
  let switched = false;
  outerLoop:
  for (let i = 0; i < A.length && !switched; i++) {
    for (let k1 = -1; k1 <= 0 && !switched; k1++) {
      const p = A[i][k1 === -1 ? A[i].length - 1 : 0].pos;
      for (let j = 0; j < A.length && !switched; j++) {
        if (j === i || A[j].length === chain_limit) continue;
        for (let k2 = -1; k2 <= 0 && !switched; k2++) {
          const pPrime = A[j][k2 === -1 ? A[j].length - 1 : 0].pos;
          if (Math.hypot(p[0] - pPrime[0], p[1] - pPrime[1]) === 1.0) {
            if (Math.random() > 0.5) {
              const tail = A[j].splice(k2 === -1 ? A[j].length - 1 : 0, 1)[0];
              if (k1 === -1) {
                A[i].push(tail);
              } else {
                A[i].unshift(tail);
              }
              switched = true;
            }
          }
        }
      }
    }
  }
  return A;
}

// Prints the puzzle
function flowPrinter(A) {
  const C = Array.from({ length: n }, () => Array(n).fill(na));
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      const x = A[i][j].pos[0] - 1;
      const y = A[i][j].pos[1] - 1;
      C[x][y] = A[i][j].color;
    }
  }
  C.forEach(row => console.log(row.join('')));
}

// Prints the puzzle with only the endpoints
function flowPrinterPuzzle(A) {
  const C = Array.from({ length: n }, () => Array(n).fill(na));
  for (let i = 0; i < A.length; i++) {
    [0, A[i].length - 1].forEach(j => {
      const x = A[i][j].pos[0] - 1;
      const y = A[i][j].pos[1] - 1;
      C[x][y] = A[i][j].color;
    });
  }
  C.forEach(row => console.log(row.join('')));
}

// Shuffle function similar to Python's random.shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Main function to run the logic
function main() {
  let flow = baseMatrix(n);
  for (let step = 0; step < iter; step++) {
    flow = edgeSwitch(flow);
    shuffle(flow);
  }
  flowPrinter(flow);
  console.log('\n \n');
  flowPrinterPuzzle(flow);
}

main();
