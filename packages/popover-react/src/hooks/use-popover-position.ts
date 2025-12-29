import { useCallback } from "react";
import {
  determinePosition,
  type DeterminePositionProps,
} from "@popover/vanilla";

export type UsePopoverPositionOptions = {
  /**
   * Where you prefer the popover to appear relative to the target.
   * Falls back to `"bottom-left"`.
   */
  preferredPlacement?: DeterminePositionProps["preferredPlacement"];

  /**
   * Dimensions of the container to keep the popover within.
   * Defaults to the current viewport (`window.innerWidth/innerHeight`).
   *
   * Override this if your popover is positioned within a specific scrolling
   * container rather than the viewport.
   */
  getContainerDimensions?: () => { width: number; height: number };
};

export type UsePopoverPositionResult = (
  targetEl: HTMLElement,
  popoverEl: HTMLElement,
) => ReturnType<typeof determinePosition>;

/**
 * Returns a stable callback you can call to compute popover position for a given
 * target element and popover element.
 *
 * Designed for cases where you want to reposition as the target moves (e.g. dragging),
 * without coupling the hook to a specific popover "open/close" mechanism.
 */
export function usePopoverPosition(
  options: UsePopoverPositionOptions = {},
): UsePopoverPositionResult {
  const {
    preferredPlacement = "bottom-left",
    getContainerDimensions = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
  } = options;

  return useCallback(
    (targetEl: HTMLElement, popoverEl: HTMLElement) => {
      const containerDimensions = getContainerDimensions();

      return determinePosition({
        targetEl,
        popoverEl,
        containerDimensions,
        preferredPlacement,
      });
    },
    [getContainerDimensions, preferredPlacement],
  );
}
