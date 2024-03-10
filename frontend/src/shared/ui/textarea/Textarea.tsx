import { FC, TextareaHTMLAttributes } from 'react';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: FC<TextAreaProps> = ({ placeholder, ...rest }) => {
  return (
    <textarea
      className="h-[100px] w-full resize-none focus:outline-0 sm:w-[390px] text-ice-cream-parlour bg-black placeholder:text-sm placeholder:font-semibold placeholder:tracking-[2px] placeholder:font-goodSans px-3 py-2 border-2 border-ice-cream-parlour placeholder-ice-cream-parlour placeholder:text-center"
      placeholder={placeholder}
      {...rest}
    />
  );
};
