import cn from 'classnames';
import * as React from 'react';

type TextVariants =
  | 'heading'
  | 'base'
  | 'h1'
  | 'h2'
  | 'h2-no-underline'
  | 'h2-xl'
  | 'h3'
  | 'desc'
  | 'stroke'
  | 'title'
  | 'stroke-xl';
type TextColors = 'beige' | 'dark' | 'white';

type TextOwnProps<E extends React.ElementType = React.ElementType> = {
  children: React.ReactNode;
  as?: E;
  textVariant?: TextVariants;
  textColor?: TextColors;
};

type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps>;

const defaultElement = 'p';

function Text<E extends React.ElementType = typeof defaultElement>({
  children,
  as,
  className,
  textVariant,
  textColor = 'dark',
  ...rest
}: TextProps<E>) {
  const Component = as || 'p';

  const color = {
    'text-ice-cream-parlour': textColor === 'beige',
    'text-black': textColor === 'dark',
    'text-white': textColor === 'white',
  };

  return (
    <Component
      className={cn(
        {
          'text-5xl sm:text-7xl md:text-8xl text-center tracking-widest uppercase font-adieu':
            textVariant === 'heading',
          ...color,
        },
        {
          'text-6xl sm:text-7xl md:text-9xl text-center tracking-widest uppercase font-adieu ':
            textVariant === 'title',
          ...color,
        },
        {
          'text-sm tracking-widest font-goodSans uppercase':
            textVariant === 'base',
          ...color,
        },
        {
          'text-xl tracking-widest font-goodSans uppercase':
            textVariant === 'h1',
          ...color,
        },
        {
          'text-xl underline tracking-widest font-goodSans uppercase':
            textVariant === 'h2',
          ...color,
        },
        {
          'text-xl tracking-widest font-goodSans uppercase':
            textVariant === 'h2-no-underline',
          ...color,
        },
        {
          'text-2xl font-goodSans uppercase tracking-widest':
            textVariant === 'h2-xl',
          ...color,
        },
        {
          'text-lg font-goodSans uppercase tracking-widest':
            textVariant === 'h3',
          ...color,
        },
        {
          'text-sm italic font-goodSans uppercase tracking-widest':
            textVariant === 'desc',
          ...color,
        },
        {
          'text-3xl md:text-4xl lg:text-7xl text-stroke text-center tracking-widest uppercase font-adieu':
            textVariant === 'stroke',
          ...color,
        },
        {
          'text-2xl xs:text-3xl sm:text-5xl md:text-6xl xl:text-[140px] text-center tracking-[14px] uppercase font-adieu text-stroke':
            textVariant === 'stroke-xl',
          ...color,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
export { Text };
