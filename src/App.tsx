import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import './App.css';
import useStore from './store';

function App() {
  const theme = useStore(state => state.theme)
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
