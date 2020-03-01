import React from 'react';

import { EmscriptenView } from 'components/EmscriptenView';

const { Towers } = require('../emscripten/towers');

export const TowersView = ({ ...props }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <EmscriptenView
      moduleClass={Towers}
      fileMappings={{
        'towers.js.mem':
          'https://s3.amazonaws.com/sspilsbury-com-images/emscripten/fmv-emscripten-wrapper.js.mem',
      }}
      onRuntimeInitialized={moduleInstance => {
        // eslint-disable-next-line
        moduleInstance._run_towers(
          // Sadly, we won't ever be able to support any
          // other values - the original code did not
          // include a resize function and is now long-gone
          1056,
          640,
        );
      }}
      {...props}
    />
  </div>
);
