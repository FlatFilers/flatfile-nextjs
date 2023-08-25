'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { ISpace, makeTheme, useSpace } from '@flatfile/react'
import { config } from './config'
import { listener } from './listener'
import styles from './page.module.css'

const spaceProps: ISpace = {
  name: 'Embedded Space',
  // to test locally add your local vars here
  publishableKey: 'pk_123456',
  environmentId: 'us_env_123456',
  workbook: config,
  themeConfig: makeTheme({ primaryColor: '#546a76', textColor: '#fff' }),
  sidebarConfig: {
    showDataChecklist: false,
    showSidebar: false,
  },
  listener: listener,
}

const Space = ({
  setShowSpace,
}: {
  setShowSpace: Dispatch<SetStateAction<boolean>>
}) => {
  const space = useSpace({
    ...spaceProps,
    closeSpace: {
      operation: 'contacts:submit',
      onClose: () => setShowSpace(false),
    },
  })
  return space
}

export default function App() {
  const [showSpace, setShowSpace] = useState(false)

  return (
    <div className={styles.description}>
      <p
        onClick={() => {
          setShowSpace(!showSpace)
        }}
      >
        {showSpace === true ? 'Close' : 'Open'} space
      </p>
      {showSpace && <Space setShowSpace={setShowSpace} />}
    </div>
  )
}
