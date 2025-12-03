import './Icon.css';
import { iconMap } from '@as-design-system/icons';

export interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
}

/**
 * Icon Component
 * 
 * Displays an icon by name. The icon can be resized using the size prop.
 * 
 * @example
 * ```tsx
 * <Icon name="AIR_fleet" size={24} />
 * <Icon name="add" size="32px" color="var(--primary-default)" />
 * ```
 */
export function Icon({ name, size = 24, className = '', color }: IconProps) {
  const IconComponent = iconMap[name];
  const defaultColor = color || 'var(--primary-default, var(--sea-blue-70, #063b9e))';
  
  if (!IconComponent) {
    // Fallback placeholder if icon not found
    const iconSize = typeof size === 'number' ? `${size}px` : size;
    return (
      <svg
        className={`icon icon-${name} ${className}`}
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: defaultColor }}
      >
        <rect width="24" height="24" fill="currentColor" opacity="0.1" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fill="currentColor"
          opacity="0.5"
        >
          {name}
        </text>
      </svg>
    );
  }
  
  const iconSize = typeof size === 'number' ? `${size}px` : size;
  
  return (
    <IconComponent
      className={`icon icon-${name} ${className}`}
      width={iconSize}
      height={iconSize}
      style={{ color: defaultColor }}
    />
  );
}

export default Icon;

