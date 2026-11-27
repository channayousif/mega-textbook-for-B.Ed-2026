/**
 * Feature 034 T035 (#822; owner choice 2026-11-26: "tap to open full size"). On a phone a wide
 * schematic shrinks its labels to a few pixels. Below 760 px each wide figure gets a "View full
 * size" control that opens it in a full-screen viewer at its natural width, where the reader pans
 * by scrolling and can pinch to zoom. The inline figure is unchanged. Native <dialog>: Escape
 * closes it and focus returns to the control.
 */
import React, { useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Icon from '@site/src/components/icons/Icon';

const T = {
  open: { en: 'View full size', ur: 'پوری جسامت میں دیکھیں' },
  close: { en: 'Close', ur: 'بند کریں' },
} as const;

type Props = { src: string; darkSrc: string | null; alt: string; width?: number; height?: number };

export default function FigureZoom({ src, darkSrc, alt, width, height }: Props): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const dialog = useRef<HTMLDialogElement>(null);
  const img = useRef<HTMLImageElement>(null);

  const open = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (img.current) img.current.src = dark && darkSrc ? darkSrc : src;
    dialog.current?.showModal();
  };

  return (
    <>
      <button type="button" className="figure__zoom" onClick={open}>
        <Icon name="search" size={16} accent={false} /> {T.open[locale]}
      </button>
      <dialog ref={dialog} className="figure-zoom" aria-label={alt} onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}>
        <form method="dialog" className="figure-zoom__bar">
          <button type="submit" className="figure-zoom__close" aria-label={T.close[locale]}>
            <Icon name="close" size={22} accent={false} />
          </button>
        </form>
        <div className="figure-zoom__frame">
          <img ref={img} alt={alt} width={width} height={height} style={width ? { width: `${Math.max(width, 720)}px` } : { width: '200vw' }} />
        </div>
      </dialog>
    </>
  );
}
