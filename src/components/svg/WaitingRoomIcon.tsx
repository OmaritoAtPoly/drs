import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function WaitingRoomIcon({
  width = 22,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27 30"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.27 1c-3.041 0-5.529 2.488-5.529 5.528 0 3.04 2.488 5.528 5.528 5.528 3.04 0 5.528-2.488 5.528-5.528C25.797 3.488 23.31 1 20.27 1zm0 10.135a4.613 4.613 0 01-4.607-4.607 4.613 4.613 0 014.606-4.607 4.613 4.613 0 014.607 4.607 4.613 4.613 0 01-4.607 4.607zm-.462-6.91h.691V6.62l2.073 1.244-.368.599-2.396-1.474V4.225z"
        fill={fill}
      />
      <path
        d="M20.5 4.225h.25v-.25h-.25v.25zm-.692 0v-.25h-.25v.25h.25zM20.5 6.62h-.25v.142l.122.073.128-.215zm2.073 1.244l.213.131.133-.215-.217-.13-.129.214zm-.368.599l-.131.213.212.13.131-.212-.212-.131zm-2.396-1.474h-.25v.14l.12.073.13-.213zm-4.817-.461c0-2.902 2.376-5.278 5.278-5.278v-.5c-3.178 0-5.778 2.6-5.778 5.778h.5zm5.278 5.278c-2.902 0-5.278-2.376-5.278-5.278h-.5c0 3.178 2.6 5.778 5.778 5.778v-.5zm5.278-5.278c0 2.902-2.375 5.278-5.278 5.278v.5c3.179 0 5.778-2.6 5.778-5.778h-.5zM20.27 1.25c2.903 0 5.278 2.376 5.278 5.278h.5c0-3.178-2.6-5.778-5.778-5.778v.5zm-4.856 5.278a4.863 4.863 0 004.856 4.857v-.5a4.363 4.363 0 01-4.356-4.357h-.5zm4.856-4.857a4.863 4.863 0 00-4.856 4.857h.5a4.363 4.363 0 014.356-4.357v-.5zm4.857 4.857a4.863 4.863 0 00-4.857-4.857v.5a4.363 4.363 0 014.357 4.357h.5zm-4.857 4.857a4.863 4.863 0 004.857-4.857h-.5a4.363 4.363 0 01-4.357 4.357v.5zm.23-7.41h-.69v.5h.69v-.5zm.25 2.645V4.225h-.5V6.62h.5zm1.952 1.03l-2.073-1.244-.258.429 2.073 1.244.258-.43zm-.285.944l.369-.599-.426-.262-.368.599.425.262zm-2.739-1.392l2.396 1.474.262-.426-2.396-1.474-.262.426zm-.119-2.977v2.764h.5V4.225h-.5z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.168 6.837a2.885 2.885 0 010-4.074 2.885 2.885 0 014.074 0 2.884 2.884 0 010 4.074 2.859 2.859 0 01-4.074 0zM2.879 22.083V9.127H0v12.956a7.2 7.2 0 007.198 7.197h8.637v-2.879H7.198a4.313 4.313 0 01-4.319-4.318zm12.855-1.44l7.299 7.299L20.974 30l-5.038-5.038H8.637a4.313 4.313 0 01-4.318-4.319v-8.277a3.244 3.244 0 013.239-3.24H7.6c.49 0 .964.13 1.382.332.374.172.72.417.993.72l2.015 2.23c1.526 1.685 4.333 2.966 6.723 2.938v3.109c-2.735 0-5.902-1.454-7.917-3.11v5.298h4.937z"
        fill={fill}
      />
    </svg>
  );
}

export default WaitingRoomIcon;
