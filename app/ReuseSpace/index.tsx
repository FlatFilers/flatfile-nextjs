'use client';
import { Space, useEvent, useFlatfile, usePlugin } from '@flatfile/react';
import React from 'react';
import { recordHook } from '@flatfile/plugin-record-hook';
import { jobHandler } from '@flatfile/plugin-job-handler';

export default function ReuseSpace({ spaceId }: { spaceId?: string }) {
  const { openPortal, open, closePortal } = useFlatfile();

  // Can be used for debugging
  // useEvent('**', (event) => {
  //   console.log('EVENT -> ', { event });
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
    async () => {
      // any logic related to the event needed for closing the event
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
          {open ? 'Close' : 'Open existing'} space
        </button>
      </div>
      <div id="flatfile_iFrameContainer">
        <Space
          id={spaceId}
          config={{
            metadata: {
              sidebarConfig: {
                showSidebar: true
              }
            }
          }}
        />
      </div>
    </div>
  );
}
