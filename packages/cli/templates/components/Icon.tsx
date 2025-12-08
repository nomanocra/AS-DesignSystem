/// <reference types="vite/client" />
import './Icon.css';

// Import all SVG files as raw strings to inline them
import addIcon from '../assets/svg/icons/add.svg?raw';
import deleteIcon from '../assets/svg/icons/delete.svg?raw';
import codeIcon from '../assets/svg/icons/code.svg?raw';
import constructionIcon from '../assets/svg/icons/construction.svg?raw';
import keyboardArrowDownIcon from '../assets/svg/icons/keyboard_arrow_down.svg?raw';
import keyboardArrowUpIcon from '../assets/svg/icons/keyboard_arrow_up.svg?raw';
import darkModeIcon from '../assets/svg/icons/dark_mode.svg?raw';
import lightModeIcon from '../assets/svg/icons/light_mode.svg?raw';
import menuIcon from '../assets/svg/icons/menu.svg?raw';
import emojiEmotionsIcon from '../assets/svg/icons/emoji_emotions.svg?raw';
import airAcTwinEngineIcon from '../assets/svg/icons/AIR_AC_twin_engine.svg?raw';
import airAirbusIcon from '../assets/svg/icons/AIR_Airbus.svg?raw';
import airAirportIcon from '../assets/svg/icons/AIR_airport.svg?raw';
import airApuIcon from '../assets/svg/icons/AIR_APU.svg?raw';
import airArrivalIcon from '../assets/svg/icons/AIR_arrival.svg?raw';
import airChatbotIcon from '../assets/svg/icons/AIR_Chatbot.svg?raw';
import airDepartureIcon from '../assets/svg/icons/AIR_departure.svg?raw';
import airEngineIcon from '../assets/svg/icons/AIR_engine.svg?raw';
import airFacebookIcon from '../assets/svg/icons/AIR_Facebook.svg?raw';
import airFleetIcon from '../assets/svg/icons/AIR_fleet.svg?raw';
import airGithubIcon from '../assets/svg/icons/AIR_GitHub.svg?raw';
import airGoogleIcon from '../assets/svg/icons/AIR_Google.svg?raw';
import airGroundInIcon from '../assets/svg/icons/AIR_ground_In.svg?raw';
import airGroundOutIcon from '../assets/svg/icons/AIR_ground_out.svg?raw';
import airInstagramIcon from '../assets/svg/icons/AIR_Instagram.svg?raw';
import airLandingGearIcon from '../assets/svg/icons/AIR_landing_gear.svg?raw';
import airLifeVestIcon from '../assets/svg/icons/AIR_life_vest.svg?raw';
import airLinkedinIcon from '../assets/svg/icons/AIR_Linkedin.svg?raw';
import airSapIcon from '../assets/svg/icons/AIR_SAP.svg?raw';
import airSideIcon from '../assets/svg/icons/AIR_side.svg?raw';
import airSkywiseIcon from '../assets/svg/icons/AIR_Skywise.svg?raw';
import airSpinnerIcon from '../assets/svg/icons/AIR_spinner.svg?raw';
import airSvgIcon from '../assets/svg/icons/AIR_SVG.svg?raw';
import airTailIcon from '../assets/svg/icons/AIR_tail.svg?raw';
import airXIcon from '../assets/svg/icons/AIR_X.svg?raw';
import airXlsIcon from '../assets/svg/icons/AIR_XLS.svg?raw';
import airYoutubeIcon from '../assets/svg/icons/AIR_Youtube.svg?raw';

// Build iconMap from imported icons
const iconMap: Record<string, string> = {
  'add': addIcon,
  'delete': deleteIcon,
  'code': codeIcon,
  'construction': constructionIcon,
  'keyboard_arrow_down': keyboardArrowDownIcon,
  'keyboard_arrow_up': keyboardArrowUpIcon,
  'dark_mode': darkModeIcon,
  'light_mode': lightModeIcon,
  'menu': menuIcon,
  'emoji_emotions': emojiEmotionsIcon,
  'AIR_AC_twin_engine': airAcTwinEngineIcon,
  'AIR_Airbus': airAirbusIcon,
  'AIR_airport': airAirportIcon,
  'AIR_APU': airApuIcon,
  'AIR_arrival': airArrivalIcon,
  'AIR_Chatbot': airChatbotIcon,
  'AIR_departure': airDepartureIcon,
  'AIR_engine': airEngineIcon,
  'AIR_Facebook': airFacebookIcon,
  'AIR_fleet': airFleetIcon,
  'AIR_GitHub': airGithubIcon,
  'AIR_Google': airGoogleIcon,
  'AIR_ground_In': airGroundInIcon,
  'AIR_ground_out': airGroundOutIcon,
  'AIR_Instagram': airInstagramIcon,
  'AIR_landing_gear': airLandingGearIcon,
  'AIR_life_vest': airLifeVestIcon,
  'AIR_Linkedin': airLinkedinIcon,
  'AIR_SAP': airSapIcon,
  'AIR_side': airSideIcon,
  'AIR_Skywise': airSkywiseIcon,
  'AIR_spinner': airSpinnerIcon,
  'AIR_SVG': airSvgIcon,
  'AIR_tail': airTailIcon,
  'AIR_X': airXIcon,
  'AIR_XLS': airXlsIcon,
  'AIR_Youtube': airYoutubeIcon,
};

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
  const svgContent = iconMap[name];
  const iconSize = typeof size === 'number' ? `${size}px` : size;
  const defaultColor = color || 'var(--primary-default, var(--sea-blue-70, #063b9e))';

  if (!svgContent) {
    console.error(`Icon "${name}" not found. Available icons: ${Object.keys(iconMap).join(', ')}`);
    return null;
  }

  // Replace fill and stroke attributes with currentColor so we can control it via CSS
  let processedSvg = svgContent
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
    // Add width, height, and preserve viewBox
    .replace(/<svg/, `<svg width="${iconSize}" height="${iconSize}"`);

  return (
    <span
      className={`icon icon-${name} ${className}`}
      style={{
        display: 'inline-flex',
        color: defaultColor,
        lineHeight: 0,
      }}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
}

export default Icon;
