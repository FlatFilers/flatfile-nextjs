import { makeTheme } from '@flatfile/react';
import React from 'react';
import { Flatfile } from '@flatfile/api';
import dynamic from 'next/dynamic';
import NewSpaceApp from '@/app/NewSpace';

const DynamicFlatfileProvider = dynamic(
  () => import('@/app/FlatfileClientProvider'),
  { ssr: false }
);

export default function NewSpace() {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_FLATFILE_PUBLISHABLE_KEY;
  if (!PUBLISHABLE_KEY)
    return (
      <div className="container px-20 pt-20">
        <h2 className="text-2xl font-bold mb-4">
          Initialize a fresh import each time
        </h2>
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Error! Please add your <pre>publishableKey</pre> and{' '}
            <pre>environmentId</pre>
          </span>
        </div>
      </div>
    );

  const spaceProps: Flatfile.SpaceConfig = {
    name: 'Embedded Space',
    namespace: 'portal',
    metadata: {
      theme: makeTheme({ primaryColor: '#546a76', textColor: '#fff' }),
      sidebarConfig: {
        showDataChecklist: false,
        showSidebar: false
      }
    }
  };
  return (
    <div className="container px-20 pt-20">
      <h2 className="text-2xl font-bold mb-4">
        Initialize a fresh import each time
      </h2>
      <div className="py-10">
        <DynamicFlatfileProvider
          publishableKey={PUBLISHABLE_KEY}
          config={{ spaceUrl: 'https://spaces.flatfile.com' }}
        >
          <NewSpaceApp config={spaceProps} />
        </DynamicFlatfileProvider>
      </div>
    </div>
  );
}
