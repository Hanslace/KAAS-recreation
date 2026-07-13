import { notFound } from "next/navigation";

import SettingsContentEditor from "./_components/SettingsContentEditor";

type SettingsContentPage = {
  slug: string;
  title: string;
  content: string[];
};

const pages: SettingsContentPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl.",
      "Proin nec leo viverra, sollicitudin felis in, luctus dui. Nullam erat nisl, tempor at est id, consequat fringilla velit.",
      "Aenean ullamcorper, turpis vel vehicula porta, ex lacus faucibus risus, non pellentesque tortor turpis vulputate nunc.",
    ],
  },
  {
    slug: "about-us",
    title: "About Us",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl.",
      "Proin nec leo viverra, sollicitudin felis in, luctus dui. Nullam erat nisl, tempor at est id, consequat fringilla velit.",
      "Aenean ullamcorper, turpis vel vehicula porta, ex lacus faucibus risus, non pellentesque tortor turpis vulputate nunc.",
    ],
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl.",
      "Proin nec leo viverra, sollicitudin felis in, luctus dui. Nullam erat nisl, tempor at est id, consequat fringilla velit.",
      "Aenean ullamcorper, turpis vel vehicula porta, ex lacus faucibus risus, non pellentesque tortor turpis vulputate nunc.",
    ],
  },
];

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function SettingsContentPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const page = pages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  const initialContent = page.content
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  return (
    <SettingsContentEditor
      slug={page.slug}
      title={page.title}
      initialContent={initialContent}
    />
  );
}