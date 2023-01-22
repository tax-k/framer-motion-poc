import { motion } from 'framer-motion';
import { useState } from 'react';

export const Box2 = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className='box-container'>
      <motion.div
        className='box'
        drag='x'
        dragConstraints={{
          right: 20,
        }}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.9,
        }}
        onClick={() => setIsAnimating(!isAnimating)}
      />
    </div>
  );
};
