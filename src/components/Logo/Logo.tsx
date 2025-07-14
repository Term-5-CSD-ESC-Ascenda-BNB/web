import React from 'react';
import { useRouter } from '@tanstack/react-router';

interface LogoProps {
  fontSize?: string | number;
  fontWeight?: number | string;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
}

export function Logo({
  className,
  fontSize = '2rem',
  fontWeight = 500,
  style = {},
  onClick,
}: LogoProps) {
  const router = useRouter();
  const handleClick = onClick || (() => router.navigate({ to: '/' }));
  return (
    <span
      style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize,
        fontWeight,
        ...style,
        cursor: 'pointer',
      }}
      onClick={handleClick}
      className={className}
    >
      Wayfare
    </span>
  );
}
