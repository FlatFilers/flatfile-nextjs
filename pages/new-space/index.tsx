import { ISpace, makeTheme, FlatfileProvider, Space } from "@flatfile/react";
import React from "react";
import NewSpaceApp from "@/app/NewSpace";
import { listener } from "@/app/listeners/listeners";
import { workbook } from "@/app/workbooks/workbooks";
import { Flatfile } from "@flatfile/api";

export default function newSpace() {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_FLATFILE_PUBLISHABLE_KEY;
  if (!PUBLISHABLE_KEY)
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
        <span>
          Error! Please add your <pre>publishableKey</pre> and{" "}
          <pre>environmentId</pre>
        </span>
      </div>
    );

  const spaceProps: Flatfile.SpaceConfig = {
    name: "Embedded Space",
    metadata: {
      theme: makeTheme({ primaryColor: "#546a76", textColor: "#fff" }),
      sidebarConfig: {
        showDataChecklist: false,
        showSidebar: false,
      },
    },
  };
  return (
    <div className="container px-20 pt-20">
      <h2 className="text-2xl font-bold mb-4">
        Embed a new Space every time Flatfile is opened
      </h2>
      <p>
        Reuse a Space when users might need to wait or can’t finish in one go.
        It’s great for keeping work context and letting users continue where
        they left off until the task is done.
      </p>
      <div className="py-10">
        <FlatfileProvider publishableKey={PUBLISHABLE_KEY}>
          <NewSpaceApp config={spaceProps} />
        </FlatfileProvider>
      </div>
    </div>
  );
}
