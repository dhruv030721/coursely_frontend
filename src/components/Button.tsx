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
      <button className={` font-light flex items-center py-2 text-sm  ${btnClass}`} onClick={handler}>{preicon}{name}{posticon}</button>
    </div>
  )
}

export default Button
