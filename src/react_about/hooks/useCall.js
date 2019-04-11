import { useEffect } from 'react';

function useCall(callback, deps) {
  useEffect(() => {
    callback();
  }, deps);
}

export default useCall;
