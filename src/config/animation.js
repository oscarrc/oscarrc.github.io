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
    scale: 0
  },
  in: {
    scale: 1
  },
  out: {
    scale: 0
  }
};

const windowTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.1
}; 

const elementVariants = {
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

const elementTransition = {
  type: 'tween',
  ease: 'easeIn',
  duration: 0.2
}; 

export { elementVariants, elementTransition, pageVariants, pageTransition, windowVariants, windowTransition }