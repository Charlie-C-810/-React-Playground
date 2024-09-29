import { FC } from 'react';
import logoSvg from '../../icons/logo.svg';
import useStore from '@/store';
import { DownloadOutlined, MoonOutlined, ShareAltOutlined, SunOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { downloadFiles } from '@/utils';

const Header: FC = () => {
  const theme = useStore(state => state.theme)
  const setTheme = useStore(state => state.setTheme)
  const files = useStore(state => state.files)
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
        <ShareAltOutlined
          style={{ marginLeft: '10px' }}
          onClick={() => {
            copy(window.location.href);
            alert('分享链接已复制。')
          }}
        />
        <DownloadOutlined
          style={{ marginLeft: '10px' }}
          onClick={async () => {
            await downloadFiles(files);
            alert('下载完成')
          }}
        />

      </div>
    </div>
  );
};

export default Header;
