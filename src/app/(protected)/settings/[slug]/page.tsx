
import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';

type SettingsContentPage = {
  slug: string;
  title: string;
  content: string[];
};

const pages: SettingsContentPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl.',
      'Proin nec leo viverra, sollicitudin felis in, luctus dui. Nullam erat nisl, tempor at est id, consequat fringilla velit.',
      'Aenean ullamcorper, turpis vel vehicula porta, ex lacus faucibus risus, non pellentesque tortor turpis vulputate nunc.',
    ],
  },
  {
    slug: 'about-us',
    title: 'About Us',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl.',
      'Proin nec leo viverra, sollicitudin felis in, luctus dui. Nullam erat nisl, tempor at est id, consequat fringilla velit.',
      'Aenean ullamcorper, turpis vel vehicula porta, ex lacus faucibus risus, non pellentesque tortor turpis vulputate nunc.',
    ],
  },
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl.',
      'Proin nec leo viverra, sollicitudin felis in, luctus dui. Nullam erat nisl, tempor at est id, consequat fringilla velit.',
      'Aenean ullamcorper, turpis vel vehicula porta, ex lacus faucibus risus, non pellentesque tortor turpis vulputate nunc.',
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

export default async function SettingsContentPage({ params }: PageProps) {
  const { slug } = await params;

  const page = pages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        <BackButton href="/settings">{page.title}</BackButton>

        <button
          
          className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-500 transition hover:scale-105 hover:bg-green-200"
          aria-label={`Edit ${page.title}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M16.862 3.487a1.875 1.875 0 0 1 2.651 2.651l-.776.776-2.651-2.651.776-.776ZM14.76 5.589 4.5 15.849V18.5h2.651l10.26-10.26-2.651-2.651Z" />
          </svg>
        </button>
      </div>

      <div className="mt-7 max-h-[calc(100vh-13rem)] overflow-y-auto rounded-2xl bg-white px-6 py-7 shadow-[0_10px_25px_rgba(0,0,0,0.08)] sm:px-8">
        <div className="space-y-8 text-[1rem] leading-[1.9] text-black/45 sm:text-[1.1rem]">
          {page.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}