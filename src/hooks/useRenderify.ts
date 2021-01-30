import { useRef } from 'react';

export default function useRenderify<T>(): {
  render: () => Promise<T>,
  ref,
} {
  const ref = useRef(null);

  function handleRender(...args): Promise<T> {
    if (ref.current) {
      return ref.current.render(...args);
    }

    throw new Error('Wait for component render or wait for next version.');
  }

  return {
    ref,
    render: handleRender,
  };
}
