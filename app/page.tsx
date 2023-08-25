"use client";
import React from "react";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const ReusedSpaceApp = dynamic(() => import("./ReusedSpaceApp"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.main}>
      <ReusedSpaceApp />
    </div>
  );
}
