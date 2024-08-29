import useStore from '@/store';
import { FC } from 'react';

const Preview: FC = () => {
  const setCount = useStore(state => state.setCount)
  return <div onClick={setCount}>Preview</div>;
};

export default Preview;
