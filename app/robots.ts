import type { MetadataRoute } from 'next';
import { siteUrl, isPreview } from '@/lib/site-seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    ...(isPreview ? {} : { sitemap: `${siteUrl}/sitemap.xml` }),
  };
}
