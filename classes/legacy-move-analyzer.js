const tilesPerRow = 10
const tileRows = 12

const getAdjacentTiles = (key) => [
  key - 10 < 0 ? null : key - 10, // top
  (key + 1) % (tilesPerRow) === 0 ? null : key + 1, // right
  key + 10 >= tilesPerRow * tileRows ? null : key + 10, // bottom
  key % tilesPerRow === 0 ? null : key - 1, // left
]

const addAdjacentHits = (hitTileKey, hitArray, tiles) => {
  const currentTile = tiles[hitTileKey]
  console.log('Current tile is', currentTile)
  const adjacentTileKeys = getAdjacentTiles(hitTileKey)

  adjacentTileKeys.forEach((key) => {
    if ((key || key === 0) && !hitArray.includes(key)) {
      if (currentTile.color === tiles[key].color) {
        hitArray.push(key)
        addAdjacentHits(key, hitArray)
      }
    }
  })

  return hitArray
}

const moveAnalyzer = function moveAnalyzer(tileset) {
  // const visitedUnburstable = {}
  // const visitedBurstable = {}
  const tilesFullyChecked = {}
  const burstableGroups = []
  console.log('Beginning', tileset)

  for (let i = 0; i < tileset.length; i += 1) {
    const currentKey = i
    let burstableGroup = [currentKey]

    console.log('Running loop', tilesFullyChecked, burstableGroups)
    if (!tilesFullyChecked[currentKey]) {
      console.log('Checking', i)

      burstableGroup = addAdjacentHits(currentKey, burstableGroup, tileset)

      console.log('Have a group', burstableGroup)

      burstableGroup.forEach((tileKey) => {
        tilesFullyChecked[tileKey] = true
      })

      if (burstableGroup.length > 3) {
        console.log('Have a group', burstableGroup)
        burstableGroups.push(burstableGroup)
      }
    }
    else {
      console.log('Skipping', i)
    }
  }

  console.log('Finished. Total moves:', burstableGroups.length)
}

export default moveAnalyzer
