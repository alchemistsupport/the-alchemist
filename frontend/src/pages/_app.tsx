import { Modal } from '@ab/shared/ui';
import App, { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import { IntlProvider } from 'react-intl';

import { fetchAPI } from '../../lib/api';
import de from '../../public/locales/de.json';
import en from '../../public/locales/en.json';

import '@ab/styles/common/globals.css';

const messages = {
  en,
  de,
} as const;

export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { global, modal } = pageProps;
  const { locale } = useRouter();

  // TO-DO: translate without intl context
  return (
    <>
      <IntlProvider
        locale={locale || 'en'}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        messages={messages[(locale as keyof typeof messages) || 'en']}
      >
        <GlobalContext.Provider value={global.attributes}>
          
          <Modal data={modal} />
          <Component {...pageProps} />
        </GlobalContext.Provider>
      </IntlProvider>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
MyApp.getInitialProps = async (ctx: any) => {
  const appProps = await App.getInitialProps(ctx);

  const globalRes = await fetchAPI('/global', {
    populate: {
      favicon: '*',
      defaultSeo: {
        populate: '*',
      },
    },
  });

  const modalRes = await fetchAPI('/modal', {
    populate: '*',
    locale: ctx.locale,
  });

  return {
    ...appProps,
    pageProps: { global: globalRes.data, modal: modalRes.data },
  };
};

export default MyApp;
