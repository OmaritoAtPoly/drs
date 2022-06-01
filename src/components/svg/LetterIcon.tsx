import * as React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function LetterIcon({
  width = 20,
  height = 14,
  fill = "#fff",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 14"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.875 0C.839 0 0 .84 0 1.875v10.25C0 13.161.84 14 1.875 14h16.25C19.16 14 20 13.16 20 12.125V1.875C20 .839 19.16 0 18.125 0H1.875zm15.117 4.37a.312.312 0 01.443.075l.354.516a.313.313 0 01-.072.428c-.893.66-2.166 1.59-4.113 3.003-.12.088-.255.192-.402.305-.82.635-2.019 1.561-3.202 1.553-1.184.008-2.382-.919-3.202-1.553-.147-.113-.282-.218-.402-.305a656.163 656.163 0 01-4.113-3.003.312.312 0 01-.072-.428l.354-.516c.1-.146.3-.18.443-.074.893.659 2.167 1.59 4.124 3.01.111.081.24.18.382.29C8.217 8.217 9.246 9.012 10 9c.754.011 1.783-.785 2.486-1.329.143-.11.271-.209.382-.29a646.86 646.86 0 004.124-3.01z"
        fill={fill}
      />
    </svg>
  );
}

export default LetterIcon;
