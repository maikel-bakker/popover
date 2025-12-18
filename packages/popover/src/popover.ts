export const placementOptions = [
  "bottom-left",
  "bottom-right",
  "bottom-center",
  "top-left",
  "top-right",
  "top-center",
] as const;

type PlacementOptions = (typeof placementOptions)[number];

type CalcPositionProps = {
  targetRect: DOMRect;
  popoverRect: DOMRect;
  placement: PlacementOptions;
};

export function calcPosition({
  targetRect,
  popoverRect,
  placement = "bottom-left",
}: CalcPositionProps) {
  switch (placement) {
    case "top-left":
      return {
        top: targetRect.top - popoverRect.height,
        left: targetRect.left,
      };
    case "top-right":
      return {
        top: targetRect.top - popoverRect.height,
        left: targetRect.right - popoverRect.width,
      };
    case "top-center":
      return {
        top: targetRect.top - popoverRect.height,
        left: targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
      };
    case "bottom-left":
      return {
        top: targetRect.bottom,
        left: targetRect.left,
      };
    case "bottom-right":
      return {
        top: targetRect.bottom,
        left: targetRect.right - popoverRect.width,
      };
    case "bottom-center":
      return {
        top: targetRect.bottom,
        left: targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
      };
  }
}

type Dimensions = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export function checkIfOffScreen(dimensions: Dimensions) {
  const offScreenSides = {
    top: dimensions.top < 0,
    left: dimensions.left < 0,
    bottom: dimensions.top + dimensions.height > window.innerHeight,
    right: dimensions.left + dimensions.width > window.innerWidth,
  };

  return {
    isOffScreen: Object.values(offScreenSides).some((v) => v),
    offScreenSides,
  };
}
