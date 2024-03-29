import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function WalletIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 59 42"
      fill={fill}
      {...props}>
      <rect
        x={1.22474}
        y={14.4245}
        width={51}
        height={25}
        rx={3}
        transform="rotate(-15 1.225 14.425)"
        fill="#5E17EB"
        stroke="#fff"
        strokeWidth={2}
      />
      <path d="M2.7 21.66L52.928 8.202" stroke="#fff" strokeWidth={5} />
      <rect
        x={1.64941}
        y={15.0021}
        width={51}
        height={25}
        rx={3}
        fill="#5E17EB"
        stroke="#fff"
        strokeWidth={2}
      />
      <path
        d="M32.453 30.31c0 .972-.336 1.794-1.008 2.466-.66.66-1.553 1.086-2.681 1.278v1.026c0 .324-.102.582-.306.774-.192.204-.45.306-.774.306-.313 0-.57-.102-.774-.306-.204-.192-.306-.45-.306-.774v-.972a8.111 8.111 0 01-1.927-.414 6.427 6.427 0 01-1.62-.828 1.199 1.199 0 01-.413-.396 1.37 1.37 0 01-.108-.576c0-.3.09-.564.27-.792.191-.228.407-.342.647-.342.229 0 .51.096.846.288a7.763 7.763 0 001.567.72 5.672 5.672 0 001.566.216c.72 0 1.271-.132 1.655-.396.384-.276.576-.66.576-1.152 0-.3-.114-.546-.341-.738a2.293 2.293 0 00-.81-.45 29.207 29.207 0 00-1.404-.414c-.889-.228-1.62-.456-2.197-.684a3.767 3.767 0 01-1.494-1.08c-.408-.492-.612-1.152-.612-1.98 0-.972.343-1.806 1.026-2.502.697-.696 1.602-1.14 2.718-1.332V20.23c0-.324.102-.582.306-.774.204-.204.462-.306.774-.306.324 0 .582.102.774.306.205.192.306.45.306.774v.99c1.08.144 2.095.552 3.043 1.224.18.12.305.258.378.414.084.156.125.342.125.558 0 .3-.096.564-.288.792-.18.228-.39.342-.63.342-.131 0-.258-.018-.378-.054a2.752 2.752 0 01-.468-.234 8.072 8.072 0 00-1.331-.702c-.384-.156-.858-.234-1.422-.234-.648 0-1.17.144-1.566.432a1.368 1.368 0 00-.576 1.152c0 .336.113.612.341.828a2.5 2.5 0 00.864.486c.349.12.835.258 1.459.414.875.216 1.59.438 2.141.666.564.216 1.044.57 1.44 1.062.408.48.612 1.128.612 1.944z"
        fill="#fff"
      />
    </svg>
  );
}

export default WalletIcon;
