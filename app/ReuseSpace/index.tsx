"use client";
import {
  FlatfileContext,
  Space,
  useEvent,
  useFlatfile,
  usePlugin,
} from "@flatfile/react";
import React, { useContext, useEffect } from "react";
import api from "@flatfile/api";
import { recordHook } from "@flatfile/plugin-record-hook";

export default function ReuseSpace({ spaceId }: { spaceId?: string }) {
  const { openPortal, open, closePortal } = useFlatfile();
  const context = useContext(FlatfileContext);
  useEffect(() => {
    console.log({ context });
  }, [context]);
  // Can be used for debugging
  useEvent("**", (event) => {
    console.log("EVENT -> ", { event });
  });

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
    }
  );
  return (
    <div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            open ? closePortal() : openPortal();
          }}
        >
          {open ? "Close" : "Open existing"} space
        </button>
      </div>
      <div id="flatfile_iFrameContainer">
        <Space
          id={spaceId}
          config={{
            metadata: {
              sidebarConfig: {
                showSidebar: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
