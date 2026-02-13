import React from "react";

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const EMPTY_INDEX = 2; // top-right corner

function createInitialTiles() {
  // Start with tiles in order with an empty slot at the top-right corner.
  const tiles = [0, 1, null, 3, 4, 5, 6, 7, 8];

  // Shuffle only the non-empty positions to keep the empty slot at the top-right.
  const positionsToShuffle = [0, 1, 3, 4, 5, 6, 7, 8];
  for (let i = positionsToShuffle.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const posA = positionsToShuffle[i];
    const posB = positionsToShuffle[j];
    [tiles[posA], tiles[posB]] = [tiles[posB], tiles[posA]];
  }

  return tiles;
}

function isSolved(tiles) {
  for (let i = 0; i < TILE_COUNT; i += 1) {
    if (i === EMPTY_INDEX) {
      if (tiles[i] !== null) return false;
    } else if (tiles[i] !== (i > EMPTY_INDEX ? i - 1 : i)) {
      // Because the tile that would have been at EMPTY_INDEX is missing,
      // tiles after the empty slot are shifted by one.
      return false;
    }
  }
  return true;
}

function PuzzlePage({ onSolved }) {
  const [tiles, setTiles] = React.useState(() => createInitialTiles());
  const [isComplete, setIsComplete] = React.useState(false);

  const handleTileClick = (index) => {
    const tile = tiles[index];
    if (tile === null) return;

    const emptyIndex = tiles.indexOf(null);
    const isSameRow = Math.floor(emptyIndex / GRID_SIZE) === Math.floor(index / GRID_SIZE);
    const isAdjacentColumn =
      Math.abs((emptyIndex % GRID_SIZE) - (index % GRID_SIZE)) === 1;
    const isSameColumn = emptyIndex % GRID_SIZE === index % GRID_SIZE;
    const isAdjacentRow =
      Math.abs(Math.floor(emptyIndex / GRID_SIZE) - Math.floor(index / GRID_SIZE)) === 1;

    // Only allow moving tiles directly next to the empty slot.
    if (!(isSameRow && isAdjacentColumn) && !(isSameColumn && isAdjacentRow)) {
      return;
    }

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);

    if (isSolved(newTiles)) {
      setIsComplete(true);
      onSolved();
    }
  };

  return (
    <div className="puzzle-only-container">
      <div className="puzzle-frame">
        <div className="puzzle-grid">
          {tiles.map((tile, index) => {
            const isEmpty = tile === null;
            let style = {};
            if (!isEmpty) {
              const row = Math.floor(tile / GRID_SIZE);
              const col = tile % GRID_SIZE;
              style = {
                backgroundPosition: `${(col / (GRID_SIZE - 1)) * 100}% ${
                  (row / (GRID_SIZE - 1)) * 100
                }%`,
              };
            }

            return (
              <button
                key={index}
                type="button"
                className={`puzzle-tile ${isEmpty ? "is-empty" : ""}`}
                style={style}
                onClick={() => handleTileClick(index)}
                aria-label={isEmpty ? "Empty tile" : `Tile ${tile + 1}`}
                disabled={isComplete}
              />
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="puzzle-complete-button"
        onClick={onSolved}
      >
        Complete (test)
      </button>
    </div>
  );
}

export default PuzzlePage;

