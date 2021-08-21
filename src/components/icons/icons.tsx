import React, { SVGAttributes } from 'react';
import classNames from 'classnames';
import styles from './icon.module.scss';


export function CloseIcon(props: IconProps) {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </Icon>
  )
}

export function ExpandMoreIcon(props: IconProps) {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
    </Icon>
  )
}

export function ExpandLessIcon(props: IconProps) {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
    </Icon>
  )
}

function Icon({ className, size, ...props }: IconProps) {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      className={classNames(styles.icon, className)}
      {...props}
    />
  );
}

interface IconProps extends SVGAttributes<SVGSVGElement> {
  size: 16 | 20 | 24 | 32 | 40 | 48;
}
