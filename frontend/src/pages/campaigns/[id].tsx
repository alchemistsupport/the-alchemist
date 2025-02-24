import { GetStaticProps } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { Slide } from 'react-awesome-reveal';
import { getStrapiMedia } from '../../../lib/media';
import { fetchAPI } from '../../../lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdditionalImages from './campaignImages';
import {
  ApiCampaignCampaign,
  ApiContactContact,
  ApiFooterFooter,
  ApiHeaderHeader,
  ApiMenuMenu,
  ApiScreenmenuScreenmenu,
} from '../../../schemas';
import {
  Layout,
  Text,
  SignUpForm,
  Markdown,
  ContactUsForm,
} from '../../shared/ui';
import OpenTableCampaign from './OpenTableCampaign';

type Props = {
  campaign: ApiCampaignCampaign;
  contact: ApiContactContact;
  menu: ApiMenuMenu;
  footer: ApiFooterFooter;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
};

const Campaign = ({
  campaign,
  contact,
  menu,
  footer,
  header,
  screenmenu,
}: Props) => {
  const { hero_banner } = menu;
  const { updateBanner, bannerImage, campaignEmail } = campaign;
  const { sectionsOrder } = campaign;
  const menuURL = campaign.menuFile?.data?.url
  const heroImageSrc = updateBanner
    ? getStrapiMedia(bannerImage)
    : hero_banner.background_image.url;
  const heroImageAlt = updateBanner
    ? bannerImage.name
    : hero_banner.background_image.name;
  const router = useRouter();
  const title = campaign.title.includes('#') ? campaign.title.split('#') : [campaign.title]
  const locale = router.locale === 'en' ? 'de' : 'en';



  const descriptionButtons = campaign.descriptionButtons.map((button: any) => {
    return (
      <Link
        target="_blank"
        href={`${button?.URL}`}
        locale={locale}
        key={button.buttonName}
        className="flex justify-center items-center text-base uppercase tracking-[2px] font-bold font-goodSans z-20 text-beige px-9 py-3 bg-black border-2 border-beige hover:scale-105 duration-300 mt-3"
      >{button.buttonName}</Link>
    )
  })

  return (
    <Layout
      footer={footer}
      type="dark"
      screenmenu={screenmenu}
      header={header}
      campaign={campaign}
    >
      <NextSeo title={campaign.metaTagsg?.metaTitle} />
      <NextSeo description={campaign.metaTags?.metaDescription} />/

      <section className="section section-dark">
        <div className="w-full h-[80vh] relative flex justify-center items-center overflow-hidden flex-col">
          <Image
            alt={heroImageAlt}
            src={heroImageSrc}
            fill
            className="object-cover"
          />

          <Slide triggerOnce direction="up">
            <Text
              as="h1"
              textColor={title[1] === 'dark' ? 'dark' : 'beige'}
              textVariant="heading"
              className="xs:text-2xl text-xl text-center"
            >
              {title[0]}
            </Text>
          </Slide>
          {campaign.CTA?.showCTA && (
            <Slide
              triggerOnce
              duration={1500}
              direction="up"
              className="mt-6 -mb-2"
            >
              <Link
                target="_blank"
                href={`${menuURL}`}
                locale={locale}
                className="flex justify-center items-center text-base uppercase tracking-[2px] font-bold font-goodSans z-20 text-beige px-9 py-3 bg-black border-2 border-beige hover:scale-105 duration-300"
              >
                {campaign.CTA.buttonTitle}
              </Link>
            </Slide>
          )}
          {campaign.showBookingButton && (
            <Slide
              triggerOnce
              duration={1500}
              direction="up"
              className="mt-4 -mb-6"
            >
              <Link
                target="_blank"
                href={campaign.bookingURL}
                locale={locale}
                className="flex justify-center items-center text-base uppercase tracking-[2px] font-bold font-goodSans z-20 text-black px-9 py-3 bg-beige border-2 border-black hover:scale-105 duration-300"
              >
                Book Now
              </Link>
            </Slide>
          )}
        </div>
        <div className="flex flex-col">
          {campaign.showOpenTableWidget && (
            <div className={`section-beige ${sectionsOrder?.openTableWidget}`}>
              <div className="pt-32">
                <OpenTableCampaign campaign={campaign} />
              </div>
            </div>
          )}

          <div
            className={`text-center flex flex-col items-center ${sectionsOrder?.formsSection}`}
          >
            {campaign.showSignUpForm && (
              <div className="my-[-100px]">
                <SignUpForm data={menu.sign_up} />
              </div>
            )}

            {campaign.showContactForm && (
              <ContactUsForm contact={contact} campaign={campaign} />
            )}
          </div>
          {campaign.addCampaignImages && (
            <div
              className={`py-10 bg-beige ${sectionsOrder?.campaignImagesSection}`}
            >
              <AdditionalImages campaign={campaign} />
            </div>
          )}
          <div
            className={`text-center flex flex-col items-center pb-3 ${sectionsOrder?.descriptionSection}`}
          >
            <Slide triggerOnce direction="up">

              <pre className='color-white'>
                <Markdown
                  components={{
                    p: ({ children }) => (
                      <Text
                        as="pre"
                        textColor="beige"
                        textVariant="desc"
                        className="mt-2 lg:mr-40 lg:ml-40 leading-6 break-words whitespace-normal"
                      >
                        {children}
                      </Text>
                    ),
                    h1: ({ children }) => (
                      <Text
                        as="pre"
                        textColor="beige"
                        textVariant="h2-xl"
                        className="mt-3 mb-3 break-words whitespace-normal"
                      >
                        {children}
                      </Text>
                    ),
                    h2: ({ children }) => (
                      <Text
                        as="pre"
                        textColor="beige"
                        textVariant="h2-no-underline"
                        className="mt-3 mb-3 break-words whitespace-normal"
                      >
                        {children}
                      </Text>
                    ),
                    h3: ({ children }) => (
                      <Text
                        as="pre"
                        textColor="beige"
                        textVariant="h3"
                        className="mt-3 mb-3 break-words whitespace-normal"
                      >
                        {children}
                      </Text>
                    ),
                  }}
                  className="pt-8"
                >
                  {campaign.description}
                </Markdown>
                ---------
              </pre>
              {descriptionButtons.length > 0 ? descriptionButtons : ''}
            </Slide>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const campaignsRes: { data: ApiCampaignCampaign[] } = await fetchAPI(
    '/campaigns',
    {
      locale: '*',
      populate: '*',
    },
  );

  const paths = campaignsRes.data.map(campaign => {
    return {
      params: { id: campaign.campaignURL.toString() },
      locale: campaign.locale,
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
  console.log('locale: ', context.locale)
  if (!context.params?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  const [
    campaignRes,
    contactRes,
    menuRes,
    footerRes,
    headerRes,
    screenmenuRes,
  ] = await Promise.all([
    await fetchAPI(`/campaigns`, {
      filters: {
        campaignURL: {
          $eq: context.params.id
        },
        locale: { $eq: context.locale },
      },
      populate: '*',
    }),
    fetchAPI('/contact', {
      populate: '*',
      locale: context.locale,
    }),
    fetchAPI('/menu', {
      populate: {
        seo: { populate: '*' },
        hero_banner: {
          populate: {
            background_image: { populate: '*' },
            primary_image: { populate: '*' },
            secondary_image: { populate: '*' },
          }
        },
        foodPrimaryImage: { populate: '*' },
        foodSecondaryImage: { populate: '*' },
        foodTextImage: { populate: '*' },
        drinksPrimaryImage: { populate: '*' },
        brunchPrimaryImage: { populate: '*' },
        sign_up: { populate: '*' }
      },
      locale: context.locale,
    }),
    fetchAPI('/footer', {
      populate: '*',
      locale: context.locale,
    }),
    fetchAPI('/header', {
      populate: '*',
      locale: context.locale,
    }),
    fetchAPI('/screenmenu', {
      populate: '*',
      locale: context.locale,
    }),
  ]);

  return {
    props: {
      footer: footerRes.data,
      campaign: campaignRes.data[0],
      contact: contactRes.data,
      menu: menuRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
    },
  };
};



export default Campaign;
