import useStore from '../../store';
import Editor from './Editor';
import FileNameList from './FileNameList';
import { FC } from 'react';

const CodeEditor: FC = () => {
  const { files, selectedFileName } = useStore();
  const file = files[selectedFileName];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor file={file} />
    </div>
  );
};

export default CodeEditor;
