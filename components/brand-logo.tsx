export function BrandLogo({ className = '' }: { className?: string }) {
  return <span className={`fhp-logo ${className}`}><img src="/fhp-logo.jpg" alt="FHP Studio" width={1080} height={1080} /></span>;
}
