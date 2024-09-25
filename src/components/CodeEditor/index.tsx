import { OnChange } from '@monaco-editor/react';
import useStore from '@/store';
import Editor from './Editor';
import FileNameList from './FileNameList';
import { FC, useRef } from 'react';

const CodeEditor: FC = () => {
  const files = useStore(state => state.files);
  const selectedFileName = useStore(state => state.selectedFileName);
  const setFiles = useStore(state => state.setFiles);
  const theme = useStore(state => state.theme);
  const file = files[selectedFileName];


  const onEditorChange: OnChange = (value?: string) => {
    files[file.name].value = value!
    setFiles({ ...files })
  }

  return (
    <div className="flex flex-col h-full ">
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} options={
        { theme: `vs-${theme}` }
      } />
    </div>
  );
};

export default CodeEditor;
