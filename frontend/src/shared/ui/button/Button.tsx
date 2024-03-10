import cn from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary' | 'beige';
  name: string;
  className?: string;
};

export const Button: FC<ButtonProps> = ({
  name,
  variant,
  className,
  ...rest
}) => {
  const buttonClass = cn(
    `w-full w-[290px] sm:w-[390px] font-bold tracking-[2px] px-3 py-2 ${className}`,
    {
      'underline border-2 text-center text-base bg-black text-white border-black':
        variant === 'primary',
    },
    {
      'border-2 border-ice-cream-parlour bg-black text-ice-cream-parlour text-center text-ice-cream-parlour text-lg':
        variant === 'secondary',
    },
    {
      'bg-ice-cream-parlour text-black placeholder:text-black border-ice-cream-parlour':
        variant === 'beige',
    },
  );

  return (
    <button className={buttonClass} {...rest}>
      {name}
    </button>
  );
};
