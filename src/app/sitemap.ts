import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://meghanaalaparthy.com';

    // 1. Static Routes
    const routes = [
        '',
        '/about',
        '/resume',
        '/achievements',
        '/blog',
        '/boggle/game',
        '/boggle/solver',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Blog Routes
    const postsDirectory = path.join(process.cwd(), 'src/content/blog');
    const fileNames = fs.readdirSync(postsDirectory);

    const blogRoutes = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            return {
                url: `${baseUrl}/blog/${slug}`,
                lastModified: new Date(), // Ideally this comes from file mtime or frontmatter
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            };
        });

    return [...routes, ...blogRoutes];
}
