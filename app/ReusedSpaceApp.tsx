"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ISpace, useSpace } from "@flatfile/react";
import { listener } from "./listener";
import styles from "./page.module.css";
import { useEffect } from "react";

const spaceProps: ISpace = {
  environmentId: "us_env_sJYsPKZw",
  iframeStyles: {
    borderRadius: "12px",
    width: "100%",
    height: "750px",
    borderWidth: " 0px",
    background: "rgb(255, 255, 255)",
    padding: "16px",
  },
  listener: listener,
};

const Space = ({
  setShowSpace,
  accessToken,
}: {
  setShowSpace: Dispatch<SetStateAction<boolean>>;
  accessToken?: string;
}) => {
  if (!accessToken) {
    return;
  }

  const space = useSpace({
    ...spaceProps,
    space: {
      // PUT SPACE ID TO REUSE HERE
      id: "us_sp_123456",
      accessToken,
    },
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
      const spaceId = "us_sp_LSmdp7Jn";
      const response = await fetch(`api/spaces/${spaceId}`);

      const json = await response.json();
      setData(json);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <button
          onClick={() => {
            setShowSpace(!showSpace);
          }}
        >
          {showSpace === true ? "Close" : "Open"} space
        </button>
      </div>
      {showSpace && (
        <div className={styles.spaceWrapper}>
          <Space
            setShowSpace={setShowSpace}
            accessToken={data.space.data.accessToken}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
