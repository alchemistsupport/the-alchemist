import localFont from 'next/font/local';
import { ReactNode } from 'react';

import {
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
  ApiCampaignCampaign,
} from '../../../../schemas';
import { Header, Footer } from '../index';

const goodSans = localFont({
  src: '../../../styles/fonts/GoodSans-Medium.otf',
  weight: '400',
  display: 'swap',
  variable: '--font-goodSans',
});

const adieu = localFont({
  src: '../../../styles/fonts/Adieu-Regular.otf',
  weight: '400',
  display: 'swap',
  variable: '--font-adieu',
});

export type footerBgColor = 'black' | 'white' | 'beige';
export type headerBgColor = 'black' | 'white' | 'beige' | 'stout';

type Props = {
  children: ReactNode;
  type: 'light' | 'dark';
  footer: ApiFooterFooter;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
  campaign?: ApiCampaignCampaign
};

export const Layout = ({
  children,
  type,
  footer,
  header,
  screenmenu,
  campaign
}: Props) => (
  <>
    <Header type={type} header={header} screenmenu={screenmenu} campaign={campaign} />
    <main className={`${goodSans.variable} ${adieu.variable}`}>{children}</main>
    <Footer type={type} footer={footer} />
  </>
);
