import { useRouter } from 'next/router';
import { ApiCampaignCampaign } from '../../../../schemas';

type WidgetProps = {
  className?: string;
  campaign?: ApiCampaignCampaign;
};

export const OpenTableWidget = ({ className, campaign }: WidgetProps) => {
  const { locale } = useRouter();

  const locales: { [key: string]: string } = {
    de: 'de-DE',
    en: 'en-US',
  };

  const widgetLocale = locales[locale as string];
 

  return (
    <div className={className}>
      <div className="min-[850px]:hidden flex w-full justify-center items-center">
        <iframe src={`https://www.opentable.de/widget/reservation/canvas?rid=294264&type=standard&theme=standard&overlay=false&domain=de&lang=${widgetLocale}&r3uid=0ebLDB40V&newtab=false&disablega=true&ot_source=Restaurant%20website&color=3`} width="225" height="350"></iframe>
      </div>

      <div className="hidden min-[850px]:flex min-[850px]:w-full justify-center items-center">
        <iframe src={`https://www.opentable.de/widget/reservation/canvas?rid=294264&type=standard&theme=wide&overlay=false&domain=de&lang=${widgetLocale}&r3uid=0ebLDB40V&newtab=false&disablega=true&ot_source=Restaurant%20website&color=3`} width="840" height="350"></iframe>
      </div>
    </div>
  );
};
