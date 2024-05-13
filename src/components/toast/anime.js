export const toastVariants = {
  initial: {
    scale: 0,
    x: "-50%",
  },
  animate: {
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.55, 0.73, 0.06, 0.94],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const childrenVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
