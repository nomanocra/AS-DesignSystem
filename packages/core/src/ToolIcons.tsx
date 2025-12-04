import './ToolIcons.css';

// Import all tool icon images
import trajoptLight from './assets/tool-icons/trajopt-light.png';
import trajoptDark from './assets/tool-icons/trajopt-dark.png';
import skyfinesseLight from './assets/tool-icons/skyfinesse-light.png';
import skyfinesseDark from './assets/tool-icons/skyfinesse-dark.png';
import airscoutLight from './assets/tool-icons/airscout-light.png';
import airscoutDark from './assets/tool-icons/airscout-dark.png';
import maintenanceLight from './assets/tool-icons/maintenance-light.png';
import maintenanceDark from './assets/tool-icons/maintenance-dark.png';
import economicsLight from './assets/tool-icons/economics-light.png';
import economicsDark from './assets/tool-icons/economics-dark.png';
import networkLight from './assets/tool-icons/network-light.png';
import networkDark from './assets/tool-icons/network-dark.png';
import networkFamLight from './assets/tool-icons/network-fam-light.png';
import networkFamDark from './assets/tool-icons/network-fam-dark.png';
import networkRotationLight from './assets/tool-icons/network-rotation-light.png';
import networkRotationDark from './assets/tool-icons/network-rotation-dark.png';
import networkTamLight from './assets/tool-icons/network-tam-light.png';
import networkTamDark from './assets/tool-icons/network-tam-dark.png';
import aoaLight from './assets/tool-icons/aoa-light.png';
import aoaDark from './assets/tool-icons/aoa-dark.png';
import missionliteLight from './assets/tool-icons/missionlite-light.png';
import missionliteDark from './assets/tool-icons/missionlite-dark.png';
import lopaexplorerLight from './assets/tool-icons/lopaexplorer-light.png';
import lopaexplorerDark from './assets/tool-icons/lopaexplorer-dark.png';
import airlineSimulatorLight from './assets/tool-icons/airline-simulator-light.png';
import airlineSimulatorDark from './assets/tool-icons/airline-simulator-dark.png';
import navdbEditorLight from './assets/tool-icons/navdb-editor-light.png';
import navdbEditorDark from './assets/tool-icons/navdb-editor-dark.png';
import economicsliteLight from './assets/tool-icons/economicslite-light.png';
import economicsliteDark from './assets/tool-icons/economicslite-dark.png';
import atmosphereLight from './assets/tool-icons/atmosphere-light.png';
import atmosphereDark from './assets/tool-icons/atmosphere-dark.png';
import acConfigLight from './assets/tool-icons/ac-config-light.png';
import acConfigDark from './assets/tool-icons/ac-config-dark.png';
import felloflyLight from './assets/tool-icons/fellofly-light.png';
import felloflyDark from './assets/tool-icons/fellofly-dark.png';
import airlineBusinessPlannerLight from './assets/tool-icons/airline-business-planner-light.png';
import airlineBusinessPlannerDark from './assets/tool-icons/airline-business-planner-dark.png';
import weightBuilderLight from './assets/tool-icons/weight-builder-light.png';
import weightBuilderDark from './assets/tool-icons/weight-builder-dark.png';
import cabinCrewLight from './assets/tool-icons/cabin-crew-light.png';
import cabinCrewDark from './assets/tool-icons/cabin-crew-dark.png';

export type ToolName =
  | 'trajopt'
  | 'skyfinesse'
  | 'airscout'
  | 'maintenance'
  | 'economics'
  | 'network'
  | 'network-fam'
  | 'network-rotation'
  | 'network-tam'
  | 'aoa'
  | 'missionlite'
  | 'lopaexplorer'
  | 'airline-simulator'
  | 'navdb-editor'
  | 'economicslite'
  | 'atmosphere'
  | 'ac-config'
  | 'fellofly'
  | 'airline-business-planner'
  | 'weight-builder'
  | 'cabin-crew';

export type ToolIconMode = 'light' | 'dark';

export interface ToolIconsProps {
  /**
   * Nom de l'outil à afficher
   * @default 'trajopt'
   */
  tool?: ToolName;
  /**
   * Mode d'affichage (light ou dark)
   * @default 'light'
   */
  mode?: ToolIconMode;
  /**
   * Taille de l'icône en pixels ou valeur CSS
   * @default 60
   */
  size?: number | string;
  /**
   * Texte alternatif pour l'accessibilité
   */
  alt?: string;
  /**
   * Classe CSS supplémentaire
   */
  className?: string;
}

// Mapping des images
const imageMap: Record<ToolName, { light: string; dark: string }> = {
  'trajopt': { light: trajoptLight, dark: trajoptDark },
  'skyfinesse': { light: skyfinesseLight, dark: skyfinesseDark },
  'airscout': { light: airscoutLight, dark: airscoutDark },
  'maintenance': { light: maintenanceLight, dark: maintenanceDark },
  'economics': { light: economicsLight, dark: economicsDark },
  'network': { light: networkLight, dark: networkDark },
  'network-fam': { light: networkFamLight, dark: networkFamDark },
  'network-rotation': { light: networkRotationLight, dark: networkRotationDark },
  'network-tam': { light: networkTamLight, dark: networkTamDark },
  'aoa': { light: aoaLight, dark: aoaDark },
  'missionlite': { light: missionliteLight, dark: missionliteDark },
  'lopaexplorer': { light: lopaexplorerLight, dark: lopaexplorerDark },
  'airline-simulator': { light: airlineSimulatorLight, dark: airlineSimulatorDark },
  'navdb-editor': { light: navdbEditorLight, dark: navdbEditorDark },
  'economicslite': { light: economicsliteLight, dark: economicsliteDark },
  'atmosphere': { light: atmosphereLight, dark: atmosphereDark },
  'ac-config': { light: acConfigLight, dark: acConfigDark },
  'fellofly': { light: felloflyLight, dark: felloflyDark },
  'airline-business-planner': { light: airlineBusinessPlannerLight, dark: airlineBusinessPlannerDark },
  'weight-builder': { light: weightBuilderLight, dark: weightBuilderDark },
  'cabin-crew': { light: cabinCrewLight, dark: cabinCrewDark },
};

/**
 * Composant ToolIcons
 *
 * Affiche les icônes des différents outils AS en mode light ou dark.
 *
 * @example
 * ```tsx
 * <ToolIcons tool="trajopt" mode="light" />
 * <ToolIcons tool="skyfinesse" mode="dark" size={90} />
 * <ToolIcons tool="network" mode="light" size="100px" />
 * ```
 */
export function ToolIcons({
  tool = 'trajopt',
  mode = 'light',
  size = 60,
  alt,
  className = '',
}: ToolIconsProps) {
  // Mapper les noms d'outils vers des labels lisibles
  const toolLabels: Record<ToolName, string> = {
    'trajopt': 'TrajOpt',
    'skyfinesse': 'SkyFInesse',
    'airscout': 'AirScout',
    'maintenance': 'Maintenance',
    'economics': 'Economics',
    'network': 'Network',
    'network-fam': 'Network - Fam',
    'network-rotation': 'Network - Rotation',
    'network-tam': 'Network - TAM',
    'aoa': 'AOA',
    'missionlite': 'MissionLite',
    'lopaexplorer': 'LopaExplorer',
    'airline-simulator': 'Airline Simulator',
    'navdb-editor': 'NavDB Editor',
    'economicslite': 'EconomicsLite',
    'atmosphere': 'Atmosphere',
    'ac-config': 'AC Config',
    'fellofly': "Fello'fly",
    'airline-business-planner': 'Airline Business Planner',
    'weight-builder': 'Weight Builder',
    'cabin-crew': 'Cabin Crew',
  };

  const toolLabel = toolLabels[tool];
  const altText = alt || `${toolLabel} - ${mode} mode`;

  // Get the image from the map
  const imageSrc = imageMap[tool][mode];

  // Gérer la taille (nombre ou string CSS)
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  const toolIconClasses = [
    'tool-icon',
    `tool-icon--${mode}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={toolIconClasses}
      data-tool={tool}
      data-mode={mode}
      style={{ width: sizeValue, height: sizeValue }}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="tool-icon__image"
      />
    </div>
  );
}

export default ToolIcons;
