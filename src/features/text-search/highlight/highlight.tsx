import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './highlight.module.scss';

export function Highlight({ active, className, text, }: HighlightProps) {

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect && active) {
      const visible = rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);
      if (!visible) ref.current?.scrollIntoView();
    }
  }, [active]);

  return (
    <mark
      className={classNames(styles.highlight, className, { [styles.active]: active })}
      ref={ref}
      role="mark"
    >
      {text}
    </mark>
  );
}

export interface HighlightProps {
  text: string;
  active: boolean;
  className?: string;
}