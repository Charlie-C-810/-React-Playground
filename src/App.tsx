import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import './App.css';
import useStore from './store';
import { useEffect } from 'react';
import { compress } from './utils';

function App() {
  const theme = useStore(state => state.theme)
  useEffect(() => {
    const unsubscribe = useStore.subscribe((state) => {
      console.log("state", state);

      const hash = compress(JSON.stringify(state.files))
      console.log("hash", hash);

      window.location.hash = hash
    });

    // 清理函数
    return () => unsubscribe();
  }, []);
  return (
    <div className={`h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default App;
