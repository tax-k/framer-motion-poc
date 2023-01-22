import { motion, useAnimationControls } from 'framer-motion';
import { useState } from 'react';

export const Box5 = () => {
  const control = useAnimationControls();

  const commonTransition = {
    duration: 2,
    type: 'spring',
    stiffness: 60,
    damping: 10,
  };

  type TControlStartFn = { [key: string]: string | number };
  const controlStartFn = (animation: TControlStartFn) => {
    control.start({
      ...animation,
      transition: commonTransition,
    });
  };

  return (
    <div className='box-container'>
      <button onClick={() => controlStartFn({ x: 1500 })}>Move Right</button>
      <button onClick={() => controlStartFn({ x: 0 })}>Move Left</button>
      <button onClick={() => controlStartFn({ borderRadius: '50%' })}>
        Move Circle
      </button>
      <button onClick={() => controlStartFn({ borderRadius: 0 })}>
        Move Square
      </button>
      <button onClick={() => control.stop()}>Move Stop</button>
      <motion.div className='box' animate={control}></motion.div>
    </div>
  );
};
