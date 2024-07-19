import { useEffect } from 'react';

const useUnload = (callback) => {
  useEffect(() => {
    const handleUnload = (event) => {
      callback();
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [callback]);
};

export default useUnload;
