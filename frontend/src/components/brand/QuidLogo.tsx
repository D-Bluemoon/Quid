import Image from "next/image";

type QuidLogoProps = {
  className?: string;
  /** Logo image width in px */
  width?: number;
  /** Logo image height in px */
  height?: number;
};

/**
 * Logo on a dark brutalist plate so the white "uid" wordmark stays readable on light pages.
 */
export default function QuidLogo({
  className = "",
  width = 120,
  height = 40,
}: QuidLogoProps) {
  return (
    <div
      className={`inline-flex items-center justify-center brutal-border brutal-shadow bg-foreground px-3 py-2 ${className}`}
    >
      <Image
        src="/Quid Logo.png"
        alt="Quid"
        width={width}
        height={height}
        className="h-auto w-auto max-h-8 object-contain"
        priority
      />
    </div>
  );
}
