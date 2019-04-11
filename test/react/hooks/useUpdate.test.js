import React, { useEffect } from 'react';
import useUpdate from './../../../src/react_about/hooks/useUpdate';

const info = { name: 'huo' };
function Example() {
  const changeInfo = name => (info.name = name);
  useUpdate(changeInfo('ma'));

  //   useEffect(() => {
  //     changeInfo('ma');
  //     return function cleanup() {
  //       changeInfo('q');
  //     };
  //   });
}

describe('test useUpdate', () => {});
