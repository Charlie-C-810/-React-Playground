import useStore from '@/store';
import classnames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
  index: number
  swapIndex: (index1: number, index2: number) => void
  creating: boolean
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick, index, swapIndex, creating } = props;

  const updateFileName = useStore(state => state.updateFileName)
  const setSelectedFileName = useStore(state => state.setSelectedFileName)

  const [name, setName] = useState(value);
  const ref = useRef(null)
  const [editing, setEditing] = useState(creating)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    setEditing(true)
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)
  }


  const hanldeInputBlur = () => {
    setEditing(false);
    updateFileName(value, name)
    setSelectedFileName(name)
  }


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

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus()
    }
  }, [creating])

  return (
    <div
      ref={ref}
      className={classnames(
        `inline-flex pt-2  pb-2.5  px-1.5 cursor-pointer text-sm	items-center border-b-4 border-solid   ${actived ? 'border-cyan-400 text-cyan-400' : 'border-transparent'
        } ${isOver ? " bg-cyan-100" : ""}`,
      )}
      onClick={onClick}
    >
      {
        editing ? (
          <input
            ref={inputRef}
            className="w-24  pl-[10px]  text-[13px] text-black	bg-slate-200	rounded outline-none	border-solid	border border-slate-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={hanldeInputBlur}
          />
        ) : (
          <span onDoubleClick={handleDoubleClick}>{name}</span>
        )
      }
    </div>
  );
};
