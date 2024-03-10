import classNames from 'classnames';
import { FC } from 'react';

type CheckboxProps = {
  variant?: 'primary' | 'secondary' | 'dark';
  label?: string;
  error?: string;
  isError?: boolean;
  id?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  value?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({
  name,
  placeholder,
  variant,
  error,
  isError,
  id,
  checked,
  label,
  value,
  className,
  onChange,
  ...rest
}) => {
  const isDark = variant === 'dark';
  const isPrimary = variant === 'primary';

  const inputClass = classNames(
    'h-5 w-5',
    { 'hover:accent-ice-cream-parlour accent-ice-cream-parlour': isDark },
    { 'accent-black': isPrimary },
  );

  const labelClass = classNames(
    'w-full font-goodSans ml-6 text-[10px]',
    { 'text-ice-cream-parlour': isDark },
    { 'text-black': isPrimary },
    { 'text-red': isError },
  );

  return (
    <div
      className={classNames('relative w-full sm:w-[390px]', {
        '': isError,
      })}
    >
      <label htmlFor={id}>
        <div className="flex items-center cursor-pointer">
          <input
            className={inputClass}
            name={name}
            type="checkbox"
            id={id}
            onChange={onChange}
            placeholder={placeholder}
            checked={checked}
            {...rest}
          />

          <span className={labelClass}>{label}</span>
        </div>
      </label>

      {/* {isError && (
        <div className="text-red text-left text-sm absolute top-12 font-goodSans">
          {error}
        </div>
      )} */}
    </div>
  );
};
