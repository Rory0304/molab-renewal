import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.5, ease: 'linear' },
    willChange: 'opacity, transform',
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'linear' },
    willChange: 'opacity, transform',
  },
};
