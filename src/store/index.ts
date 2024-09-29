import { create } from 'zustand';
import { EditorFile } from '../components/CodeEditor/Editor';
import { fileName2Language, uncompress } from '../utils';
import { initFiles } from '../files';

export interface Files {
  [key: string]: EditorFile;
}

export type Theme = "light" | "dark"

export interface PlaygroundContext {
  // 文件对象
  files: Files;
  // 当前选择的文件
  selectedFileName: string;
  // 修改当前选择的文件
  setSelectedFileName: (fileName: string) => void;
  // 修改文件对象
  setFiles: (files: Files) => void;
  // 添加文件
  addFile: (fileName: string) => void;
  // 删除某个文件
  removeFile: (fileName: string) => void;
  // 修改文件名称
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
  // 移动文件
  swapFileName: (oldFieldName: string, newFieldName: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void
}

const getFilesFromUrl = () => {
  let files: Files | undefined
  try {
    const hash = uncompress(window.location.hash.slice(1))
    files = JSON.parse(hash)
  } catch (error) {
    console.error(error)
  }
  return files
}


const useStore = create<PlaygroundContext>((set, get) => ({
  theme: "light",
  files: getFilesFromUrl() || initFiles,
  selectedFileName: 'App.tsx',
  setSelectedFileName: (fileName) => set({ selectedFileName: fileName }),
  setFiles: (files) => set({ files }),
  addFile: (name) => {
    const files = get().files;
    files[name] = {
      name,
      language: fileName2Language(name),
      value: '',
    };
    return set({ files: { ...files } });
  },
  removeFile: (name) => {
    const files = get().files;
    delete files[name];
    return set({ files: { ...files } });
  },
  updateFileName: (oldFieldName: string, newFieldName: string) => {
    const files = get().files;
    if (
      !files[oldFieldName] ||
      newFieldName === undefined ||
      newFieldName === null
    )
      return;
    const { [oldFieldName]: value, ...rest } = files;
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName,
      },
    };
    return set({ files: { ...rest, ...newFile } });
  },
  swapFileName(oldFieldName: string, newFieldName: string) {
    const files = get().files;

    const oldValue = files[oldFieldName]
    files[oldFieldName] = {
      ...files[newFieldName],
      name: oldFieldName
    }
    files[newFieldName] = {
      ...oldValue,
      name: newFieldName
    }

    return set({ files });
  },
  setTheme(theme: Theme) {
    return set({ theme })
  }
}));

export default useStore;
