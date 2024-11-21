import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

export type bgColor = 'white' | 'black' | 'gold' | 'beige';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant: 'primary' | 'secondary' | 'dark';
  label?: string;
  type?: 'file' | 'text' | 'mask';
  error?: string;
  isError?: boolean;
  withOffset?: boolean;
};

export const Input: FC<InputProps> = ({
  name,
  placeholder,
  variant,
  type,
  error,
  withOffset,
  isError,
  id,
  ...rest
}) => {
  const isDark = variant === 'dark';
  const isPrimary = variant === 'primary';

  const inputClass = classNames(
    'w-full focus:outline-0 placeholder:text-xs placeholder:font-semibold placeholder:tracking-[2px] placeholder:font-goodSans px-3 py-2 border-2 placeholder:text-center',
    { 'placeholder-ice-cream-parlour bg-black text-ice-cream-parlour': isDark },
    { 'placeholder-black': isPrimary },
    { 'text-red placeholder-red': isError },
  );

  return (
    <div
      className={classNames('relative w-full sm:w-[390px]', {
        'mb-4': isError,
      })}
    >
      
      <InputMask
        mask={type === 'mask' ? '99-99-9999' : ''}
        className={inputClass}
        name={name}
        id={id}
        placeholder={placeholder}
        {...(rest as any)}
        
      />

      {isError && (
        <div className="text-red text-left text-sm absolute top-12 font-goodSans">
          {error}
        </div>
      )}
    </div>
  );
};
