import { useEffect } from "react";

/**
 * SEO Component - Updates document head for better SEO
 * Works with React 19 without external dependencies
 *
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords (comma separated)
 * @param {string} props.canonicalUrl - Canonical URL for the page
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type (default: website)
 */
const SEO = ({
  title = "Veertri - Interactive Educational Entertainment Platform",
  description = "Experience the future of education with Veertri. Interactive learning platform combining entertainment and education for students of all ages.",
  keywords = "education, edutainment, learning, online courses",
  canonicalUrl,
  ogImage = "/og-image.jpg",
  ogType = "website",
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (selector, attribute, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        const [attr, value] = Object.entries(
          selector.includes("property=")
            ? { property: selector.match(/property="([^"]+)"/)[1] }
            : { name: selector.match(/name="([^"]+)"/)[1] }
        )[0];
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Update meta description
    updateMetaTag('meta[name="description"]', "content", description);

    // Update meta keywords
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', "content", keywords);
    }

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', "content", title);
    updateMetaTag('meta[property="og:description"]', "content", description);
    updateMetaTag('meta[property="og:type"]', "content", ogType);
    if (ogImage) {
      updateMetaTag('meta[property="og:image"]', "content", ogImage);
    }

    // Update Twitter tags
    updateMetaTag('meta[property="twitter:title"]', "content", title);
    updateMetaTag(
      'meta[property="twitter:description"]',
      "content",
      description
    );
    if (ogImage) {
      updateMetaTag('meta[property="twitter:image"]', "content", ogImage);
    }

    // Update canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalUrl);
    }

    // Cleanup function - optional, reset to defaults when unmounting
    return () => {
      // We don't reset on unmount as the next page will set its own values
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType]);

  // This component doesn't render anything
  return null;
};

export default SEO;
