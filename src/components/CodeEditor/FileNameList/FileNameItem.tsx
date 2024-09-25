import { ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME } from '@/files';
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
  onEditComplete: (name: string) => void
}

const readonlyFileNames = [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME];


export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick, index, swapIndex, creating, onEditComplete } = props;

  const setSelectedFileName = useStore(state => state.setSelectedFileName)
  const removeFile = useStore(state => state.removeFile)

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
    onEditComplete(name)
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


  const handleRemove = (name: string) => {
    const result = confirm(`是否要删除${name}？`)
    if (result) {
      removeFile(name)
      setSelectedFileName(ENTRY_FILE_NAME)
    }
  }

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
        `inline-flex pt-2  pb-2.5  px-1.5 cursor-pointer text-sm	items-center border-b-4 border-solid   ${actived ? 'border-cyan-400 text-cyan-400' : 'border-transparent dark:text-white'
        } ${isOver ? " bg-cyan-100" : ""}`,
      )}
      onClick={onClick}
    >
      {
        editing ? (
          <input
            ref={inputRef}
            className="w-24  py-1 pr-2.5  text-xs	 text-black	bg-slate-200	rounded outline-none	border-solid	border border-slate-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={hanldeInputBlur}
          />
        ) : (
          <>
            <span onDoubleClick={handleDoubleClick}>{name}</span>
            {!readonlyFileNames.includes(name) && <span className='flex ml-1' onClick={(e) => {
              e.stopPropagation()
              handleRemove(name)
            }}>
              <svg width='12' height='12' viewBox='0 0 24 24'>
                <line stroke='#999' x1='18' y1='6' x2='6' y2='18'></line>
                <line stroke='#999' x1='6' y1='6' x2='18' y2='18'></line>
              </svg>
            </span>}
          </>
        )
      }
    </div>
  );
};
