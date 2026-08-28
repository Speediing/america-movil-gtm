import { AMERICA_MOVIL_BRAND } from "@/data/brand";

export function BrandLockup({
  size = "md",
  invert = false,
}: {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  return (
    <div
      className={`brand-lockup brand-lockup-${size}${invert ? " is-invert" : ""}`}
      aria-label="América Móvil x SpaceXAI"
      data-brand-source={AMERICA_MOVIL_BRAND.pressRoom}
      data-logo-source={AMERICA_MOVIL_BRAND.officialLogo}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={AMERICA_MOVIL_BRAND.officialLogo}
        alt={AMERICA_MOVIL_BRAND.name}
        className="brand-customer"
      />
      <span className="brand-times" aria-hidden>
        ×
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/spacexai.svg" alt="SpaceXAI" className="brand-sxai" />
    </div>
  );
}
