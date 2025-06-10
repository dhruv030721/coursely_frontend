import { MouseEventHandler, ReactNode } from "react"
interface ButtonProps {
  name: string,
  btnClass: string,
  handler?: MouseEventHandler<HTMLButtonElement>,
  preicon?: ReactNode
  posticon?: ReactNode
  type?: "submit" | "reset" | "button" | undefined
}

const Button = ({ name, btnClass, handler, preicon, posticon, type }: ButtonProps) => {
  return (
    <div>
      <button type={type} className={` font-light flex justify-center items-center py-2 text-sm  ${btnClass}`} onClick={handler}>{preicon}{name}{posticon}</button>
    </div>
  )
}

export default Button
