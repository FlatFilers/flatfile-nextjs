import { ISpace, makeTheme } from "@flatfile/react";
import React from "react";
import NewSpaceApp from "@/app/NewSpace";
import { listener } from "@/app/listeners/listeners";
import { workbook } from "@/app/workbooks/workbooks";

export default function newSpace() {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_FLATFILE_PUBLISHABLE_KEY;
  if (!PUBLISHABLE_KEY) return <>No Publishable Key Available</>;

  const spaceProps: ISpace = {
    name: "Embedded Space",
    // to test locally add your publishableKey here, for example: pk_12345,
    publishableKey: PUBLISHABLE_KEY,
    workbook,
    listener,
    themeConfig: makeTheme({ primaryColor: "#546a76", textColor: "#fff" }),
    sidebarConfig: {
      showDataChecklist: false,
      showSidebar: false,
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
        <NewSpaceApp config={spaceProps} />
      </div>
    </div>
  );
}
