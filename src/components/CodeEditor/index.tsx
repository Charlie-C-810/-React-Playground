import { OnChange } from '@monaco-editor/react';
import useStore from '@/store';
import Editor from './Editor';
import FileNameList from './FileNameList';
import { FC } from 'react';

const CodeEditor: FC = () => {
  const files = useStore(state => state.files);
  const selectedFileName = useStore(state => state.selectedFileName);
  const setFiles = useStore(state => state.setFiles);
  const file = files[selectedFileName];

  const onEditorChange: OnChange = (value?: string) => {
    files[file.name].value = value!
    setFiles({ ...files })
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
};

export default CodeEditor;
