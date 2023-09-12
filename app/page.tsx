"use client";
import React from "react";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import NewSpaceApp from "./NewSpaceApp";

const ReusedSpaceApp = dynamic(() => import("./ReusedSpaceApp"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>
          <code>&lt;Flatfile /&gt;</code>
        </h2>
        <p>Embed Flatfile in just a few lines of code.</p>
        <NewSpaceApp />
        <ReusedSpaceApp />
      </div>
    </div>
  );
}
