import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1, // Set the duration of the scrolling animation
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Customize the easing function
  direction: 'vertical', // Set the direction of the scrolling ('vertical' or 'horizontal')
  gestureDirection: 'vertical', // Set the gesture direction ('vertical' or 'horizontal')
  smooth: true, // Enable smooth scrolling
  smoothTouch: false, // Disable smooth scrolling on touch devices
  touchMultiplier: 2, // Set the multiplier for touch events
  infinite: false // Disable infinite scrolling
});

const scrollFn = (time) => {
  lenis.raf(time);
  requestAnimationFrame(scrollFn);
};

requestAnimationFrame(scrollFn);

export default lenis;