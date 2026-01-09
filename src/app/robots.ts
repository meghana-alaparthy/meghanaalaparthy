import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/', // Optional: hide API routes if you want
        },
        sitemap: 'https://meghanaalaparthy.com/sitemap.xml',
    };
}
