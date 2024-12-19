import { MouseEventHandler, ReactNode } from "react"


interface ButtonProps {
  name: string,
  btnClass: string,
  handler: MouseEventHandler<HTMLButtonElement>,
  preicon?: ReactNode
  posticon?: ReactNode
}

const Button = ({ name, btnClass, handler, preicon, posticon }: ButtonProps) => {
  return (
    <div>
      <button className={` font-light px-6 flex items-center py-2 text-sm rounded-md border-b-[0.5px] border-zinc-400 ${btnClass}`} onClick={handler}>{preicon}{name}{posticon}</button>
    </div>
  )
}

export default Button
