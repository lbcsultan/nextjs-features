export type FeatureSection = {
  title: string;
  content: string;
  code?: {
    filename: string;
    language: string;
    snippet: string;
  };
  tips?: string[];
};

export type FeatureContent = {
  slug: string;
  title: string;
  description: string;
  sections: FeatureSection[];
  relatedLinks?: { label: string; href: string }[];
};

export type NavItem = {
  slug: string;
  title: string;
};

export type NavCategory = {
  title: string;
  items: NavItem[];
};
