import { FC } from 'react';
import logoSvg from '../../icons/logo.svg';
import useStore from '@/store';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const Header: FC = () => {
  const theme = useStore(state => state.theme)
  const setTheme = useStore(state => state.setTheme)
  return (
    <div className="h-12 border-b border-solid border-gray-900 px-20 flex items-center justify-between box-border dark:bg-darkBgColor">
      <div className="flex items-center text-xl	">
        <img src={logoSvg} alt="logo" className="h-6 mr-2.5" />
        <span className="text-lg font-semibold text-cyan-400">
          React Playground
        </span>
      </div>
      <div >
        {theme === 'light' && (
          <MoonOutlined
            title='切换暗色主题'
            onClick={() => setTheme('dark')}
          />
        )}
        {theme === 'dark' && (
          <SunOutlined
            title='切换亮色主题'
            className="text-cyan-400"
            onClick={() => setTheme('light')}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
