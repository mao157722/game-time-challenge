import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });

    //createPortal มีไว้เพื่อให้ element ที่ถูกครอบด้วย createPortal 
    //ไปอยู่ใน element ที่เรากำหนดให้มันไปอยู่ 
    //ในกรณีนี้ให้ไปอยู่ที่ element ที่มี id = modal

    //* ทำไปทำไมล่ะ เพื่อให้ element dialog ไม่ไปอยู่ข้างภายใต้ element ที่เราไม่ต้องการยังไงล่ะ */
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your score {score}</h2>}
            <p>Target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default ResultModal;