import { useRouter } from 'next/router';
import { ApiCampaignCampaign } from '../../../schemas';

type WidgetProps = {
  className?: string;
  campaign: ApiCampaignCampaign;
};

const OpenTableCampaign = ({ className, campaign }: WidgetProps) => {
  const { locale } = useRouter();

  const locales: { [key: string]: string } = {
    de: 'de-DE',
    en: 'en-US',
  };

  const widgetLocale = locales[locale as string];
  const campaignWidget = campaign.attributes.openTableWidget;

  const src = `https${campaignWidget.split('https')[1]?.split('"')[0]}`;

  const srcWide = src.includes('theme=standard')
    ? `${src.split('theme=standard')[0]}theme=wide${
        src.split('theme=standard')[1]
      }`
    : src;

  const srcStandard = src.includes('theme=wide')
    ? `${src.split('theme=wide')[0]}theme=standard${src.split('theme=wide')[1]}`
    : src;

  return (
    <div className={className}>
      <div className="min-[850px]:hidden flex w-full justify-center items-center">
        <iframe
          src={srcStandard}
          width="225"
          height="350"
        ></iframe>
      </div>

      <div className="hidden min-[850px]:flex min-[850px]:w-full justify-center items-center">
        <iframe
          src={srcWide}
          width="840"
          height="350"
        ></iframe>
      </div>
    </div>
  );
};


export default OpenTableCampaign