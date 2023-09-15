"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ISpace, useSpace } from "@flatfile/react";
import Link from "next/link";

const Space = ({
  callback,
  config,
}: {
  callback: () => void;
  config: ISpace;
}) => {
  const space = useSpace({
    ...config,
    closeSpace: {
      operation: "contacts:submit",
      onClose: () => callback(),
    },
  });
  return space;
};

export default function App({ config }: { config: ISpace }) {
  const [showSpace, setShowSpace] = useState(false);
  const [success, setSuccess] = useState(false);
  const credentials = !!config.publishableKey && !!config.environmentId;
  return (
    <div>
      {credentials ? (
        <>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowSpace(!showSpace);
              }}
            >
              {showSpace === true ? "Close" : "Open and create new"} space
            </button>
          </div>
          {showSpace && (
            <div id="flatfile_iFrameContainer">
              <Space
                callback={() => {
                  setShowSpace(false);
                  setSuccess(true);
                }}
                config={config}
              />
            </div>
          )}
        </>
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
          <span>
            Error! Please add your <pre>publishableKey</pre> and{" "}
            <pre>environmentId</pre>
          </span>
        </div>
      )}
      {success && (
        <div className="alert alert-success mt-6">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Great Success! Now you might want to try out reusing a space,{" "}
            <Link href="/reused-space">check out the next example here.</Link>
          </span>
        </div>
      )}
    </div>
  );
}
