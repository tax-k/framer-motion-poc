# useDragControls

motion 컴포넌트에서 drag를 수동으로 시작하거나 멈추는 방법입니다.

일반적으로 drag는 `drag prop`이 있는 motion 컴포넌트를 **누르고(pressing down)** 포인터를 **움직이는 것(moving)** 으로 시작됩니다.

비디오 스크러버의 어떤 위치에서 클릭하는 경우 같은 컴포넌트가 아닌 다른 컴포넌트에서 drag를 시작하는 경우가 있을 수 있습니다.

`useDragControls`를 사용하면, 어떤 포인터 이벤트에서든 drag를 수동으로 시작할 수 있는 제어 세트를 만들 수 있습니다.

## Usage

Framer Motion에서 `useDragControls`를 가져옵니다.

```js
import { motion, useDragControls } from 'framer-motion';
```

hook을 호출하여 제어를 만들고, 이를 드래그 가능한 motion 컴포넌트에 전달합니다.

```js
function Component() {
  const controls = useDragControls();

  return (
    <>
      <div />
      <motion.div drag='x' dragControls={controls} />
    </>
  );
}
```

다른 요소의 `onPointerDown` 이벤트에서도 `start` 메소드를 통해 `drag` 세션을 시작할 수 있습니다.

```js
const controls = useDragControls();

function startDrag(event) {
  controls.start(event);
}

return (
  <>
    <div onPointerDown={startDrag} />
    <motion.div drag='x' dragControls={controls} />
  </>
);
```

## Touch support

터치 스크린을 지원하기 위해서는 트리거링 요소에 `touch-action: none` 스타일을 적용해야 합니다.

```html
<div onPointerDown={startDrag} style={{ touchAction: "none" }} />
```

## Snap to cursor

기본적으로 수동(?)(manual) drag 제스처는 포인터에서 motion 컴포넌트에만 변경 사항을 적용합니다.
start 메소드에 snapToCursor: true를 전달하면 motion 컴포넌트를 커서에 즉시 스냅할 수 있습니다.

```js
controls.start(event, { snapToCursor: true });
```

## Blocking automatic drag

이 구성으로도 motion 컴포넌트는 pointerdown 이벤트를 받으면 자동으로 drag 제스처를 시작합니다.

`dragListener={false}` prop을 전달하면 이 동작을 멈출 수 있습니다.

```html
<motion.div drag dragListener="{false}" dragControls="{controls}" />
```
