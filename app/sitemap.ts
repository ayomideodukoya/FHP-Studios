import type { MetadataRoute } from 'next';
import { siteUrl, isPreview } from '@/lib/site-seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return isPreview ? [] : [{ url: `${siteUrl}/` }];
}
