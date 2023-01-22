import { useRef, useState } from 'react';
import { useAnimationFrame, useAnimationControls, motion } from 'framer-motion';

import './style.css';

export default function UseAnimationFrameExample() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [frameObj, setFrameObj] = useState({
    time: 0,
    delta: 0,
    y: 0,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const controls = useAnimationControls();

  useAnimationFrame((time, delta) => {
    const rotate = Math.sin(time / 10000) * 200;
    const y = (1 + Math.sin(time / 1000)) * -50;

    setFrameObj((prev) => {
      return {
        ...prev,
        time,
        delta,
        y,
      };
    });

    if (boxRef.current !== null) {
      if (isAnimating === true) {
        boxRef.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
      }
    }
  });

  return (
    <>
      <div className='container'>
        <div className='inner'>
          <div>
            <motion.div className='cube' ref={boxRef} animate={controls}>
              <div className='side front' />
              <div className='side left' />
              <div className='side right' />
              <div className='side top' />
              <div className='side bottom' />
              <div className='side back' />
            </motion.div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <button onClick={() => setIsAnimating((prev) => !prev)}>
            Animation Stop
          </button>
          <p>
            <code className={'font-bold'}>time</code>: the total duration of
            time since the{' '}
            <span className={'font-bold'}>callback was first called</span>.
          </p>
          <p>
            <span>value: </span>
            <code>{JSON.stringify(frameObj.time)}</code>
          </p>

          <p>
            <code className={'font-bold'}>delta</code>: the total duration of
            time since{' '}
            <span className={'font-bold'}>the last animation frame.</span>
          </p>
          <p>
            <span>value: </span>
            <code>{JSON.stringify(frameObj.delta)}</code>
          </p>
        </div>
      </div>
    </>
  );
}
