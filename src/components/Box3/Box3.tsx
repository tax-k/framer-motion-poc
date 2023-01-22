import { motion } from 'framer-motion';
import { useState } from 'react';

export const Box3 = () => {
  const [boxes, setBoxes] = useState([{}]);

  const boxVariant = {
    hidden: {
      x: '-100vw',
    },
    visible: {
      x: 0,
      transition: {
        delay: 0.5,
        when: 'beforeChildren',
      },
    },
  };

  const listVariant = {
    hidden: {
      x: -10,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      staggerChildren: 0.2,
    },
  };

  return (
    <div className='box-container'>
      <motion.div
        className='box'
        variants={boxVariant}
        animate='visible'
        initial='hidden'>
        {[1, 2, 3].map((box, index) => {
          return (
            <motion.li className='boxItem' variants={listVariant} key={box}>
              {' '}
            </motion.li>
          );
        })}
      </motion.div>
    </div>
  );
};
