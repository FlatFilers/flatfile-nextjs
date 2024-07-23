'use client';
import React, { useEffect, useState } from 'react';
import ReuseSpace from '@/app/ReuseSpace';
import dynamic from 'next/dynamic';

const DynamicFlatfileProvider = dynamic(
  () => import('@/app/FlatfileClientProvider'),
  { ssr: false }
);

export default function ReusedSpace() {
  const SPACE_ID = process.env.NEXT_PUBLIC_TEST_REUSE_SPACE_ID;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ spaceId: string; accessToken: string }>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async (spaceId: string) => {
      const response = await fetch(`/api/spaces/${spaceId}`);
      const json = await response.json();
      if (json.error) {
        setError(json.error);
        setLoading(false);
        return;
      }
      const spaceInfo = {
        spaceId,
        accessToken: json.space.data.accessToken
      };
      setData(spaceInfo);
      setLoading(false);
    };

    if (!SPACE_ID) {
      setLoading(false);
      return;
    } else {
      fetchData(SPACE_ID).catch((err) => {
        setLoading(false);
        setError(err);
      });
    }
  }, [SPACE_ID]);

  if (loading) {
    return (
      <button className="btn">
        <span className="loading loading-spinner"></span>
        loading
      </button>
    );
  }

  if (!SPACE_ID || error) {
    return (
      <div className="container px-20 pt-20">
        <h2 className="text-2xl font-bold mb-4">Reuse an existing Space</h2>
        <div className="alert alert-error mt-10">
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
          <span className="flex-col">
            {!SPACE_ID && (
              <span>
                For the purposes of this demo, find a space id from your{' '}
                <a
                  href={
                    'https://platform.flatfile.com/dashboard/apps/portal/list/recent/'
                  }
                  target="_blank"
                >
                  Flatfile Dashboard
                </a>{' '}
                and set <code>NEXT_PUBLIC_TEST_REUSE_SPACE_ID</code> in your{' '}
                <code>.env</code> file to the correct value.
              </span>
            )}
            {error && (
              <span>
                {error} <br /> Make sure to set the <pre>FLATFILE_API_KEY</pre>{' '}
                in your <pre>.env</pre> file. <br />
                You can find that in your{' '}
                <a
                  href={
                    'https://platform.flatfile.com/dashboard/keys-and-secrets'
                  }
                  target="_blank"
                >
                  Flatfile Dashboard
                </a>
                .
              </span>
            )}
          </span>
        </div>
      </div>
    );
  }

  return data?.accessToken ? (
    <div className="container px-20 pt-20">
      <h2 className="text-2xl font-bold mb-4">Reuse an existing Space</h2>
      <p>
        Reuse a Space when users might need to wait or can’t finish in one go.
        It’s great for keeping work context and letting users continue where
        they left off until the task is done.
      </p>
      <div className="py-10">
        <DynamicFlatfileProvider
          accessToken={data?.accessToken}
          config={{ preload: false, spaceUrl: 'https://spaces.flatfile.com' }}
        >
          <ReuseSpace spaceId={SPACE_ID} />
        </DynamicFlatfileProvider>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
