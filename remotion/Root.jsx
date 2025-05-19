import React from 'react';
import {Composition} from 'remotion';
import { MyComposition } from './Composition';

 
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};