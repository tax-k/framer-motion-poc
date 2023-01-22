# useAnimationControls

`useAnimationControls`를 사용하면 motion component에서 수동으로 애니메이션을 시작/정지할 수 있는 애니메이션 컨트롤을 만들 수 있습니다.

일반적으로 motion component의 애니메이션은 `animate` prop의 내용이 변경되거나 제스처(`hover/tap` 등)가 시작/정지될 때 자동으로 트리거됩니다.

`useAnimationControls`를 사용하면 하다 또는 그 이상의 motion component에서 애니메이션을 수동으로 시작/정지하거나 여러 애니메이션을 결합할 수 있습니다.

```js
import { motion, useAnimationControls } from 'framer-motion';

function Component() {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({ scale: 2 });
  }, []);

  return <motion.div animate={controls} />;
}
```

## Create

`useAnimationControls`를 호출하여 애니메이션 컨트롤을 만들 수 있습니다.

```js
import { useAnimationControls } from 'framer-motion';

const controls = useAnimationControls();
```

```html
<motion.div animate="{controls}" />
```

이렇게 하면 animationControls라는 이름의 애니메이션 컨트롤 객체가 생성되며, 이 객체를 사용하여 애니메이션을 제어 할 수 있습니다.

## Start/stop animations

```js
controls.start();
controls.stop();
```

controls.start() 메서드를 사용하여 애니메이션을 시작할 수 있습니다.

중요한 것은 `start` 메서드는 애니메이션을 초기 상태로 시작할 때 사용된다는 것입니다.
만약 애니메이션이 이미 실행 중이고 다시 `start` 메서드를 호출하면 애니메이션은 초기 상태로 다시 시작됩니다.

또한 start 메서드는 optional configuration object를 argument로 받을 수 있습니다.

```js
controls.start({
  x: 100,
  transition: { duration: 2, ease: 'easeInOut' },
});
```

이 configuration object를 사용하면 애니메이션의 동작을 **사용자 정의**할 수 있으며, 애니메이션의 duration(지속 시간), easing, 또는 delay를 설정할 수 있습니다.

또한 controls.start() 메서드는 애니메이션 할 값의 세트와 **optional transition configuration**을 사용하여 애니메이션 할 수 있거나, 제공된 컴포넌트에 `variants` prop이 설정되어 있다면 `variant` 라벨을 사용할 수 있습니다.

```js
controls.start('hidden');
```

## Sequence

`controls.start()` 메서드는 `Promise`를 반환하므로 `await` 또는 `then`을 사용하여 애니메이션 순서를 설정할 수 있습니다.

다른 controls는 함께 순서를 지정할 수 있고, 이러한 순서는 함수로 구성될 수 있으며, 이러한 함수들은 다시 순서를 지정할 수 있습니다.

```js
const sequence = async () => {
  await menuControls.start({ x: 0 });
  return await itemControls.start({ opacity: 1 });
};
```

## Dynamic `start`

controls.start()는 함수를 사용할 수도 있습니다. 이 함수는 각 컴포넌트를 동적으로 시작하고 `controls`를 다른 애니메이션 정의와 결합할 수 있습니다.

컴포넌트의 `custom` prop을 통해 이 함수에 사용자 정의 데이터를 전송할 수 있습니다.

```js
const controls = useAnimationControls();

useEffect(() => {
  controls.start((i) => ({
    opacity: 0,
    x: 100,
    transition: { delay: i * 0.3 },
  }));
}, []);

return (
  <ul>
    <motion.li custom={0} animate={controls} />
    <motion.li custom={1} animate={controls} />
    <motion.li custom={2} animate={controls} />
  </ul>
);
```

## Returns

`useAnimationControls()` 함수는 애니메이션을 수동으로 시작/정지할 수 있는 control set를 반환합니다. 이 control set를 사용하면 `controls.start()` 메서드를 사용하여 애니메이션을 시작하고 `controls.stop()` 메서드를 사용하여 애니메이션을 정지할 수 있습니다.

```js
import { motion, useAnimationControls } from "framer-motion"

export default function() {
  const controls = useAnimationControls()

  return <motion.div animate={controls} >
}
```

### `set`

controls.set() 메서드는 컴포넌트의 속성을 새로운 값의 세트나 variant으로 즉시 설정할 수 있도록 합니다.

값을 전달할 경우, 컴포넌트의 속성을 새로운 값으로 즉시 설정하며, 애니메이션 없이 설정합니다. variant를 전달할 경우, 컴포넌트의 속성을 variant에 정의된 값으로 설정합니다.

```js
animationControls.set({ x: 100 }); // x:100으로 즉시 설정 (애니메이션 없음)
animationControls.set('variantName'); // "variantName" variant에 정의된 값으로 즉시 설정 (애니메이션 없음)
```

### `start`

controls.start() 메서드는 링크된 모든 컴포넌트에서 애니메이션을 시작합니다.

이 메서드는 애니메이션 정의와 전환 오버라이드를 사용하여 애니메이션을 시작할 수 있습니다.

애니메이션 정의는 애니메이션 할 값의 세트나 variant 라벨을 포함할 수 있으며, 전환 오버라이드는 애니메이션 설정을 덮어 쓸 수 있는 전환 설정을 포함할 수 있습니다.

예를 들어:

```js
animationControls.start({ x: 100 }); // x:100로 애니메이션 시작
animationControls.start('variantName', { duration: 2 }); // "variantName"variant을 2초간 애니메이션 시작
```

이 메서드는 Promise를 반환하며, 애니메이션이 완료될 때 resolve됩니다.
