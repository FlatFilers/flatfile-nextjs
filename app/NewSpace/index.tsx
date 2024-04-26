"use client";
import api, { Flatfile } from "@flatfile/api";
import {
  Space,
  Workbook,
  useEvent,
  useFlatfile,
  usePlugin,
} from "@flatfile/react";
import Link from "next/link";
import React, { useState } from "react";
import { workbook } from "../workbooks/workbooks";
import { recordHook } from "@flatfile/plugin-record-hook";

export default function NewSpace({ config }: { config: Flatfile.SpaceConfig }) {
  const [success, setSuccess] = useState(false);
  const { openPortal, open, closePortal } = useFlatfile();

  // Can be used for debugging
  // useEvent("**", (event) => {
  //   console.log("EVENT -> ", { event });
  // });

  usePlugin(
    recordHook("contacts", (record) => {
      const firstName = record.get("firstName");
      console.log({ firstName });
      record.set("lastName", "Rock");
      return record;
    })
  );

  useEvent(
    "job:ready",
    { job: "workbook:submitActionFg" },
    async ({ context: { jobId } }) => {
      try {
        await api.jobs.ack(jobId, {
          info: "Getting started.",
          progress: 10,
        });

        // Make changes after cells in a Sheet have been updated
        console.log("Make changes here when an action is clicked");

        await api.jobs.complete(jobId, {
          outcome: {
            acknowledge: true,
            message: "This is now complete.",
            next: {
              type: "wait",
            },
          },
        });
      } catch (error: any) {
        console.error("Error:", error.stack);

        await api.jobs.fail(jobId, {
          outcome: {
            message: "This job encountered an error.",
          },
        });
      }
    }
  );

  useEvent(
    "job:outcome-acknowledged",
    {
      operation: "submitActionFg",
      status: "complete",
    },
    async (event) => {
      // any logic related to the event needed for closing the event
      console.log("Window Closed!");
      // close the portal iFrame window
      closePortal();
      setSuccess(true);
    }
  );

  return (
    <div>
      <>
        <div>
          <button className="btn btn-primary" onClick={openPortal}>
            {open === true ? "Close" : "Open and create new"} space
          </button>
        </div>
        <div id="flatfile_iFrameContainer">
          <Space config={config}>
            <Workbook config={workbook} />
          </Space>
        </div>
      </>

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
