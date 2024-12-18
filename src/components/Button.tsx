import { MouseEventHandler, ReactNode } from "react"


interface ButtonProps {
  name: string,
  btnClass: string,
  handler: MouseEventHandler<HTMLButtonElement>,
  icon?: ReactNode
}

const Button = ({ name, btnClass, handler, icon }: ButtonProps) => {
  return (
    <div>
      <button className={`text-black px-6 flex items-center py-2 text-sm rounded-md border-b-[0.5px] border-zinc-400 ${btnClass}`} onClick={handler}>{name}{icon}</button>
    </div>
  )
}

export default Button
