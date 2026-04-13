export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Harlow Realty',
    description:
      'Premium real estate services in Toronto and the Greater Toronto Area. Expert agents, luxury properties, and personalized service.',
    url: 'https://harlowrealty.ca',
    logo: 'https://harlowrealty.ca/icon.svg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    areaServed: 'Toronto & GTA',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
