import { useState } from 'react';
import { ToolIcons, type ToolName, Button } from '@as-design-system/core';
import '@as-design-system/core/ToolIcons.css';
import CodeModal from '../components/CodeModal';
import './Button.css';

const allTools: ToolName[] = [
  'TrajOpt',
  'SkyFInesse',
  'AirScout',
  'Maintenance',
  'Economics',
  'Network',
  'Network - Fam',
  'Network - Rotation',
  'Network - TAM',
  'AOA',
  'MissionLIte',
  'LopaExplorer',
  'Airline Simulator',
  'NavDB Editor',
  'EconomicsLite',
  'Atmosphere',
  'AC Config',
  'fello\'fly',
  'Airline Business Planner',
  'Weight Builder',
  'Cabin Crew',
];

export default function ToolIconsPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const lightModeCode = `import { ToolIcons } from '@as-design-system/core';
import '@as-design-system/core/ToolIcons.css';

<ToolIcons tool="TrajOpt" style="Light" />
<ToolIcons tool="Network" style="Light" />
<ToolIcons tool="Economics" style="Light" />`;

  const darkModeCode = `import { ToolIcons } from '@as-design-system/core';
import '@as-design-system/core/ToolIcons.css';

<ToolIcons tool="TrajOpt" style="Dark" />
<ToolIcons tool="Network" style="Dark" />
<ToolIcons tool="Economics" style="Dark" />`;

  const sizesCode = `import { ToolIcons } from '@as-design-system/core';
import '@as-design-system/core/ToolIcons.css';

// Small (60px) - using CSS transform
<div style={{ transform: 'scale(0.667)' }}>
  <ToolIcons tool="TrajOpt" style="Light" />
</div>

// Default (90px)
<ToolIcons tool="Network" style="Light" />

// Large (120px) - using CSS transform
<div style={{ transform: 'scale(1.333)' }}>
  <ToolIcons tool="Economics" style="Light" />
</div>`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        ToolIcons
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '32px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Le composant ToolIcons permet d'afficher des icônes d'outils avec support des modes Light et Dark.
      </p>

      {/* Light Mode */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Light Mode
          </h2>
          <Button 
            label="Code" 
            leftIcon="code" 
            size="S" 
            variant="Outlined"
            onClick={() => setOpenModal('lightMode')}
          />
        </div>
        <div className="tool-icons-examples" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {allTools.map((tool) => (
            <div key={`light-${tool}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ transform: 'scale(0.667)' }}>
                <ToolIcons tool={tool} style="Light" />
              </div>
              <span className="label-regular-s" style={{ color: 'var(--text-secondary, var(--cool-grey-70, #63728a))', textAlign: 'center', maxWidth: '90px' }}>
                {tool}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Dark Mode */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Dark Mode
          </h2>
          <Button 
            label="Code" 
            leftIcon="code" 
            size="S" 
            variant="Outlined"
            onClick={() => setOpenModal('darkMode')}
          />
        </div>
        <div className="tool-icons-examples" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', backgroundColor: 'var(--background-main, #ffffff)', padding: '16px', borderRadius: '6px' }}>
          {allTools.map((tool) => (
            <div key={`dark-${tool}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ transform: 'scale(0.667)' }}>
                <ToolIcons tool={tool} style="Dark" />
              </div>
              <span className="label-regular-s" style={{ color: 'var(--text-secondary, var(--cool-grey-70, #63728a))', textAlign: 'center', maxWidth: '90px' }}>
                {tool}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Size */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Size
          </h2>
          <Button 
            label="Code" 
            leftIcon="code" 
            size="S" 
            variant="Outlined"
            onClick={() => setOpenModal('sizes')}
          />
        </div>
        <div className="tool-icons-examples" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ transform: 'scale(0.667)' }}>
              <ToolIcons tool="TrajOpt" style="Light" />
            </div>
            <span className="label-regular-s" style={{ color: 'var(--text-secondary, var(--cool-grey-70, #63728a))', textAlign: 'center' }}>
              60px
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <ToolIcons tool="Network" style="Light" />
            <span className="label-regular-s" style={{ color: 'var(--text-secondary, var(--cool-grey-70, #63728a))', textAlign: 'center' }}>
              90px (default)
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ transform: 'scale(1.333)' }}>
              <ToolIcons tool="Economics" style="Light" />
            </div>
            <span className="label-regular-s" style={{ color: 'var(--text-secondary, var(--cool-grey-70, #63728a))', textAlign: 'center' }}>
              120px
            </span>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'lightMode'}
        onClose={() => setOpenModal(null)}
        title="Light Mode Implementation"
        code={lightModeCode}
      />
      <CodeModal
        isOpen={openModal === 'darkMode'}
        onClose={() => setOpenModal(null)}
        title="Dark Mode Implementation"
        code={darkModeCode}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes Implementation"
        code={sizesCode}
      />
    </div>
  );
}
