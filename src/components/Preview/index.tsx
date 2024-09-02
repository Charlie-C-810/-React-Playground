import useStore from '@/store';
import { FC, useEffect, useState } from 'react';
import { compile } from './compiler';
import Editor from '../CodeEditor/Editor';

const Preview: FC = () => {
  const files = useStore(state => state.files)

  const [compiledCode, setCompiledCode] = useState('')

  useEffect(() => {
    const res = compile(files)
    setCompiledCode(res)
  }, [files])

  return <div style={{ height: '100%' }}>
    <Editor file={{
      name: 'dist.js',
      value: compiledCode,
      language: 'javascript'
    }} />
  </div>
};

export default Preview;
