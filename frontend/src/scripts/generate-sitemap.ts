import fs from 'fs'
import path from 'path'
import { fetchAPI } from '../../lib/api'

type Campaign = {
    campaignURL: string,
    updatedAt: string,
    locale: 'en' | 'de'
}

const generateSitemap = async () => {
    const baseURL = 'https://www.thealchemist.de'

    const [homePage, menu, book, contact, vacancy, policy, feedback, impressum, campaigns, homePageDeutsch, menuDeutsch, bookDeutsch, contactDeutsch, vacancyDeutsch, policyDeutsch, feedbackDeutsch, impressumDeutsch, campaignsDeutsch] = await Promise.all([
        fetchAPI('/homepage', {
            fields: ['updatedAt', 'locale'],
            locale: 'en'
        }),
        fetchAPI('/menu', {
            fields: ['updatedAt', 'locale'],
            locale: 'en'
        }),
        fetchAPI('/book', {
            fields: ['updatedAt', 'locale'],
            locale: 'en'
        }),
        fetchAPI('/contact', {
            fields: ['updatedAt', 'locale'],
            locale: 'en'
        }),
        // fetchAPI('/faqs', {
        //     fields: ['updatedAt', 'locale'],
        //     locale: 'en'
        // }),
        fetchAPI('/vacancy', {
            fields: ['updatedAt', 'locale'],
            locale: 'en'
        }),
        fetchAPI('/policy', {
            fields: ['updatedAt', 'locale'],
            locale: 'en'
        }),
        fetchAPI('/feedback', {
            fields: ['updatedAt', 'locale'],
            locale: 'en'
        }),
        fetchAPI('/impressum', {
            fields: ['updatedAt', 'locale'],
            locale: 'en'
        }),
        fetchAPI('/campaigns', {
            fields: ['campaignURL', 'updatedAt', 'locale'],
            locale: 'en'
        }),
        fetchAPI('/homepage', {
            fields: ['updatedAt', 'locale'],
            locale: 'de'
        }),
        fetchAPI('/menu', {
            fields: ['updatedAt', 'locale'],
            locale: 'de'
        }),
        fetchAPI('/book', {
            fields: ['updatedAt', 'locale'],
            locale: 'de'
        }),
        fetchAPI('/contact', {
            fields: ['updatedAt', 'locale'],
            locale: 'de'
        }),
        // fetchAPI('/faqs', {
        //     fields: ['updatedAt', 'locale'],
        //     locale: 'de'
        // }),
        fetchAPI('/vacancy', {
            fields: ['updatedAt', 'locale'],
            locale: 'de'
        }),
        fetchAPI('/policy', {
            fields: ['updatedAt', 'locale'],
            locale: 'de'
        }),
        fetchAPI('/feedback', {
            fields: ['updatedAt', 'locale'],
            locale: 'de'
        }),
        fetchAPI('/impressum', {
            fields: ['updatedAt', 'locale'],
            locale: 'de'
        }),
        fetchAPI('/campaigns', {
            fields: ['campaignURL', 'updatedAt', 'locale'],
            locale: 'de'
        }),
    ])

    const campaignsPages = [
        ...campaigns.data.map((campaign: Campaign) => {
            return {
                url: `/campaigns/${campaign.campaignURL}`,
                locale: campaign.locale,
                updatedAt: campaign.updatedAt
            }
        }),
        ...campaignsDeutsch.data.map((campaign: Campaign) => {
            return {
                url: `/campaigns/${campaign.campaignURL}`,
                locale: campaign.locale,
                updatedAt: campaign.updatedAt
            }
        }),
    ]

    const pages = [
        {
            url: '/',
            locale: homePage.data.locale,
            updatedAt: homePage.data.updatedAt
        },
        {
            url: '/book',
            locale: book.data.locale,
            updatedAt: book.data.updatedAt
        },
        {
            url: '/contact',
            locale: contact.data.locale,
            updatedAt: contact.data.updatedAt
        },
        // {
        //     url: '/faqs',
        //     locale: faqs.data.locale,
        //     updatedAt: faqs.data.updatedAt
        // },
        {
            url: '/feedback',
            locale: feedback.data.locale,
            updatedAt: feedback.data.updatedAt
        },
        {
            url: '/impressum',
            locale: impressum.data.locale,
            updatedAt: impressum.data.updatedAt
        },
        {
            url: '/menu',
            locale: menu.data.locale,
            updatedAt: menu.data.updatedAt
        },
        {
            url: '/privacy-policy',
            locale: policy.data.locale,
            updatedAt: policy.data.updatedAt
        },
        {
            url: '/vacancy',
            locale: vacancy.data.locale,
            updatedAt: vacancy.data.updatedAt
        },
        {
            url: '/',
            locale: homePageDeutsch.data.locale,
            updatedAt: homePageDeutsch.data.updatedAt
        },
        {
            url: '/book',
            locale: bookDeutsch.data.locale,
            updatedAt: bookDeutsch.data.updatedAt
        },
        {
            url: '/contact',
            locale: contactDeutsch.data.locale,
            updatedAt: contactDeutsch.data.updatedAt
        },
        // {
        //     url: '/faqs',
        //     locale: faqsDeutsch.data.locale,
        //     updatedAt: faqsDeutsch.data.updatedAt
        // },
        {
            url: '/feedback',
            locale: feedbackDeutsch.data.locale,
            updatedAt: feedbackDeutsch.data.updatedAt
        },
        {
            url: '/impressum',
            locale: impressumDeutsch.data.locale,
            updatedAt: impressumDeutsch.data.updatedAt
        },
        {
            url: '/menu',
            locale: menuDeutsch.data.locale,
            updatedAt: menuDeutsch.data.updatedAt
        },
        {
            url: '/privacy-policy',
            locale: policyDeutsch.data.locale,
            updatedAt: policyDeutsch.data.updatedAt
        },
        {
            url: '/vacancy',
            locale: vacancyDeutsch.data.locale,
            updatedAt: vacancyDeutsch.data.updatedAt
        },
        ...campaignsPages
    ]

    const urlTags = pages.map(page => {
        return `
        <url>
            <loc>${baseURL}/${page.locale}${page.url}</loc>
            <lastmod>${page.updatedAt}</lastmod>
            <xhtml:link rel="alternate" hreflang="${page.locale === 'en' ? 'de' : 'en'}" href="${baseURL}/${page.locale === 'en' ? 'de' : 'en'}${page.url}" />
        </url>
        `
    })

    const sitemapContent = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
            ${urlTags.join('')}
        </urlset>
    `
    console.log(process.cwd(), "public", "sitemap.xml")
    const publicPath = path.join(process.cwd(), "public", "sitemap.xml")
    fs.writeFileSync(publicPath, sitemapContent);

}

generateSitemap()

