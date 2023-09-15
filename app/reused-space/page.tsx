"use client";
import React from "react";
import ReusedSpaceApp from "./ReusedSpaceApp";

export default function Home() {
  return (
    <div className="container px-20 pt-20">
      <h2 className="text-2xl font-bold mb-4">Reuse an existing Space</h2>
      <p>
        Reuse a Space when users might need to wait or can’t finish in one go.
        It’s great for keeping work context and letting users continue where
        they left off until the task is done.
      </p>
      <div className="py-10">
        <ReusedSpaceApp spaceId={""} environmentId={""} />
      </div>
    </div>
  );
}
