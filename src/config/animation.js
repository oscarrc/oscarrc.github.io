const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
};

const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.5
}; 

const windowVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

const windowTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.5
}; 

export { pageVariants, pageTransition, windowVariants, windowTransition }