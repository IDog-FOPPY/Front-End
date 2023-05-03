"use client";

import { useDevice } from "src/logics/hooks/useDevice";

// TODO ::: 의논 및 수정 필요
const DesktopMapping = {
  'h1': { fontSize: '80px', linHeight: '96px' },
  'h2': { fontSize: '50px', linHeight: '70px' },
  'h3': { fontSize: '40px', linHeight: '50px' },
  'h4': { fontSize: '36px', linHeight: '60px' },
  'h5': { fontSize: '34px', linHeight: '50px' },
  'h6': { fontSize: '32px', linHeight: '50px' },
  't1': { fontSize: '26px', linHeight: '40px' },
  't2': { fontSize: '24px', linHeight: '34px' },
  't3': { fontSize: '22px', linHeight: '32px' },
  'caption': { fontSize: '20px', linHeight: '24px' },
  'footnote': { fontSize: '14px', linHeight: '16px' },
  // 'footnote' : '14px',
}

const MobileMapping = {
  'h1': { fontSize: '40px', linHeight: '48px' },
  'h2': { fontSize: '30px', linHeight: '42px' },
  'h3': { fontSize: '26px', linHeight: '36px' },
  'h4': { fontSize: '24px', linHeight: '34px' },
  'h5': { fontSize: '22px', linHeight: '32p' },
  'h6': { fontSize: '20px', linHeight: '32px' },
  't1': { fontSize: '18px', linHeight: '28px' },
  't2': { fontSize: '16px', linHeight: '26px' },
  't3': { fontSize: '14px', linHeight: '22px' },
  'caption': { fontSize: '8px', linHeight: '10px' },
  'footnote': { fontSize: '6px', linHeight: '10px' },
  // 'footnote' : '6px',
}

interface TypoProps {
  bold?: boolean;
  variant: 'h1' | 'h2' | 'h3' | 'h5' | 'h6' | 't1' | 't2' | 't3' | 'caption' | 'footnote';
  color: string;
  style?: object;
  className?: string;
  children: React.ReactElement | string;
}

export default function Typo(props: TypoProps) {
  const { bold = false, variant = 'h2', color, style, className, children } = props;
  const device = useDevice();

  const renderFontSize = () => {
    if (device === 'mobile') return MobileMapping[variant];
    else return DesktopMapping[variant];
  }

  return (
    <div
      style={{
        fontWeight: bold ? 700 : 400,
        fontSize: renderFontSize().fontSize,
        lineHeight: renderFontSize().linHeight,
        color: color,
        ...style
      }}
      className={className}>
      {children}
    </div>
  )
}