import * as React from "react";

const Logo = ({ fill = "currentColor", className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 114"
    fill="none"
    className={className}
    {...props}
  >
    <g fill={fill} clipPath="url(#clip0_1969_2)">
      <path d="M16.32 32.64C25.3333 32.64 32.64 25.3333 32.64 16.32C32.64 7.30671 25.3333 0 16.32 0C7.30671 0 0 7.30671 0 16.32C0 25.3333 7.30671 32.64 16.32 32.64Z" />
      <path d="M71.99 16.3198V90.7998H27.29V64.9198H27.28V63.5298H48.68V40.9098H0.04V40.9498H0V61.8798H0.04V79.4798H0V113.36H56.73V113.4H74.85V113.39H100V16.3198H71.99Z" />
    </g>
    <defs>
      <clipPath id="clip0_1969_2">
        <rect width="100" height="113.4" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Logo;
