// One canonical website prevents the old Sites preview competing with production.
export const siteUrl = 'https://fhpstudios.vercel.app';
export const siteTitle = 'Creative Studio & Event Space in Ogba, Lagos | FHP Studios';
export const siteDescription = 'Book a creative studio for photo shoots, a hot desk for focused work, or an intimate event space in Ogba, Lagos. Ask FHP Studios about rates and availability.';
export const isPreview = process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'development';

export const businessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#business`,
      name: 'FHP Studios',
      url: siteUrl,
      description: siteDescription,
      logo: `${siteUrl}/fhp-logo-blue.svg`,
      image: ['event-space', 'workspace', 'studio-setup'].map(name => `${siteUrl}/images/fhp-ogba-${name}.webp`),
      email: 'thefhpstudios@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot 32, Oba Ogunji Road, Ogba',
        addressLocality: 'Lagos',
        addressRegion: 'Lagos',
        addressCountry: 'NG',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00', closes: '19:00',
      },
      sameAs: ['https://www.instagram.com/thefhpstudios/'],
    },
    {
      '@type': 'WebSite', '@id': `${siteUrl}/#website`,
      url: siteUrl, name: 'FHP Studios', inLanguage: 'en-NG',
      publisher: { '@id': `${siteUrl}/#business` },
    },
    ...[
      ['studio-hire', 'Creative studio hire', 'A studio setup for portraits, photo shoots, campaigns, interviews and content creation.'],
      ['hot-desks', 'Hot desk workspace', 'Bookable workspace for solo workdays and small-team sessions.'],
      ['event-space', 'Meeting and intimate event space', 'Space for workshops, talks, launches, meetings and intimate gatherings.'],
    ].map(([id, name, description]) => ({
      '@type': 'Service', '@id': `${siteUrl}/#${id}`,
      name, description, url: `${siteUrl}/#${id}`,
      provider: { '@id': `${siteUrl}/#business` },
      areaServed: { '@type': 'City', name: 'Lagos' },
    })),
  ],
};
