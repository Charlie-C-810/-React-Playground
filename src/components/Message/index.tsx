import React, { useEffect, useState } from 'react'

export interface MessageProps {
 type: 'error' | 'warn'
 content: string
}

export const Message: React.FC<MessageProps> = (props) => {
 const { type, content } = props
 const [visible, setVisible] = useState(false)

 const color = type === "error" ? "text-textErrorColor" : "text-textWarnColor"
 const bgColor = type === "error" ? "bg-bgErrorColor" : "bg-bgWarnColor"
 const borderColor = type === "error" ? "border-borderErrorColor" : "border-borderWarnColor"
 const btnColor = type === "error" ? "bg-btnBgErrorColor text-btnTextErrorColor" : "bg-btnBgWarnColor text-btnTextWarnColor"

 useEffect(() => {
  setVisible(!!content)
 }, [content])

 return visible ? (
  <div className={`absolute right-2 bottom-0 left-2 z-10	flex max-h-[calc(100%-300px)] min-h-10	mb-[8px] text-black	rounded-md	border-4	border-solid ${color} ${bgColor} ${borderColor} 	`}>
   <pre dangerouslySetInnerHTML={{ __html: content }} className="px-5 py-2.5 overflow-auto	whitespace-break-spaces	m-0"></pre>
   <button onClick={() => setVisible(false)} className={`absolute top-0.5 right-0.5 block w-4 h-4 p-0	text-xs	${btnColor} text-center	cursor-pointer rounded-lg`}>
    ✕
   </button>
  </div>
 ) : null
}


