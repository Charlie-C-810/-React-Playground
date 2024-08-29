import { FC, WheelEvent, useCallback, useEffect, useRef, useState } from 'react';
import useStore from '@/store';
import { FileNameItem } from './FileNameItem';

const FileNameList: FC = () => {
  const files = useStore(state => state.files);
  const selectedFileName = useStore(state => state.selectedFileName);
  const setSelectedFileName = useStore(state => state.setSelectedFileName);

  const [tabs, setTabs] = useState(['']);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    e.stopPropagation();
    containerRef.current!.scrollLeft += e.deltaY;
  }

  const swapIndex = useCallback((index1: number, index2: number) => {
    const tmp = tabs[index1];
    tabs[index1] = tabs[index2];
    tabs[index2] = tmp;
    setTabs([...tabs]);
  }, [tabs])

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  console.log(123);

  return (
    <div className="flex items-center h-12 overflow-x-auto overflow-y-hidden	border-b border-solid  border-gray-400 box-border	text-black	bg-white scroll-bar" ref={containerRef} onWheel={handleWheel}>
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
          index={index}
          swapIndex={swapIndex}
        ></FileNameItem>
      ))}
    </div>
  );
};

export default FileNameList;
