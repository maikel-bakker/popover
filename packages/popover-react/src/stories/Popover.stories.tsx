import { useRef, useState, useEffect, useCallback } from "react";
import type { StoryObj, Meta } from "@storybook/react-vite";
import { placementOptions, type PlacementOptions } from "@popover/vanilla";
import { usePopoverPosition } from "../hooks/use-popover-position";
import "../popover.css";
import { useRepositionOnResize } from "../hooks/use-reposition-on-resize";
import { useClickOutside } from "../hooks/use-click-outside";
import { usePopover } from "../hooks/use-popover";

type NativePopoverArgs = {
  placement: PlacementOptions;
};

const meta = {
  title: "Example/Popover",
  args: {
    placement: "bottom-left" as PlacementOptions,
  },
  argTypes: {
    placement: {
      control: { type: "select" },
      options: placementOptions,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<NativePopoverArgs>;

export default meta;
type Story = StoryObj<NativePopoverArgs>;

export const Popover: Story = {
  render: (args) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const { isOpen, setIsOpen, popoverPosition } = usePopover({
      targetRef: buttonRef,
      popoverRef,
      preferredPlacement: args.placement,
    });

    return (
      <>
        <button ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)}>
          Toggle the popover
        </button>
        {isOpen && (
          <div
            ref={popoverRef}
            className="popover"
            style={{
              top: popoverPosition ? `${popoverPosition.top}px` : undefined,
              left: popoverPosition ? `${popoverPosition.left}px` : undefined,
              visibility: popoverPosition ? "visible" : "hidden",
            }}
          >
            Popover content
          </div>
        )}
      </>
    );
  },
};
