export interface MetadataConfig {
  title: string;
  shortTitle: string;
  /** Appended to the site title (homepage + link previews). */
  tagline: string;
  /** One-line pitch under the title — the page hero and the OG image share it. */
  subtitle: string;
  description: string;
  keywords: string[];
  /** Author shown in the metadata and the JSON-LD block. */
  author: {
    name: string;
    url: string;
  };
  repositoryUrl: string;
  colors: {
    background: string;
    theme: string;
  };
}

export interface AppConfig {
  urls: {
    /** Public origin of this app (canonical / OpenGraph / robots / sitemap). */
    appUrl: string;
  };
}
