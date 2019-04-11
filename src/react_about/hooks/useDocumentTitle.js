import { useState, useEffect } from 'react';

function useDocumentTitle(title) {
  if (!document) return '';
  const [originalTitle, setOriginalTitle] = useState(document.title);
  useEffect(() => {
    setOriginalTitle(document.title);
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

export default useDocumentTitle;
