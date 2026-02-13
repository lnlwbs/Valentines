import React from "react";
import PuzzlePage from "./components/PuzzlePage.jsx";
import LetterPage from "./components/LetterPage.jsx";

function App() {
  const [isPuzzleComplete, setIsPuzzleComplete] = React.useState(false);
  const [showHearts, setShowHearts] = React.useState(false);

  return (
    <div className="page-frame">
      {showHearts && (
        <div className="floating-hearts">
          {Array.from({ length: 12 }).map((_, idx) => (
            <span key={idx} className={`floating-heart heart-${idx + 1}`}>
              ♥
            </span>
          ))}
        </div>
      )}
      <div className="app-shell">
        <div className="combined-layout">
          <PuzzlePage onSolved={() => setIsPuzzleComplete(true)} />
          <LetterPage
            canOpen={isPuzzleComplete}
            onYes={() => setShowHearts(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

