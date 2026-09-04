export function BrandLogo({ className = '' }: { className?: string }) {
  return <span className={`fhp-logo ${className}`}><img src="/fhp-logo-blue.svg" alt="FHP Studio" width={299} height={307} /></span>;
}
