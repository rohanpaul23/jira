// frontend/src/components/Logo.tsx
import React from 'react';
import SVGComponent from './SVGComponent'; // make sure path is correct

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  /** SVG width (px or CSS unit) */
  width?: string | number;
  /** SVG height (px or CSS unit) */
  height?: string | number;
  /** Optional text to render alongside the logo */
  label?: string;
  /** Text color */
  labelColor?: string;
  /** Text size (CSS font-size) */
  labelSize?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 126,
  height = 43,
  label,
  labelColor = '#111',
  labelSize = '1rem',
  ...svgProps
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      lineHeight: 1,
    }}
  >
    <SVGComponent width={width} height={height} label={label} {...svgProps} />
    {label && (
      <span
        style={{
          marginLeft: '0.5rem',
          color: labelColor,
          fontSize: labelSize,
        }}
      >
        {label}
      </span>
    )}
  </div>
);

export default Logo;
