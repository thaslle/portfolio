import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const transition = { duration: 1.4, delay: 0.2 }; // Adjust delay here

const PageTransition = ({ children, targetRoute }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (targetRoute) {
      const timer = setTimeout(() => {
        navigate(targetRoute);
      }, (transition.duration + transition.delay) * 1000);
      return () => clearTimeout(timer);
    }
  }, [targetRoute, navigate]);

  const squareVariants = {
    initial: { opacity: 1 },
    enter: { opacity: 0 },
    exit: { opacity: 1 },
  };
  
  const totalSquares = 120;
  const animationDuration = 0.2; // Duration for each square's animation in seconds

  // Generate random delays for each square
  const delays = [...Array(totalSquares)].map(() => Math.random() * totalSquares * 0.01);

  return (
    <>
      <div className="squares">
        {delays.map((delay, i) => (
          <motion.div
            key={i}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={squareVariants}
            transition={{
              duration: animationDuration,
              delay: delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {children}
    </>
  );
};

export default PageTransition;