// TODO ::: 의논 및 수정 필요
const VariantMapping = {
  'h1' : '32px',
  'h2' : '24px',
  'h3' : '19px',
  'h5' : '13px',
  'h6' : '11px',
  // t1 : 
  // t2 :
  // caption : 
}
interface TypoProps {
  bold?: boolean;
  variant: 'h1' | 'h2' | 'h3' | 'h5' | 'h6'; 
  color: string;
  style?: object;
  className?: string;
  children: React.ReactElement | string;
}

export default function Typo (props : TypoProps) {
  const { bold=false, variant='h2', color, style, className, children } = props;
  return (
    <div 
    style={{
      fontWeight: bold ? 700 : 400, 
      fontSize: VariantMapping[variant], 
      color: color, 
      ...style
    }} 
    className={className}>
      {children}
    </div>
  )
}