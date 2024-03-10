import Link from 'next/link';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type Props = {
  className?: string;
  components?: Partial<
    Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
  >;
  children: string;
};

export const Markdown = ({ className, components, children }: Props) => (
  <ReactMarkdown
    className={className}
    components={{
      h2: ({ children }) => (
        <h2 className="text-xl sm:text-xl md:text-2xl text-center sm:text-center origin-top tracking-widest uppercase pt-32 font-bold text-black">
          {children}
        </h2>
      ),
      p: ({ children }) => (
        <p className="pt-6 px-8 italic text-base text-black font-times text-center uppercase">
          {children}
        </p>
      ),
      a: ({ children, href }) => (
        <Link
          target="_blank"
          href={href || '#'}
          className="text-beige break-words"
        >
          {children}
        </Link>
      ),
      ...components,
    }}
  >
    {children}
  </ReactMarkdown>
);
