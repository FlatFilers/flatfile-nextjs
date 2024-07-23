'use client';

import { FlatfileProvider } from '@flatfile/react';

const FlatfileClientProvider: typeof FlatfileProvider = (props) => {
  return <FlatfileProvider {...props}>{props.children}</FlatfileProvider>;
};

export default FlatfileClientProvider;
