"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ISpace, useSpace } from "@flatfile/react";
import { useEffect } from "react";

const Space = ({
  setShowSpace,
  config,
}: {
  setShowSpace: Dispatch<SetStateAction<boolean>>;
  config: {
    spaceId: string;
    environmentId: string;
    accessToken: string;
  };
}) => {
  const spaceProps: ISpace = {
    environmentId: config.environmentId,
    space: {
      id: config.spaceId,
      accessToken: config.accessToken,
    },
  };
  const space = useSpace({
    ...spaceProps,
    closeSpace: {
      operation: "contacts:submit",
      onClose: () => setShowSpace(false),
    },
  });
  return space;
};

function App({
  spaceId,
  environmentId,
}: {
  spaceId?: string;
  environmentId?: string;
}) {
  const [showSpace, setShowSpace] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();

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
        environmentId,
      };

      setData(spaceInfo);
      setLoading(false);
    };

    if (!spaceId || !environmentId) {
      setLoading(false);
      return;
    }

    fetchData(spaceId).catch((err) => {
      setLoading(false);
      setError(err);
    });
  }, [spaceId, environmentId]);

  if (loading) {
    return (
      <button className="btn">
        <span className="loading loading-spinner"></span>
        loading
      </button>
    );
  }
  if (!spaceId || !environmentId || error) {
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
          {(!spaceId || !environmentId) && (
            <span>
              Please add a <pre>spaceId</pre> and <pre>environmentId</pre>
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
    <div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowSpace(!showSpace);
          }}
        >
          {showSpace === true ? "Close" : "Open existing"} space
        </button>
      </div>
      {showSpace && (
        <div id="flatfile_iFrameContainer">
          {data?.accessToken ? (
            <Space setShowSpace={setShowSpace} config={data} />
          ) : (
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
              <span>No access token available.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
