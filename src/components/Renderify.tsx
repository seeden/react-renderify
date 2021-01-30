import React, { useState, ReactNode, forwardRef, useImperativeHandler, createContext } from 'react';
import { useUpdate } from 'react-use';

export const RenderifyContext = createContext<{
  resolve: (value: any) => void,
  reject: (err: Error) => void,
}>(undefined);

type Props = {
  children?: ReactNode;
};

function Renderify(props: Props, ref) {
  const { children } = props;
  const update = useUpdate();
  const [state] = useState<{
    resolve?: (value: any) => void;
    reject?: (error: Error) => void;
    isWorking: boolean;
  }>({
    isWorking: false,
  });

  function reset() {
    state.resolve = undefined;
    state.reject = undefined;
    state.isWorking = false;
  }

  function handleRender() {
    if (state.isWorking) {
      throw new Error('Promise is already in progress');
    }

    return new Promise((resolve, reject) => {
      state.resolve = resolve;
      state.reject = reject;
      state.isWorking = true;

      update();
    });
  }

  function handleResolve(value: any) {
    if (!state.isWorking) {
      throw new Error('Promise is not in progress');
    }

    const { resolve } = state;
    reset();

    resolve(value);
  }

  function handleReject(error: Error) {
    if (!state.isWorking) {
      throw new Error('Promise is not in progress');
    }

    const { reject } = state;
    reset();

    reject(error);
  }

  useImperativeHandler(ref, () => ({
    render: handleRender,
  }));

  const context = {
    resolve: handleResolve,
    reject: handleReject,
  };

  if (!state.isWorking) {
    return null;
  }

  return (
    <RenderifyContext.Provider value={context}>
      {typeof children === 'function' 
        ? children({ 
          onResolve: handleResolve,
          onReject: handleReject,
        })
        : children}
    </RenderifyContext.Provider>
  );
}

export default forwardRef(Renderify);
