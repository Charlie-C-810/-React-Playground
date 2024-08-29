import classnames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
  index: number
  swapIndex: (index1: number, index2: number) => void
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick, index, swapIndex } = props;

  const [name, setName] = useState(value);
  const ref = useRef(null)

  const [, drag] = useDrag({
    type: "FileNameItem",
    item: {
      index
    },
  })

  const [{ isOver }, drop] = useDrop(({
    accept: "FileNameItem",
    hover(item: any) {
      swapIndex(item.index, index)
      item.index = index
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver()
      }
    }
  })
  )

  useEffect(() => {
    drag(ref)
    drop(ref)
  }, [])


  return (
    <div
      ref={ref}
      className={classnames(
        `inline-flex pt-2  pb-2.5  px-1.5 cursor-pointer text-sm	items-center border-b-4 border-solid  ${actived ? 'border-cyan-400' : 'border-transparent'
        } ${isOver ? " bg-cyan-100" : ""}`,
      )}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};
