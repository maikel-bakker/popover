import { useRef } from "react";
import "./App.css";
import { determinePosition } from "@popover/vanilla";

function App() {
  const targetRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <h1>Popover</h1>
      <button popoverTarget="mypopover" ref={targetRef}>
        Toggle the popover
      </button>
      <div
        id="mypopover"
        popover=""
        onToggle={(e) => {
          const { position } = determinePosition({
            targetEl: targetRef.current!,
            popoverEl: e.currentTarget,
            containerDimensions: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            preferredPlacement: "bottom-left",
          });

          e.currentTarget.style.top = `${position.top}px`;
          e.currentTarget.style.left = `${position.left}px`;
          e.currentTarget.style.visibility =
            e.newState === "open" ? "visible" : "hidden";
        }}
      >
        Popover content
      </div>
    </>
  );
}

export default App;
