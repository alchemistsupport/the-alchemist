import { Slide } from 'react-awesome-reveal';
import { ApiCampaignCampaign } from '../../../schemas';
import { getStrapiMedia } from '../../../lib/media';
import Image from 'next/image';

type Props = {
  campaign: ApiCampaignCampaign;
};

const AdditionalImages = ({ campaign }: Props) => {
  const firstImageSrc = getStrapiMedia(campaign.attributes.campaignFirstImage);
  const secondImageSrc = getStrapiMedia(
    campaign.attributes.campaignSecondImage,
  );
  const thirdImageSrc = getStrapiMedia(campaign.attributes.campaignThirdImage);

  return (
    <Slide triggerOnce direction="up">
      <div className="section">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 ">
          <div className="overflow-hidden">
            <div>
              <Image
                src={firstImageSrc}
                alt=""
                width={325}
                height={250}
                className="overflow-hidden m-auto"
              />
            </div>
          </div>

          <div className="overflow-hidden">
            <div>
              <Image
                src={secondImageSrc}
                alt=""
                width={325}
                height={250}
                className="overflow-hidden m-auto"
              />
            </div>
          </div>

          <div className="overflow-hidden">
            <div>
              <Image
                src={thirdImageSrc}
                alt=""
                width={325}
                height={250}
                className="overflow-hidden m-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};


export default AdditionalImages