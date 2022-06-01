import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function OpinionIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 18" fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.43 0H1.938A1.942 1.942 0 000 1.937v11.62c0 1.066.872 1.937 1.937 1.937H15.08a1 1 0 01.707.293l1.873 1.873c.63.63 1.708.184 1.708-.707V1.937A1.942 1.942 0 0017.43 0zm-1 1.937a1 1 0 011 1v10.386c0 .504-.61.757-.966.4a.567.567 0 00-.4-.166H2.936a1 1 0 01-1-1v-9.62a1 1 0 011-1H16.43zm-1.904 7.747a.968.968 0 010 1.937H4.842a.968.968 0 110-1.937h9.684zm.968-1.937a.968.968 0 00-.968-.968H4.842a.968.968 0 000 1.936h9.684a.968.968 0 00.968-.968zm-.968-3.873a.968.968 0 010 1.936H4.842a.968.968 0 010-1.936h9.684z"
        fill="#5E17EB"
      />
    </svg>
  );
}

export default OpinionIcon;
