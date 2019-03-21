/**
 * Basic helper returns a random INT between min & max, inclusive
 *
 * @param {*} pMin
 * @param {*} pMax
 */
export const getRandomInt = function getRandomInt(pMin, pMax) {
  const min = Math.ceil(pMin)
  const max = Math.floor(pMax)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Used by TileManager to build an initial array of random colors for the grid,
 * selections constrained by difficulty
 *
 * @param {*} difficulty
 * @param {*} numColors
 * @param {*} colorsOptionsArray
 */
// eslint-disable-next-line
export const getColorsForIndexes = function getColorsForIndexes(difficulty, numColors, colorsOptionsArray) {
  const colorArray = []

  for (let i = 0; i < numColors; i += 1) {
    colorArray.push(colorsOptionsArray[getRandomInt(0, difficulty - 1)])
  }

  return colorArray
}

/**
 * Used by TileManager to get a random color for respawned tiles,
 * selection constrained by difficulty
 *
 * @param {*} difficulty
 * @param {*} colorOptionsArray
 */
// eslint-disable-next-line
export const getRandomColor = (difficulty, colorOptionsArray) => colorOptionsArray[getRandomInt(0, difficulty - 1)]

/**
 * Used by TileManager. Build an array of empty arrays, one for each column.
 * The columns are used to store tiles that need re-adjusting (need to fall down).
 *
 * @param {*} numColumns
 */
export const getColumnsArray = function getColumnsArray(numColumns) {
  const arr = []

  for (let i = 0; i < numColumns; i += 1) {
    arr.push([])
  }

  return arr
}
