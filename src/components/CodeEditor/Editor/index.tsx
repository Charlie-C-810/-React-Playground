import MonacoEditor, { EditorProps, Monaco, OnMount } from '@monaco-editor/react';
import { forwardRef } from 'react';
import { createATA } from './ata';
import { editor } from 'monaco-editor';

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}
interface IProps {
  file: EditorFile;
  onChange?: EditorProps['onChange'];
  options?: editor.IStandaloneEditorConstructionOptions;
}
const Editor = (props: IProps, ref: any) => {
  const { file, onChange, options } = props;

  const handleEditorMount: OnMount = (editor, monaco) => {
    // ctrl或者cmd+s保存
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      // 输入 <div> 输出 <div>，保留原样
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      // 编译的时候自动加上 default 属性
      esModuleInterop: true,
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    editor.onDidFocusEditorText(() => {
      ata(editor.getValue());
    })

    ata(editor.getValue());
  };

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      value={file.value}
      onMount={handleEditorMount}
      onChange={onChange}
      options={{
        fontSize: 14,
        // 到达文件的最后一行时，编辑器将不再继续滚动
        scrollBeyondLastLine: false,
        // 设置滚动条大小
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
};

export default Editor;
