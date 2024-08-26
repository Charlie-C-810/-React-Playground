import { FC } from 'react';
import logoSvg from '../../icons/logo.svg';

const Header: FC = () => {
  return (
    <div className="h-12 border-b border-solid border-gray-900 px-20 flex items-center justify-between box-border">
      <div className="flex items-center text-xl	">
        <img src={logoSvg} alt="logo" className="h-6 mr-2.5" />
        <span className="text-lg font-semibold text-cyan-400">
          React Playground
        </span>
      </div>
    </div>
  );
};

export default Header;
