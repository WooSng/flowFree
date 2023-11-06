// Parameters
const n = 6; // Grid dimension
const chain_limit = n - 4; // Minimum line length
const iter = 800; // Number of iterations

// Generate the initial state of the grid
function baseMatrix(dim) {
  const A = [];
  for (let i = 0; i < dim; i++) {
    A[i] = [];
    for (let j = 0; j < dim; j++) {
      A[i].push({ position: [i, j], color: i }); // Store position and color
    }
  }
  return A;
}

// Extend/shrink two lines whose tails share an edge
function edgeSwitch(A) {
  let sw = false;
  for (let i = 0; i < A.length; i++) {
    if (sw) break;
    for (let k1Index of [0, A[i].length - 1]) { // Use 0 for start, length - 1 for end
      if (sw) break;
      const p = A[i][k1Index].position;
      for (let j = 0; j < A.length; j++) {
        if (sw || j === i || A[j].length <= chain_limit) continue;
        for (let k2Index of [0, A[j].length - 1]) { // Use 0 for start, length - 1 for end
          if (sw) break;
          const pprime = A[j][k2Index].position;
          if (Math.abs(p[0] - pprime[0]) + Math.abs(p[1] - pprime[1]) === 1) {
            const n1 = Math.random();
            if (n1 > 0.5) {
              A[j].splice(k2Index, 1); // Remove tail from second line
              if (k1Index === 0) {
                A[i].unshift({ position: pprime, color: A[i][0].color }); // Add to the start
              } else {
                A[i].push({ position: pprime, color: A[i][0].color }); // Add to the end
              }
              sw = true;
            }
          }
        }
      }
    }
  }
  return A;
}


// Function to print the puzzle
function printPuzzle(A) {
  const C = Array.from({ length: n }, () => Array(n).fill(null));
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      const [x, y] = A[i][j].position;
      C[x][y] = A[i][j].color;
    }
  }
  console.log(C);
}

// Initialize flow and perform iterations
let flow = baseMatrix(n);
for (let step = 0; step < iter; step++) {
  flow = edgeSwitch(flow);
  // Shuffle the lines in 'flow'
  for (let i = flow.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flow[i], flow[j]] = [flow[j], flow[i]];
  }
}

// Print the puzzle (replace this with return in a function)
printPuzzle(flow);
