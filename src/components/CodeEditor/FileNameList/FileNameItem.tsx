import classnames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick } = props;

  const [name, setName] = useState(value);

  return (
    <div
      className={classnames(
        `inline-flex pt-2  pb-2.5  px-1.5 cursor-pointer text-sm	items-center border-b-4 border-solid  ${
          actived ? 'border-cyan-400' : 'border-transparent'
        }`,
        actived ? 'text-cyan-400' : null
      )}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};
