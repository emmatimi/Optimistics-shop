import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ 
  title, 
  description = "Premium natural oils for skincare and hair growth. Shop our collection of pure, cold-pressed oils.", 
  image = "https://ik.imagekit.io/4lndq5ke52/bg3-removebg-preview.png",
  url = window.location.href 
}) => {
  const siteTitle = "Optimistics Naturals";
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default MetaTags;