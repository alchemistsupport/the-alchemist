import { Modal } from '@ab/shared/ui';
import App, { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import CookieConsent from 'react-cookie-consent';
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
  const translations: {
    [key: string]: { cookie: string; accept: string; decline: string };
  } = {
    de: {
      cookie:
        'Diese Website verwendet Cookies, um die Benutzererfahrung zu verbessern.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen',
    },
    en: {
      cookie: 'This website uses cookies to enhance the user experience.',
      accept: 'Accept',
      decline: 'Decline',
    },
  };

  return (
    <>
      <IntlProvider
        locale={locale || 'en'}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        messages={messages[(locale as keyof typeof messages) || 'en']}
      >
        <GlobalContext.Provider value={global.attributes}>
          <CookieConsent
            location="bottom"
            buttonText={translations[locale as string].accept}
            declineButtonText={translations[locale as string].decline}
            enableDeclineButton
            cookieName="alchemist-cookie"
            style={{
              background: '#0f0a09',
              color: '#f7d2ae',
              borderTopWidth: 1,
              borderColor: '#f7d2ae',
            }}
            buttonStyle={{
              background: '#f7d2ae',
              color: '#4e503b',
              fontSize: '14px',
            }}
            expires={150}
          >
            {translations[locale as string].cookie}{' '}
            <Link href="/privacy-policy" target="_blank" className="underline">
              View privacy policy.
            </Link>
          </CookieConsent>
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
