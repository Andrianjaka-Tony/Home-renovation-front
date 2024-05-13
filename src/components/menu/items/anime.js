export const itemsVariants = {
  initial: {
    scale: 0,
    x: "calc(-50% + 30px)",
    borderRadius: "50%",
  },
  animate: {
    scale: 1,
    borderRadius: "5%",
    transition: {
      duration: 1,
      ease: [0.55, 0.73, 0.06, 0.94],
      when: "beforeChildren",
    },
  },
  exit: {
    scale: 0,
    borderRadius: "50%",
    transition: {
      duration: 1,
      ease: [0.55, 0.73, 0.06, 0.94],
      delay: 0.8,
    },
  },
};

export const closeVariants = {
  initial: {
    scale: 0,
    rotate: "360deg",
  },
  animate: {
    scale: 1,
    rotate: "0deg",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
