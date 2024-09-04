import { FC, WheelEvent, useCallback, useEffect, useRef, useState } from 'react';
import useStore from '@/store';
import { FileNameItem } from './FileNameItem';

const FileNameList: FC = () => {
  const files = useStore(state => state.files);
  const selectedFileName = useStore(state => state.selectedFileName);
  const setSelectedFileName = useStore(state => state.setSelectedFileName);
  const addFile = useStore(state => state.addFile);

  const [tabs, setTabs] = useState(['']);
  const containerRef = useRef<HTMLDivElement>(null);
  const [creating, setCreating] = useState(false);

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

  const addTab = () => {
    const newFileName = 'Comp' + Math.random().toString().slice(2, 8) + '.tsx';
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreating(true)
  }

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className="flex items-center h-12 overflow-x-auto overflow-y-hidden	border-b border-solid  border-gray-400 box-border	text-black	bg-white scroll-bar" ref={containerRef} onWheel={handleWheel}>
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          actived={selectedFileName === item}
          onClick={() => {
            setSelectedFileName(item)
          }}
          index={index}
          swapIndex={swapIndex}
          creating={index === arr.length - 1 && creating}
        ></FileNameItem>
      ))}
      <div onClick={addTab}>
        +
      </div>
    </div>
  );
};

export default FileNameList;
