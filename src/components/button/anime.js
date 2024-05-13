export const hoverVariants = {
  initial: {
    scaleY: 0,
  },
  hovered: {
    scaleY: 1,
    transition: {
      duration: 0.2,
      ease: [0.55, 0.73, 0.06, 0.94],
      delayChildren: 0.1,
    },
  },
};

export const hoverChildrenVariants = {
  initial: {
    opacity: 0,
  },
  hovered: {
    opacity: 1,
  },
};
