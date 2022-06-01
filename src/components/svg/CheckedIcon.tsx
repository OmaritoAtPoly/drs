import * as React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function CheckedIcon({
  height = 70,
  width = 70,
  fill = "none",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 70"
      fill={fill}
      {...props}>
      <g filter="url(#filter0_ddd)">
        <rect
          x={27}
          y={27}
          width={18}
          height={18}
          rx={9}
          fill="url(#paint0_linear)"
        />
        <rect
          x={26.5}
          y={26.5}
          width={19}
          height={19}
          rx={9.5}
          stroke="url(#paint1_linear)"
          strokeOpacity={0.46}
        />
        <rect
          x={26.5}
          y={26.5}
          width={19}
          height={19}
          rx={9.5}
          stroke="url(#paint2_linear)"
        />
      </g>
      <path
        d="M39.4 34L35 38.4l-2-2"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_ddd"
          x={0}
          y={0}
          width={70}
          height={70}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={4} dy={4} />
          <feGaussianBlur stdDeviation={10} />
          <feColorMatrix values="0 0 0 0 0.434896 0 0 0 0 0.548322 0 0 0 0 0.690104 0 0 0 0.41 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={-6} dy={-6} />
          <feGaussianBlur stdDeviation={10} />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={2} dy={2} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0.446076 0 0 0 0 0.558333 0 0 0 0 0.67059 0 0 0 0.1 0" />
          <feBlend in2="effect2_dropShadow" result="effect3_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect3_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1={45}
          y1={36}
          x2={27}
          y2={36}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#50CAFF" />
          <stop offset={1} stopColor="#0478FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1={44.1667}
          y1={43.9412}
          x2={30.2275}
          y2={44.52}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#D6E3F3" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1={36}
          y1={27}
          x2={36}
          y2={45}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default CheckedIcon;
