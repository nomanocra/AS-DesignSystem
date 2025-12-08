import { useState } from 'react';
import { ToolIcons, type ToolName } from '@as-design-system/core';
import { Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/ToolIcons.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './ToolIcons.css';

export default function ToolIconsPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  // All available tools
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

  const lightCode = `import { ToolIcons } from '@/design-system/components/ToolIcons';

// All tools in light mode
const tools = [
  'trajopt', 'skyfinesse', 'airscout', 'maintenance',
  'economics', 'network', 'network-fam', 'network-rotation',
  'network-tam', 'aoa', 'missionlite', 'lopaexplorer',
  'airline-simulator', 'navdb-editor', 'economicslite',
  'atmosphere', 'ac-config', 'fellofly',
  'airline-business-planner', 'weight-builder', 'cabin-crew'
];

{tools.map(tool => (
  <ToolIcons key={tool} tool={tool} mode="light" size={60} />
))}`;

  const darkCode = `import { ToolIcons } from '@/design-system/components/ToolIcons';

// All tools in dark mode
const tools = [
  'trajopt', 'skyfinesse', 'airscout', 'maintenance',
  'economics', 'network', 'network-fam', 'network-rotation',
  'network-tam', 'aoa', 'missionlite', 'lopaexplorer',
  'airline-simulator', 'navdb-editor', 'economicslite',
  'atmosphere', 'ac-config', 'fellofly',
  'airline-business-planner', 'weight-builder', 'cabin-crew'
];

{tools.map(tool => (
  <ToolIcons key={tool} tool={tool} mode="dark" size={60} />
))}`;

  const sizesCode = `import { ToolIcons } from '@/design-system/components/ToolIcons';

<ToolIcons tool="network" mode="light" size={40} />
<ToolIcons tool="network" mode="light" size={60} />
<ToolIcons tool="network" mode="light" size={80} />
<ToolIcons tool="network" mode="light" size={100} />
<ToolIcons tool="network" mode="light" size="120px" />`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        ToolIcons
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        The ToolIcons component displays AS product tool icons in light or dark mode with customizable sizes.
      </p>

      {/* Tabs */}
      <div className="tabs-container">
        <div style={{ display: 'flex', gap: '0' }}>
          <Tab
            label="Examples"
            size="M"
            status={activeTab === 'examples' ? 'Active' : 'Default'}
            onClick={() => setActiveTab('examples')}
          />
          <Tab
            label="Props"
            size="M"
            status={activeTab === 'props' ? 'Active' : 'Default'}
            onClick={() => setActiveTab('props')}
          />
        </div>
      </div>

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <>
          {/* Light Mode */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Light
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('light')}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {allTools.map(tool => (
                <ToolIcons key={tool} tool={tool} mode="light" size={60} />
              ))}
            </div>
          </section>

          {/* Dark Mode */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Dark
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('dark')}
              />
            </div>

            <div style={{ backgroundColor: 'var(--background-corporate)', padding: '24px', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {allTools.map(tool => (
                <ToolIcons key={tool} tool={tool} mode="dark" size={60} />
              ))}
            </div>
          </section>

          {/* Sizes */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Sizes
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('sizes')}
              />
            </div>

            <div className="tool-icons-grid" style={{ alignItems: 'flex-end' }}>
              <div className="tool-icon-item">
                <ToolIcons tool="network" mode="light" size={40} />
                <p className="label-regular-s">40px</p>
              </div>
              <div className="tool-icon-item">
                <ToolIcons tool="network" mode="light" size={60} />
                <p className="label-regular-s">60px (default)</p>
              </div>
              <div className="tool-icon-item">
                <ToolIcons tool="network" mode="light" size={80} />
                <p className="label-regular-s">80px</p>
              </div>
              <div className="tool-icon-item">
                <ToolIcons tool="network" mode="light" size={100} />
                <p className="label-regular-s">100px</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
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
                  <td>Tool name to display (see list of 21 available tools)</td>
                </tr>
                <tr>
                  <td><code>mode</code></td>
                  <td><code>'light' | 'dark'</code></td>
                  <td><code>'light'</code></td>
                  <td>Display mode for the icon</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>number | string</code></td>
                  <td><code>60</code></td>
                  <td>Icon size in pixels or CSS value (e.g., "80px")</td>
                </tr>
                <tr>
                  <td><code>alt</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Alternative text for accessibility</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Additional CSS class</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 className="label-medium-m" style={{ marginBottom: '12px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
              Available Tool Names
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {allTools.map(tool => (
                <code key={tool} style={{
                  padding: '4px 8px',
                  backgroundColor: 'var(--cool-grey-10, #f2f4f7)',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {tool}
                </code>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'light'}
        onClose={() => setOpenModal(null)}
        title="Light Mode Implementation"
        code={lightCode}
      />
      <CodeModal
        isOpen={openModal === 'dark'}
        onClose={() => setOpenModal(null)}
        title="Dark Mode Implementation"
        code={darkCode}
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
