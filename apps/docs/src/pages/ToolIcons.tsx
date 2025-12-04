import { useState } from 'react';
import { ToolIcons, Button, type ToolName } from '@as-design-system/core';
import '@as-design-system/core/ToolIcons.css';
import CodeModal from '../components/CodeModal';
import './ToolIcons.css';

export default function ToolIconsPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const allTools: ToolName[] = [
    'trajopt',
    'skyfinesse',
    'airscout',
    'maintenance',
    'economics',
    'network',
    'network-fam',
    'network-rotation',
    'network-tam',
    'aoa',
    'missionlite',
    'lopaexplorer',
    'airline-simulator',
    'navdb-editor',
    'economicslite',
    'atmosphere',
    'ac-config',
    'fellofly',
    'airline-business-planner',
    'weight-builder',
    'cabin-crew',
  ];

  const lightModeCode = `import { ToolIcons } from '@as-design-system/core';
import '@as-design-system/core/ToolIcons.css';

<ToolIcons tool="trajopt" mode="light" />
<ToolIcons tool="skyfinesse" mode="light" />
<ToolIcons tool="airscout" mode="light" />
<ToolIcons tool="maintenance" mode="light" />
// ... all tools in light mode`;

  const darkModeCode = `import { ToolIcons } from '@as-design-system/core';
import '@as-design-system/core/ToolIcons.css';

<ToolIcons tool="trajopt" mode="dark" />
<ToolIcons tool="skyfinesse" mode="dark" />
<ToolIcons tool="airscout" mode="dark" />
<ToolIcons tool="maintenance" mode="dark" />
// ... all tools in dark mode`;

  const sizesCode = `import { ToolIcons } from '@as-design-system/core';
import '@as-design-system/core/ToolIcons.css';

// Default size (60px)
<ToolIcons tool="trajopt" mode="light" />

// Custom size with number (pixels)
<ToolIcons tool="skyfinesse" mode="light" size={90} />
<ToolIcons tool="network" mode="dark" size={120} />

// Custom size with CSS string
<ToolIcons tool="economics" mode="light" size="5rem" />`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        ToolIcons
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '32px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Le composant ToolIcons affiche les icônes des différents outils AS en mode light ou dark.
      </p>

      {/* Light Mode */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Mode Light
          </h2>
          <Button
            label="Code"
            leftIcon="code"
            size="S"
            variant="Outlined"
            onClick={() => setOpenModal('light')}
          />
        </div>
        <div className="tool-icons-grid">
          {allTools.map((tool) => (
            <div key={tool} className="tool-icon-item">
              <ToolIcons tool={tool} mode="light" />
              <span className="tool-icon-label">{tool}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dark Mode */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Mode Dark
          </h2>
          <Button
            label="Code"
            leftIcon="code"
            size="S"
            variant="Outlined"
            onClick={() => setOpenModal('dark')}
          />
        </div>
        <div className="tool-icons-grid tool-icons-grid--dark">
          {allTools.map((tool) => (
            <div key={tool} className="tool-icon-item">
              <ToolIcons tool={tool} mode="dark" />
              <span className="tool-icon-label">{tool}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Tailles
          </h2>
          <Button
            label="Code"
            leftIcon="code"
            size="S"
            variant="Outlined"
            onClick={() => setOpenModal('sizes')}
          />
        </div>
        <div className="tool-icons-sizes">
          <div className="tool-icon-size-item">
            <ToolIcons tool="trajopt" mode="light" size={40} />
            <span className="tool-icon-label">40px</span>
          </div>
          <div className="tool-icon-size-item">
            <ToolIcons tool="skyfinesse" mode="light" size={60} />
            <span className="tool-icon-label">60px (default)</span>
          </div>
          <div className="tool-icon-size-item">
            <ToolIcons tool="network" mode="light" size={90} />
            <span className="tool-icon-label">90px</span>
          </div>
          <div className="tool-icon-size-item">
            <ToolIcons tool="economics" mode="light" size={120} />
            <span className="tool-icon-label">120px</span>
          </div>
        </div>
      </section>

      {/* Props */}
      <section className="component-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Props
        </h2>
        <div className="props-table">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>tool</code></td>
                <td><code>ToolName</code></td>
                <td><code>'trajopt'</code></td>
                <td>Nom de l'outil à afficher (21 outils disponibles)</td>
              </tr>
              <tr>
                <td><code>mode</code></td>
                <td><code>'light' | 'dark'</code></td>
                <td><code>'light'</code></td>
                <td>Mode d'affichage de l'icône</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>number | string</code></td>
                <td><code>60</code></td>
                <td>Taille de l'icône (nombre en px ou valeur CSS)</td>
              </tr>
              <tr>
                <td><code>alt</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>Texte alternatif pour l'accessibilité</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td><code>''</code></td>
                <td>Classe CSS supplémentaire</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'light'}
        onClose={() => setOpenModal(null)}
        title="Light Mode Implementation"
        code={lightModeCode}
      />
      <CodeModal
        isOpen={openModal === 'dark'}
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
