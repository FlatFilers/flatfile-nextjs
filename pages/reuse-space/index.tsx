"use client";
import React from "react";
import ReuseSpace from "@/app/ReuseSpace";

export default function reuseSpace() {
  const SPACE_ID = process.env.NEXT_PUBLIC_FLATFILE_SPACE_ID;
  if (!SPACE_ID) {
    return <>No SPACE_ID Provided</>;
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
        <ReuseSpace spaceId={SPACE_ID} />
      </div>
    </div>
  );
}
