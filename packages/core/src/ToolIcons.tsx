import './ToolIcons.css';

// Image filenames mapping - images are served from /tool-icons/ in the public folder
// Mappings EXACTS selon le code Figma (en analysant chaque condition if)
const lightModeImageFiles: Record<string, string> = {
  // if (tool === 'SkyFInesse' && style === 'Light') => imgImage
  'SkyFInesse': '7df5e3649ab0ad37c1181bff74f93be7f9c2fd17.png',
  // if (tool === 'AirScout' && style === 'Light') => imgImage1
  'AirScout': '7eefc727df4be9810d80f838733885ec70b27621.png',
  // if (tool === 'Maintenance' && style === 'Light') => imgImage2
  'Maintenance': '0bb073271e4a0db69047bc2644b54e5ef25e6476.png',
  // if (tool === 'Economics' && style === 'Light') => imgImage3
  'Economics': 'ac9ce4a417541255c5f375df7bf6ec055d65efde.png',
  // if (tool === 'Network' && style === 'Light') => imgImage4
  'Network': 'a98e80db88e55d2e60473814da7f0cc705e6c8fa.png',
  // if (tool === 'Network - Fam' && style === 'Light') => imgImage5
  'Network - Fam': '2c1c54376b8b2b324a18bebd3afcfff16ff2171b.png',
  // if (tool === 'Network - Rotation' && style === 'Light') => imgImage6
  'Network - Rotation': 'ea35ed53d7c9096515cad538bf281ae2b589d363.png',
  // if (tool === 'AOA' && style === 'Light') => imgImage16
  'AOA': '40865c31f4198c3109e051f2b4e3dcc463acccdd.png',
  // if (tool === 'MissionLIte' && style === 'Light') => imgImage17
  'MissionLIte': '72b33e3af5c8a4248ae3a8a4b5c00ea990fc482e.png',
  // if (tool === 'LopaExplorer' && style === 'Light') => imgImage18
  'LopaExplorer': 'c58ef4f02cb01664e4b6f632a2ecafa842ecf67a.png',
  // if (tool === 'Airline Simulator' && style === 'Light') => imgImage19
  'Airline Simulator': 'ea82f0f8e58e3d578e3b60a0e8480f5ff6126eb2.png',
  // if (tool === 'NavDB Editor' && style === 'Light') => imgImage20
  'NavDB Editor': 'd2e67c81142770d8e3ae8d9afa973f5666f527c4.png',
  // if (tool === 'EconomicsLite' && style === 'Light') => imgImage21
  'EconomicsLite': '729d09788103208889591d8b9ed86e14c247e3cd.png',
  // if (tool === 'AC Config' && style === 'Light') => imgImage22
  'AC Config': '983578d1c7f16dcb3a4c09880447d40979e77624.png',
  // if (tool === 'fello\'fly' && style === 'Light') => imgImage23
  'fello\'fly': 'e863acfa70addf66ff06f9086865ec4bca78522b.png',
  // if (tool === 'Airline Business Planner' && style === 'Light') => imgImage24
  'Airline Business Planner': '4f020ca933451d55a332779237662117dd6f8ccd.png',
  // if (tool === 'Network - TAM' && style === 'Light') => imgImage35
  'Network - TAM': '163c7b52645201f87f186960116af72280eba600.png',
  // if (tool === 'Weight Builder' && style === 'Light') => imgImage36
  'Weight Builder': '090448fa734b5701cbb0dd02026dba70bdeb28f8.png',
  // if (tool === 'Cabin Crew' && style === 'Light') => imgImage39
  'Cabin Crew': '09e79e7717e6e91c1d20173ff33c7682614b9a5f.png',
  // if (tool === 'Atmosphere' && style === 'Light') => imgImage41
  'Atmosphere': '4a54d3e85e65be1ab8d7b73f5c08709bbc4c3162.png',
  // return (default TrajOpt Light) => imgImage42
  'TrajOpt': '5af77dd7aa5a99f6a815bd06f644a35477c43d80.png',
};

const darkModeImageFiles: Record<string, string> = {
  // if (tool === 'TrajOpt' && style === 'Dark') => imgImage7
  'TrajOpt': '60b780db1493dfe4b3e516cf35cc8e31f7a4343b.png',
  // if (tool === 'SkyFInesse' && style === 'Dark') => imgImage8
  'SkyFInesse': '47f8cccac14f54950ce389f6ce6e99c23cda6d90.png',
  // if (tool === 'AirScout' && style === 'Dark') => imgImage9
  'AirScout': '5f10256eead718ecb5c106919c42bc3d99f0ded4.png',
  // if (tool === 'Maintenance' && style === 'Dark') => imgImage10
  'Maintenance': '84f99130c8ef3fe6dcc16a3dd6063397dff72fff.png',
  // if (tool === 'Economics' && style === 'Dark') => imgImage11
  'Economics': '253ef1e9e9f3c6208c24f0cfc1a3b62e1a5f4d0a.png',
  // if (tool === 'Network' && style === 'Dark') => imgImage12
  'Network': '83373f347b77b805f203c7090c1fba5f65fcf5d7.png',
  // if (tool === 'Network - Fam' && style === 'Dark') => imgImage13
  'Network - Fam': '4ed4f16a7e580211d261e72b93225989f8523d22.png',
  // if (tool === 'Network - Rotation' && style === 'Dark') => imgImage14
  'Network - Rotation': '335295a61503e22b31e220ff6d19effc4b7e2c41.png',
  // if (tool === 'AOA' && style === 'Dark') => imgImage25
  'AOA': '3945943fd42e54255a76354947000501e8a92b7d.png',
  // if (tool === 'MissionLIte' && style === 'Dark') => imgImage26
  'MissionLIte': '5c174b6777e374243e2f5e9a30659921f97eccfb.png',
  // if (tool === 'LopaExplorer' && style === 'Dark') => imgImage27
  'LopaExplorer': '35c65ce2ce8ad165eba5898955effef7d27b996d.png',
  // if (tool === 'Airline Simulator' && style === 'Dark') => imgImage28
  'Airline Simulator': '18ceee598066c3fa916e8d2a0058e06fcc5161bb.png',
  // if (tool === 'NavDB Editor' && style === 'Dark') => imgImage29
  'NavDB Editor': '2a92a302964d4a5092ee089ab146bd7b6862ef90.png',
  // if (tool === 'EconomicsLite' && style === 'Dark') => imgImage30
  'EconomicsLite': 'a014a64147cd77978129e95381892728e20be4b9.png',
  // if (tool === 'Atmosphere' && style === 'Dark') => imgImage31
  'Atmosphere': '9e03e3435613128d4d6f82dad42611a65f7128a5.png',
  // if (tool === 'AC Config' && style === 'Dark') => imgImage32
  'AC Config': '35916d9463f90c78f3f666a861b4d2789307406f.png',
  // if (tool === 'fello'fly' && style === 'Dark') => imgImage33
  'fello\'fly': '151630b315f676ac9f1aad427261099587960bba.png',
  // if (tool === 'Airline Business Planner' && style === 'Dark') => imgImage34
  'Airline Business Planner': 'd39db2b94d86006d564b3ece6acc6abbee3a3875.png',
  // if (tool === 'Network - TAM' && style === 'Dark') => imgImage37
  'Network - TAM': 'd39db2b94d86006d564b3ece6acc6abbee3a3875.png',
  // if (tool === 'Weight Builder' && style === 'Dark') => imgImage38
  'Weight Builder': 'c4d61b907787972979c676e4f09b04eee518d908.png',
  // if (tool === 'Cabin Crew' && style === 'Dark') => imgImage40
  'Cabin Crew': '201e01f004d22efed2451f1afc91db6f78308902.png',
};

export type ToolName =
  | 'AirScout'
  | 'TrajOpt'
  | 'Economics'
  | 'Maintenance'
  | 'Network'
  | 'SkyFInesse'
  | 'Network - Fam'
  | 'AOA'
  | 'MissionLIte'
  | 'LopaExplorer'
  | 'Airline Simulator'
  | 'NavDB Editor'
  | 'EconomicsLite'
  | 'Atmosphere'
  | 'AC Config'
  | 'fello\'fly'
  | 'Airline Business Planner'
  | 'Network - Rotation'
  | 'Network - TAM'
  | 'Weight Builder'
  | 'Cabin Crew';

export type ToolIconsStyle = 'Light' | 'Dark';

export interface ToolIconsProps {
  /**
   * Nom de l'outil à afficher
   * @default 'TrajOpt'
   */
  tool?: ToolName;
  /**
   * Style de l'icône (Light ou Dark)
   * @default 'Light'
   */
  style?: ToolIconsStyle;
  /**
   * Classes CSS supplémentaires
   */
  className?: string;
}

/**
 * Composant ToolIcons
 * 
 * Affiche une icône d'outil avec support des modes Light et Dark.
 * 
 * @example
 * ```tsx
 * <ToolIcons tool="TrajOpt" style="Light" />
 * <ToolIcons tool="Network" style="Dark" />
 * ```
 */
export function ToolIcons({
  tool = 'TrajOpt',
  style = 'Light',
  className = '',
}: ToolIconsProps) {
  const imageFiles = style === 'Light' ? lightModeImageFiles : darkModeImageFiles;
  const filename = imageFiles[tool] || lightModeImageFiles['TrajOpt'];
  
  // Images are served from the public folder
  const imageSrc = `/tool-icons/${filename}`;

  return (
    <div className={`tool-icons ${className}`.trim()} data-tool={tool} data-style={style}>
      <div className="tool-icons__image-wrapper">
        <img
          alt={`${tool} icon`}
          className="tool-icons__image"
          src={imageSrc}
        />
      </div>
    </div>
  );
}

export default ToolIcons;
