import React from 'react';
import { useRouter } from '@tanstack/react-router';

interface LogoProps {
  fontSize?: string | number;
  fontWeight?: number | string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Logo({ fontSize = '2rem', fontWeight = 500, style = {}, onClick }: LogoProps) {
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
    >
      Wayfare
    </span>
  );
}
