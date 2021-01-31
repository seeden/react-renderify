import { useRef } from 'react';

export default function useRenderify<T>(): [
  () => Promise<T>,
  any,
] {
  const connectRenderify = useRef(null);

  function handleRender(...args): Promise<T> {
    if (connectRenderify.current) {
      return connectRenderify.current.render(...args);
    }

    throw new Error('Wait for component render or wait for next version.');
  }

  return [handleRender, connectRenderify];
}
