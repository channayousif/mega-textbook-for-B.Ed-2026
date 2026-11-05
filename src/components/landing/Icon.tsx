import React from 'react';

/** Hand-drawn icons on one 24px grid. Decorative: the text beside them carries the meaning. */
const PATHS: Record<string, React.ReactNode> = {
  lang: <><path d="M4 5h9M8.500 3v2M11 5c-1 4-3.500 7-7 8.500M6 9c1.200 2 3 3.500 5 4.500" /><path d="M13 21l4-9 4 9M14.500 18h5" /></>,
  cycle: <path d="M4 12a8 8 0 0 1 13.700-5.600L20 8.500M20 4v4.500h-4.500M20 12a8 8 0 0 1-13.700 5.600L4 15.500M4 20v-4.500h4.500" />,
  fig: <><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="1.800" /><path d="M4 17l5-4 3.500 2.800L16 12l4 4" /></>,
  phone: <><rect x="7" y="2.500" width="10" height="19" rx="2.500" /><path d="M11 18.500h2" /></>,
  book: <path d="M12 6.500C10 5 7 4.500 3.500 5v14c3.500-.5 6.500 0 8.500 1.500 2-1.500 5-2 8.500-1.500V5C17 4.500 14 5 12 6.500zM12 6.500v14" />,
  class: <><circle cx="9" cy="8" r="3.200" /><path d="M3 20c.5-3.500 3-5.500 6-5.500s5.500 2 6 5.500M16 5.200a3 3 0 0 1 0 5.700M17.500 14.800c2 .6 3.300 2.400 3.500 5.200" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.500l4.500 4.500L19 7.500" />,
  grad: <path d="M2.500 9.500L12 5l9.500 4.500L12 14zM6.500 11.500V16c3 2.500 8 2.500 11 0v-4.500" />,
  pen: <path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3" />,
  build: <path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6M2.500 20h19" />,
  star: <path d="M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.900L12 16.900l-5.200 2.800 1-5.900-4.300-4.100 5.900-.8z" />,
  chev: <path d="M6 9l6 6 6-6" />,
};

export default function Icon({ name, className }: { name: string; className?: string }): React.ReactElement {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
