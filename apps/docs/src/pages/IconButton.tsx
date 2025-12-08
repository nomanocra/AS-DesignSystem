import { useState } from 'react';
import { IconButton, Tab } from '@as-design-system/core';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/Tab.css';
import CodeModal from '../components/CodeModal';
import './IconButton.css';

export default function IconButtonPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const variantsCode = `import { IconButton } from '@/design-system/components/IconButton';

// Default variant - Enabled
<IconButton icon="add" variant="Default" size="M" />
<IconButton icon="delete" variant="Default" size="M" disabled />

// Outlined variant - Enabled
<IconButton icon="construction" variant="Outlined" size="M" />
<IconButton icon="emoji_emotions" variant="Outlined" size="M" disabled />

// Ghost variant - Enabled
<IconButton icon="keyboard_arrow_up" variant="Ghost" size="M" />
<IconButton icon="keyboard_arrow_down" variant="Ghost" size="M" disabled />`;

  const sizesCode = `import { IconButton } from '@/design-system/components/IconButton';

<IconButton icon="add" size="XS" variant="Default" />
<IconButton icon="add" size="S" variant="Default" />
<IconButton icon="add" size="M" variant="Default" />
<IconButton icon="add" size="L" variant="Default" />
<IconButton icon="add" size="XL" variant="Default" />`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        IconButton
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        The IconButton component displays icon-only buttons with different sizes, states, and variants.
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
      {/* Variants */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Variants
          </h2>
          <IconButton
            icon="code"
            size="S"
            variant="Outlined"
            onClick={() => setOpenModal('variants')}
          />
        </div>
        <div className="icon-button-examples">
          <IconButton icon="add" variant="Default" size="M" />
          <IconButton icon="construction" variant="Outlined" size="M" />
          <IconButton icon="keyboard_arrow_up" variant="Ghost" size="M" />
          <IconButton icon="delete" variant="Default" size="M" disabled />
          <IconButton icon="emoji_emotions" variant="Outlined" size="M" disabled />
          <IconButton icon="keyboard_arrow_down" variant="Ghost" size="M" disabled />
        </div>
      </section>

      {/* Sizes */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Sizes
          </h2>
          <IconButton
            icon="code"
            size="S"
            variant="Outlined"
            onClick={() => setOpenModal('sizes')}
          />
        </div>
        <div className="icon-button-examples">
          <IconButton icon="add" size="XS" variant="Default" />
          <IconButton icon="add" size="S" variant="Default" />
          <IconButton icon="add" size="M" variant="Default" />
          <IconButton icon="add" size="L" variant="Default" />
          <IconButton icon="add" size="XL" variant="Default" />
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
                <td><code>icon</code></td>
                <td><code>string</code></td>
                <td><code>-</code></td>
                <td>Icon name to display (required)</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>'XS' | 'S' | 'M' | 'L' | 'XL'</code></td>
                <td><code>'M'</code></td>
                <td>Button size</td>
              </tr>
              <tr>
                <td><code>state</code></td>
                <td><code>'Default' | 'Hover' | 'Active' | 'Disabled'</code></td>
                <td><code>'Default'</code></td>
                <td>Button state</td>
              </tr>
              <tr>
                <td><code>variant</code></td>
                <td><code>'Default' | 'Outlined' | 'Ghost'</code></td>
                <td><code>'Default'</code></td>
                <td>Button variant</td>
              </tr>
              <tr>
                <td><code>alt</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>Alternative text for accessibility</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Disables the button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'variants'}
        onClose={() => setOpenModal(null)}
        title="Variants Implementation"
        code={variantsCode}
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
