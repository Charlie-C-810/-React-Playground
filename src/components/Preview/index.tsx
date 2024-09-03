import useStore from '@/store';
import { FC, useEffect, useState } from 'react';
import { compile } from './compiler';
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '@/files';

const Preview: FC = () => {
  const files = useStore(state => state.files)

  const [compiledCode, setCompiledCode] = useState('')

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

  useEffect(() => {
    const res = compile(files)
    setCompiledCode(res)
  }, [files])

  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

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
  </div>
};

export default Preview;
