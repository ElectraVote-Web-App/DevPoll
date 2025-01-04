import { useMemo } from 'react';

const useTruncateTitle = (title, maxLength = 10) => {
  return useMemo(() => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...';
    }
    return title;
  }, [title, maxLength]);
};

export default useTruncateTitle;