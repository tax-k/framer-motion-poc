# useInView

useInView는 (0.6kb) 적은 크기의 훅입니다. 제공된 요소가 뷰포트 안에 있을 때 감지합니다.

```js
function Component() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return <div ref={ref} />;
}
```

## Useage

Framer Motion에서 useInView를 가져옵니다.

```js
import { useInView } from 'framer-motion';
```

useInView는 어떤 HTML 요소의 가시성도 추적할 수 있습니다. useInView와 HTML 요소에 ref 객체를 전달합니다.

```js
function Component() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return <div ref={ref} />;
}
```

요소가 뷰포트 밖에 있을 때는 `useInView`는 `false`를 반환합니다. 내부로 이동할 때는 컴포넌트를 다시 렌더링하고 `true`를 반환합니다.

## Effects

useInView는 바닐라 React 상태이므로 `isInView`가 변경될 때 함수를 호출하려면 `useEffect`에 전달하면 됩니다.

```js
useEffect(() => {
  console.log('isInview? ', isInView);
}, [isInView]);
```

## 옵션

`root: RefObject<HTMLElement>`

기본적으로 `useInView`는 요소가 윈도우 뷰포트에 들어오고/나가는 것(enters/leaves)을 추적합니다.
root를 스크롤 가능한 부모의 ref로 설정하면 그 요소를 뷰포트로 사용합니다.

```js
function Carousel() {
  const container = useRef(null);
  const ref = useRef(null);
  const isInView = useInView({ root: container });

  return (
    <div ref={container} style={{ overflow: 'scroll' }}>
      <div ref={ref} />
    </div>
  );
}
```

`margin: string`

루트 요소 또는 윈도우 뷰포트에 적용할 하나 이상의 여백을 지정합니다. 이로 인해 요소가 **뷰포트 내부로 간주되는 지점**을 확장하거나 축소할 수 있습니다.

여백은 px 또는 %로 정의해야 합니다.

```js
const isInView = useInView({
  margin: '0px 100px -50px 0px',
});
```

참고: 브라우저 보안 이유로, cross-origin iframe에서는 margin이 적용되지 않으며, root를 명시적으로 정의해야 합니다.

`once: boolean`

`once` 옵션을 `true`로 설정하면, 요소가 뷰에 들어오면 `useInView는` 해당 요소를 더 이상 관찰하지 않고 항상 true를 반환합니다.

```js
const isInView = useInView(ref, { once: true });
```

`amount: "some" | "all" | number`

`useInView`가 `true`를 반환하기 위해 뷰포트에 입력해야 하는 요소의 비율입니다.

이는 0과 1 사이의 숫자로 정의되며, 0은 요소의 일부 또는 아무곳이나, 1은 요소의 전체를 의미합니다.
