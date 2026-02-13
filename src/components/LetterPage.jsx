import React from "react";
import confetti from "canvas-confetti";

function LetterPage({ canOpen, onYes }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const [noMoves, setNoMoves] = React.useState(0);
  const [noAsYes, setNoAsYes] = React.useState(false);
  const [noOffset, setNoOffset] = React.useState({ x: 0, y: 0 });

  const fireConfetti = () => {
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handleEnvelopeClick = () => {
    if (!canOpen) return;
    setIsOpen(true);
  };

  const handleYes = () => {
    setAnswer("yes");
    fireConfetti();
    if (onYes) {
      onYes();
    }
  };

  const handleNoHover = () => {
    if (noAsYes) return;

    setNoMoves((prev) => {
      const next = prev + 1;
      if (next > 5) {
        setNoAsYes(true);
        setNoOffset({ x: 0, y: 0 });
        return next;
      }

      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 40;
      setNoOffset({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });

      return next;
    });
  };

  const handleNoClick = () => {
    if (noAsYes) {
      handleYes();
    }
  };

  return (
    <div className="letter-wrapper">
      <button
        type="button"
        className={`envelope ${canOpen ? "" : "envelope--locked"}`}
        onClick={handleEnvelopeClick}
      >
        <div className="envelope-inner">
        </div>
      </button>
      {isOpen && (
        <>
          <div className="letter-modal-backdrop" />
          <div className="letter-modal" role="dialog" aria-modal="true">
            <div className="letter-content">
              <div className="letter-line">Dear My Sweet,</div>
              <div className="letter-line">
                No amount of words can describe how grateful I am. The longer I&apos;m with you the
                more I realize how lucky I am to call you mine. You&apos;ve done so much for me and
                I wanted to make you feel appreciated so I made this for you.
              </div>
              <div className="letter-line">
                I wanted you to think that I wasn&apos;t going to do anything for Valentine&apos;s
                which is why I waited so long to ask you.
              </div>
              <div className="question-row">
                <span className="question-text">Will you be my Valentine?</span>
                <button
                  type="button"
                  className="yes-button"
                  onClick={handleYes}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="no-button"
                  onMouseEnter={handleNoHover}
                  onClick={handleNoClick}
                  style={{ transform: `translate(${noOffset.x}px, ${noOffset.y}px)` }}
                >
                  {noAsYes ? "Yes" : "No"}
                </button>
              </div>
              <button
                type="button"
                className="modal-close-button"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LetterPage;

