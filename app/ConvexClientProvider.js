"use client";

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import React from 'react'
import ClientSideProvider from './ClientSideProvider';

const ConvexClientProvider = ( { children } ) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <div>
      <ConvexProvider client={convex}>
        <ClientSideProvider>
      {children}
      </ClientSideProvider>
      </ConvexProvider>
    </div>
  )
}

export default ConvexClientProvider