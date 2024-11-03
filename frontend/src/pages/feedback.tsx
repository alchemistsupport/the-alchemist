import { fetchAPI } from '../../lib/api';
import { Layout, Text } from '@ab/shared/ui';
import { ApiFeedbackFeedback, ApiFooterFooter, ApiHeaderHeader, ApiScreenmenuScreenmenu } from '../../schemas';
import { GetStaticProps } from 'next';
import { Slide } from 'react-awesome-reveal';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

type Props = {
    feedback: ApiFeedbackFeedback,
    header: ApiHeaderHeader,
    footer: ApiFooterFooter,
    screenmenu: ApiScreenmenuScreenmenu
}

const Feedback = ({ feedback, header, footer, screenmenu }: Props) => {
    const router = useRouter();
    const locale = router.locale === 'en' ? 'de' : 'en';
    const backgroundImage = feedback.background.url
    return (
        <Layout
            header={header}
            footer={footer}
            type='dark'
            screenmenu={screenmenu}>
            <NextSeo title='Feedback' />
            <section className='section section-dark'>
                <div className='w-full h-[80vh] relative flex justify-center items-center overflow-hidden flex-col'>
                    <Image
                        alt='feedback'
                        src={backgroundImage}
                        fill
                        className='object-cover'
                    />

                    <Slide triggerOnce direction='up'>
                        <Text
                            as='h1'
                            textColor='beige'
                            textVariant='heading'
                            className='xs:text-2xl text-xl text-center'
                        >
                            {feedback.title}
                        </Text>
                    </Slide>
                    <Slide
                        triggerOnce
                        duration={1500}
                        direction='up'
                        className='mt-4 -mb-6'
                    >
                        <Link
                            target='_blank'
                            href={feedback.FIB}
                            locale={locale}
                            className='flex justify-center items-center text-base uppercase tracking-[2px] font-bold font-goodSans z-20 text-black px-9 py-3 bg-beige border-2 border-black hover:scale-105 duration-300'
                        >
                            {feedback.buttonText}
                        </Link>
                    </Slide>
                </div>
            </section>

        </Layout>

    )

}

export const getStaticProps: GetStaticProps = async context => {
    const [feedbackRes, footerRes, headerRes, screenmenuRes] = await Promise.all([
        fetchAPI('/feedback', {
            populate: '*',
            locale: context.locale,
        }),
        fetchAPI('/footer', {
            populate: {
                Logo_black: '*',
                Logo_gold: '*',
            },
            locale: context.locale,
        }),
        fetchAPI('/header', {
            populate: {
                first: '*',
                second: '*',
            },
            locale: context.locale,
        }),
        fetchAPI('/screenmenu', {
            populate: {
                image: '*',
                navigation: '*',
            },
            locale: context.locale,
        }),
    ]);

    return {
        props: {
            footer: footerRes.data,
            feedback: feedbackRes.data,
            header: headerRes.data,
            screenmenu: screenmenuRes.data,
        },
        revalidate: 1,
    };
};

export default Feedback