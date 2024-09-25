import useStore from '@/store';
import { FC, useEffect, useRef, useState } from 'react';
// import { compile } from './compiler.ts';
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '@/files';
import { Message } from '../Message';
import CompilerWorker from './compiler.worker?worker'

interface MessageData {
  data: {
    type: string
    message: string
  }
}

const Preview: FC = () => {
  const files = useStore(state => state.files)

  const [compiledCode, setCompiledCode] = useState('')
  const [error, setError] = useState('')

  const getIframeUrl = () => {
    const res = iframeRaw.replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value
      }</script>`
    ).replace(
      '<script type="module"></script>',
      `<script type="module">${compiledCode}</script>`,
    )

    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

  // useEffect(() => {
  //   const res = compile(files)
  //   setCompiledCode(res)
  // }, [files])

  useEffect(() => {
    console.log(compiledCode);
    setIframeUrl(getIframeUrl())
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  const compilerWorkerRef = useRef<Worker>();

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener('message', ({ data }) => {
        if (data.type === 'COMPILED_CODE') {
          setCompiledCode(data.data);
        } else {
          //console.log('error', data);
        }
      })
    }
  }, []);

  useEffect(() => {
    compilerWorkerRef.current?.postMessage(files)
  }, [files]);

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data
    if (type === 'ERROR') {
      setError(message)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return <div style={{ height: '100%' }}>
    <iframe
      src={iframeUrl}
      style={{
        width: '100%',
        height: '100%',
        padding: 0,
        border: 'none',
      }}
    />
    <Message type='warn' content={error} />
  </div>
};

export default Preview;
