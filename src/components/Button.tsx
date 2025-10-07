import { MouseEventHandler, ReactNode } from 'react';
interface ButtonProps {
  name: ReactNode | string;
  btnClass: string;
  handler?: MouseEventHandler<HTMLButtonElement>;
  preicon?: ReactNode;
  posticon?: ReactNode;
  divClass?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  form?: string;
  disabled?: boolean;
}

const Button = ({
  name,
  btnClass,
  handler,
  preicon,
  posticon,
  type,
  divClass,
  form,
  disabled,
}: ButtonProps) => {
  return (
    <div className={`${divClass}`}>
      <button
        type={type}
        className={` font-light flex justify-center items-center py-2 text-sm  ${btnClass}`}
        onClick={handler}
        form={form}
        disabled={disabled}
      >
        {preicon}
        {name}
        {posticon}
      </button>
    </div>
  );
};

export default Button;
