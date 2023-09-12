"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ISpace, useSpace } from "@flatfile/react";
import styles from "./page.module.css";
import { useEffect } from "react";

const spaceId = "us_sp_d8xf8bk0";

const Space = ({
  setShowSpace,
  accessToken,
}: {
  setShowSpace: Dispatch<SetStateAction<boolean>>;
  accessToken?: string;
}) => {
  if (!accessToken) {
    return <div>No access token provided.</div>; // Return a message or an empty div
  }

  const spaceProps: ISpace = {
    environmentId: "us_env_Eqdlko0r",
    space: {
      // PUT SPACE ID TO REUSE HERE
      id: spaceId,
      accessToken,
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

function Home() {
  const [showSpace, setShowSpace] = useState(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`api/spaces/${spaceId}`);
      const json = await response.json();
      setData(json);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <div className={styles.description}>
        <button
          onClick={() => {
            setShowSpace(!showSpace);
          }}
        >
          {showSpace === true ? "Close" : "Open existing"} space
        </button>
      </div>
      {showSpace && (
        <div className={styles.spaceWrapper}>
          {data?.space?.data?.accessToken ? (
            <Space
              setShowSpace={setShowSpace}
              accessToken={data.space.data.accessToken}
            />
          ) : (
            <div>No access token available.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
