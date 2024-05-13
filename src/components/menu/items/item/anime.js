export const nameVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

export const characterVariants = {
  initial: {
    y: "200%",
  },
  animate: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.55, 0.73, 0.06, 0.94],
    },
  },
  exit: {
    y: "100%",
    transition: {
      duration: 0.8,
      ease: [0.55, 0.73, 0.06, 0.94],
    },
  },
};
