import { useContext } from 'react';
import { RenderifyContext } from '../components/Renderify';

export default function useResponse(): {
  resolve: (value: any) => void,
  reject: (err: Error) => void,
} {
  const context = useContext(RenderifyContext);

  return {
    resolve: context.resolve,
    reject: context.reject,
  };
}
