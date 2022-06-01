import * as React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function DuplicateIcon({
  width = 13,
  height = 8,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="prefix__Layer_1"
      data-name="Layer 1"
      viewBox="0 0 64 64"
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <style>
          {
            ".prefix__cls-1{fill:#9dcbf4}.prefix__cls-2{fill:none;stroke:#2a5082;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <path
        className="prefix__cls-1"
        d="M33.9 48.77v.08c.1.75-.9 1.09-1.65 1.15a118.36 118.36 0 01-16.58-.49v-7.78a4.09 4.09 0 00-.21-1.73c-.14-.31-.35-.59-.47-.91a3.28 3.28 0 01-.13-1.09L15 23.77l.07-7.1c0-2-.68-4.14 1.89-4.18l8.87-.13a1.59 1.59 0 01.79.12 1.11 1.11 0 01.38 1.35 3.92 3.92 0 01-.9 1.22c-4.1 4.44-5.15 11.53-3.8 17.29a25.54 25.54 0 003.77 8.55c2 3 5 4.8 7.47 7.32a1.36 1.36 0 01.36.56z"
      />
      <path
        className="prefix__cls-2"
        d="M15.13 31.51V12.13h21.89M15.13 31.39v18.15"
      />
      <path
        d="M39.64 20.7s.51-4.4-.44-4.4-3.3 4.4-1.54 9 11.16 2.06 9.4 0-7 .07-7 .07z"
        fill="#389ad6"
      />
      <path
        className="prefix__cls-1"
        d="M37.7 52.57v.08c.12.75-.91 1.09-1.67 1.13a118.35 118.35 0 01-16.58-.49v-7.78a4.09 4.09 0 00-.23-1.67c-.14-.31-.35-.59-.47-.91a3.28 3.28 0 01-.13-1.17l.13-14.2.07-7.1c0-2-.68-4.14 1.89-4.18l8.87-.13a1.59 1.59 0 01.79.12 1.11 1.11 0 01.38 1.35 3.92 3.92 0 01-.9 1.22c-4.1 4.44-5.15 11.53-3.8 17.29a25.54 25.54 0 003.77 8.55c2 3 5 4.8 7.47 7.32a1.37 1.37 0 01.41.57z"
      />
      <path
        className="prefix__cls-2"
        d="M18.93 35.31V15.93H40l8.81 8.81H40v-3.92"
      />
      <path
        className="prefix__cls-2"
        d="M18.94 35.2v18.15h29.32V38.92M48.26 27.72v3.35"
      />
      <circle cx={48.26} cy={34.13} r={0.88} fill="#2a5082" />
    </svg>
  );
}

export default DuplicateIcon;
