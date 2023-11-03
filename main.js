function create2DArray(x) {
  let arr = new Array(x);
  for (let i = 0; i < x; i++) {
    arr[i] = new Array(x).fill(0);
  }
  return arr;
}

function getRandomPosition(x) {
  return {
    row: Math.floor(Math.random() * x),
    col: Math.floor(Math.random() * x)
  };
}

function placeNumberInRandomPosition(arr, x, num) {
  let position = getRandomPosition(x);
  while (arr[position.row][position.col] !== 0) {
    position = getRandomPosition(x);
  }
  arr[position.row][position.col] = num;
}

function findPosition(arr, num) {
  const positions = [];
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (arr[row][col] === num) {
        positions.push({ row, col });
      }
    }
  }
  return positions;
}

function canConnect(start, end, arr, num) {
  const visited = arr.map(row => row.map(() => false));
  const queue = [start];
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (queue.length > 0) {
    const { row, col } = queue.shift();
    if (row === end.row && col === end.col) {
      return true;
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow >= 0 && newRow < arr.length && newCol >= 0 && newCol < arr[newRow].length &&
        !visited[newRow][newCol] && (arr[newRow][newCol] === 0 || arr[newRow][newCol] === num)) {
        visited[newRow][newCol] = true;
        queue.push({ row: newRow, col: newCol });
      }
    }
  }

  return false;
}

let twoDArray;
let isConnected = false;
while (!isConnected) {
  twoDArray = create2DArray(5);

  for (let value = 1; value <= 5; value++) {
    placeNumberInRandomPosition(twoDArray, 5, value);
    placeNumberInRandomPosition(twoDArray, 5, value);
  }

  isConnected = true;
  for (let value = 1; value <= 5 && isConnected; value++) {
    const [start, end] = findPosition(twoDArray, value);
    if (!canConnect(start, end, twoDArray, value)) {
      isConnected = false;
    }
  }
}

//!

// function fillPathWithNumber(start, end, arr, num) {
//   const visited = arr.map(row => row.map(() => false));
//   const queue = [{ position: start, path: [] }];
//   const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

//   while (queue.length > 0) {
//     const { position: { row, col }, path } = queue.shift();

//     if (row === end.row && col === end.col) {
//       for (const { row, col } of path) {
//         arr[row][col] = num;
//       }
//       return true;
//     }

//     for (const [dr, dc] of directions) {
//       const newRow = row + dr;
//       const newCol = col + dc;

//       if (newRow >= 0 && newRow < arr.length && newCol >= 0 && newCol < arr[newRow].length &&
//         !visited[newRow][newCol] && (arr[newRow][newCol] === 0 || arr[newRow][newCol] === num)) {
//         visited[newRow][newCol] = true;
//         queue.push({ position: { row: newRow, col: newCol }, path: [...path, { row: newRow, col: newCol }] });
//       }
//     }
//   }

//   return false;
// }

// let copyTwoDArray = JSON.parse(JSON.stringify(twoDArray))

// function checkPass(startValue = 1) {
//   console.log(startValue)
//   let isPass = true;
//   for (let value = startValue; value <= startValue + 4; value++) {
//     const index = value > 5 ? value - 5 : value;
//     const [start, end] = findPosition(copyTwoDArray, index);
//     if (!fillPathWithNumber(start, end, copyTwoDArray, index)) {
//       isPass = false;
//       break;
//     }
//   }

//   if (!isPass && startValue < 5) {
//     copyTwoDArray = JSON.parse(JSON.stringify(twoDArray));
//     return checkPass(startValue + 1);
//   }
//   console.log(isPass, copyTwoDArray);
// }

// checkPass();

function getAllPaths(start, end, arr, num) {
  const visited = arr.map(row => row.map(() => false));
  const paths = [];

  function dfs(row, col, path) {
    if (row === end.row && col === end.col) {
      paths.push([...path, { row, col }]);
      return;
    }

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow >= 0 && newRow < arr.length && newCol >= 0 && newCol < arr[newRow].length &&
        !visited[newRow][newCol] && (arr[newRow][newCol] === 0 || arr[newRow][newCol] === num)) {
        visited[newRow][newCol] = true;
        dfs(newRow, newCol, [...path, { row, col }]);
        visited[newRow][newCol] = false;
      }
    }
  }

  dfs(start.row, start.col, []);
  return paths;
}

function fillUsingLongestPath(twoDArray) {
  for (let value = 1; value <= 5; value++) {
    const [start, end] = findPosition(twoDArray, value);
    const paths = getAllPaths(start, end, twoDArray, value);
    let longestPath = [];
    for (const path of paths) {
      if (path.length > longestPath.length) {
        longestPath = path;
      }
    }

    for (const { row, col } of longestPath) {
      twoDArray[row][col] = value;
    }
  }
}

fillUsingLongestPath(twoDArray);

console.log(twoDArray);