import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { remaingTime, targetTime, onReset },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const userLost = remaingTime <= 0;
  const score = Math.round((1 - remaingTime / (targetTime * 1000)) * 100);

  const formattedRemainingTime = (remaingTime / 1000).toFixed(2);

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2> You lost!!! </h2>}
      {!userLost && <h2> Final score: {score} </h2>}
      <p>
        The target time was{" "}
        <strong>
          {targetTime} segundo{targetTime > 1 ? "s" : ""}
        </strong>
      </p>
      <p>You stoped the timer with {formattedRemainingTime} seconds left</p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
