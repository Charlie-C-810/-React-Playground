import { FC, useEffect, useState } from 'react';
import useStore from '../../../store';
import { FileNameItem } from './FileNameItem';

const FileNameList: FC = () => {
  const { files, setSelectedFileName, selectedFileName } = useStore();

  const [tabs, setTabs] = useState(['']);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);
  return (
    <div className="flex items-center h-12 overflow-x-auto overflow-y-hidden	border-b border-solid  border-gray-400 box-border	text-black	bg-white">
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
        ></FileNameItem>
      ))}
    </div>
  );
};

export default FileNameList;
