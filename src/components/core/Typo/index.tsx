import styles from "./styles.module.scss";

interface TypoProps {
  bold?: boolean;
  variant?: 'h1' | 'h2' | 'h3' | 'h5' | 'h6' | 't1' | 't2' | 't3' | 'caption' | 'footnote';
  color: string;
  style?: object;
  className?: string;
  children: React.ReactNode | string;
}

export default function Typo(props: TypoProps) {
  const { bold = false, variant = 'h2', color, style, className, children } = props;

  return (
    <div
      style={{
        fontWeight: bold ? 700 : 400,
        color: color,
        ...style
      }}
      className={className + ' ' + styles[variant]}>
      {children}
    </div>
  )
}