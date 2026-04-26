import { useEffect } from 'react';

const SUFFIX = ' · GPUTest 核芯';

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title.endsWith(SUFFIX) ? title : `${title}${SUFFIX}`;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      const prevDesc = meta.getAttribute('content');
      meta.setAttribute('content', description);
      return () => {
        document.title = prev;
        if (prevDesc) meta!.setAttribute('content', prevDesc);
      };
    }

    return () => {
      document.title = prev;
    };
  }, [title, description]);
}
