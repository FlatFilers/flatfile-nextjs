"use client";
import React, { useEffect, useState } from "react";
import ReuseSpace from "@/app/ReuseSpace";
import { FlatfileProvider } from "@flatfile/react";

export default function reuseSpace() {
  const SPACE_ID = process.env.NEXT_PUBLIC_FLATFILE_SPACE_ID;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();

  if (!SPACE_ID) {
    return <>No SPACE_ID Provided</>;
  }

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
        accessToken: json.space.data.accessToken,
      };
      console.log({ spaceInfo });
      setData(spaceInfo);
      setLoading(false);
    };

    if (!SPACE_ID) {
      setLoading(false);
      return;
    }

    fetchData(SPACE_ID).catch((err) => {
      setLoading(false);
      setError(err);
    });
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
        <span className="flex-col">
          {!SPACE_ID && (
            <span>
              Please add a <pre>spaceId</pre>
            </span>
          )}
          {error && (
            <span>
              {error} Make sure to set the <pre>FLATFILE_API_KEY</pre> in your{" "}
              <pre>.env</pre> file. <br />
              You can find that in your Flatfile Dashboard under Developer
              Settings.
            </span>
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="container px-20 pt-20">
      <h2 className="text-2xl font-bold mb-4">Reuse an existing Space</h2>
      <p>
        Reuse a Space when users might need to wait or can’t finish in one go.
        It’s great for keeping work context and letting users continue where
        they left off until the task is done.
      </p>
      <div className="py-10">
        <FlatfileProvider
          accessToken={data?.accessToken}
          config={{ preload: false }}
        >
          <ReuseSpace spaceId={SPACE_ID} />
        </FlatfileProvider>
      </div>
    </div>
  );
}
