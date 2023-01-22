# useAnimationFrame

가장 최신의 프레임 시간을 제공된 콜백에 출력하는 애니메이션 루프입니다.

매 애니메이션 프레임마다 콜백을 실행합니다.

콜백에는 두 개의 인수가 제공됩니다.

time, 콜백이 처음 호출된 이후 총 시간.
delta, 마지막 애니메이션 프레임 이후 총 시간.

```js
import { useAnimationFrame } from 'framer-motion';

function Component() {
  const ref = useRef(null);

  useAnimationFrame((time, delta) => {
    ref.current.style.transform = `rotateY(${time}deg)`;
  });

  return <div ref={ref} />;
}
```
