export function AirplaneIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tealGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1F9E94" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M21.5 15.5L14 12.5V5.5C14 4.4 13.1 3.5 12 3.5C10.9 3.5 10 4.4 10 5.5V12.5L2.5 15.5V17.5L10 15V19.5L8 21V22.5L12 21L16 22.5V21L14 19.5V15L21.5 17.5V15.5Z"
        fill="url(#tealGlow)"
        filter="url(#glow)"
      />
    </svg>
  );
}
