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
    <div className={styles.main}>
      <NewSpaceApp />
      <ReusedSpaceApp />
    </div>
  );
}
