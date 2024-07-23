'use client';
import { Flatfile } from '@flatfile/api';
import {
  Space,
  useEvent,
  useFlatfile,
  usePlugin,
  Workbook
} from '@flatfile/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { workbook } from '../workbooks/workbooks';
import { recordHook } from '@flatfile/plugin-record-hook';
import { jobHandler } from '@flatfile/plugin-job-handler';

export default function NewSpace({ config }: { config: Flatfile.SpaceConfig }) {
  const [success, setSuccess] = useState(false);
  const { openPortal, open, closePortal } = useFlatfile();

  // Can be used for debugging
  // useEvent("**", (event) => {
  //   console.log("EVENT -> ", { event });
  // });

  usePlugin(
    recordHook('contacts', (record) => {
      record.set('firstName', String(record.get('firstName')).toUpperCase());
    })
  );

  usePlugin(
    jobHandler('workbook:submitActionFg', async (event) => {
      // Make changes after cells in a Sheet have been updated
      console.log('Make changes here when an action is clicked', event.context);
      // const records = await api.records.get(event.context.sheetId);

      return {
        outcome: {
          acknowledge: true,
          message: 'This is now complete.',
          next: {
            type: 'wait'
          }
        }
      };
    })
  );

  useEvent(
    'job:outcome-acknowledged',
    {
      operation: 'submitActionFg',
      status: 'complete'
    },
    async (event) => {
      // any logic related to the event needed for closing the event
      console.log('Window Closed!');
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
            {open ? 'Close' : 'Start Import'}
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
            Success! Now you might want to try out reusing a space,{' '}
            <Link href="/reused-space">check out the next example here.</Link>
          </span>
        </div>
      )}
    </div>
  );
}
