import { useState } from 'react';
import { Tab } from '@as-design-system/core';
import { Button } from '@as-design-system/core';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Tab.css';

export default function TabPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const variantsCode = `import { Tab } from '@/design-system/components/Tab';

// Default variant - Enabled
<Tab label="Default" variant="Default" status="Default" size="M" />
<Tab label="Active" variant="Default" status="Active" size="M" />

// Default variant - Disabled
<Tab label="Default" variant="Default" status="Default" size="M" disabled />
<Tab label="Active" variant="Default" status="Active" size="M" disabled />

// Container variant - Enabled
<Tab label="Default" variant="Container" status="Default" size="M" />
<Tab label="Active" variant="Container" status="Active" size="M" />

// Container variant - Disabled
<Tab label="Default" variant="Container" status="Default" size="M" disabled />
<Tab label="Active" variant="Container" status="Active" size="M" disabled />`;

  const sizesCode = `import { Tab } from '@/design-system/components/Tab';

<Tab label="Size S" size="S" status="Active" />
<Tab label="Size M" size="M" status="Active" />
<Tab label="Size L" size="L" status="Active" />
<Tab label="Size XL" size="XL" status="Active" />`;

  const statesCode = `import { Tab } from '@/design-system/components/Tab';

<Tab label="Default" status="Default" size="M" />
<Tab label="Active" status="Active" size="M" />
<Tab label="Disabled" status="Default" size="M" disabled={true} />`;

  const iconsCode = `import { Tab } from '@/design-system/components/Tab';

// Left icon
<Tab label="Add" leftIcon="add" size="M" status="Active" />
<Tab label="Build" leftIcon="construction" size="M" status="Default" />

// Right icon
<Tab label="Up" rightIcon="keyboard_arrow_up" size="M" status="Active" />
<Tab label="Down" rightIcon="keyboard_arrow_down" size="M" status="Default" />

// Both icons
<Tab label="Action" leftIcon="add" rightIcon="keyboard_arrow_down" size="M" status="Active" />`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        Tab
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        The Tab component allows you to create tabs with different sizes, statuses, and variants.
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
          <Button
            label="Code"
            leftIcon="code"
            size="S"
            variant="Outlined"
            onClick={() => setOpenModal('variants')}
          />
        </div>
        <div className="tab-showcase">
          <div className="tab-group">
            <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Default Variant</h3>
            <div className="tab-examples">
              <Tab label="Default" variant="Default" status="Default" size="M" />
              <Tab label="Active" variant="Default" status="Active" size="M" />
              <Tab label="Default Disabled" variant="Default" status="Default" size="M" disabled />
              <Tab label="Active Disabled" variant="Default" status="Active" size="M" disabled />
            </div>
          </div>
          <div className="tab-group">
            <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Container Variant</h3>
            <div className="tab-examples tab-examples--container">
              <Tab label="Default" variant="Container" status="Default" size="M" />
              <Tab label="Active" variant="Container" status="Active" size="M" />
              <Tab label="Default Disabled" variant="Container" status="Default" size="M" disabled />
              <Tab label="Active Disabled" variant="Container" status="Active" size="M" disabled />
            </div>
          </div>
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
        <div className="tab-examples">
          <Tab label="Size S" size="S" status="Active" />
          <Tab label="Size M" size="M" status="Active" />
          <Tab label="Size L" size="L" status="Active" />
          <Tab label="Size XL" size="XL" status="Active" />
        </div>
      </section>

      {/* States */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            States
          </h2>
          <Button
            label="Code"
            leftIcon="code"
            size="S"
            variant="Outlined"
            onClick={() => setOpenModal('states')}
          />
        </div>
        <div className="tab-examples">
          <Tab label="Default" status="Default" size="M" />
          <Tab label="Active" status="Active" size="M" />
          <Tab label="Disabled" status="Default" size="M" disabled={true} />
        </div>
      </section>

      {/* Icons */}
      <section className="component-section">
        <div className="section-header">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Icons
          </h2>
          <Button
            label="Code"
            leftIcon="code"
            size="S"
            variant="Outlined"
            onClick={() => setOpenModal('icons')}
          />
        </div>
        <div className="tab-showcase">
          <div className="tab-group">
            <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Left icon</h3>
            <div className="tab-examples">
              <Tab label="Add" leftIcon="add" size="M" status="Active" />
              <Tab label="Build" leftIcon="construction" size="M" status="Default" />
            </div>
          </div>

          <div className="tab-group">
            <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Right icon</h3>
            <div className="tab-examples">
              <Tab label="Up" rightIcon="keyboard_arrow_up" size="M" status="Active" />
              <Tab label="Down" rightIcon="keyboard_arrow_down" size="M" status="Default" />
            </div>
          </div>

          <div className="tab-group">
            <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Both icons</h3>
            <div className="tab-examples">
              <Tab label="Action" leftIcon="add" rightIcon="keyboard_arrow_down" size="M" status="Active" />
            </div>
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
                <td><code>label</code></td>
                <td><code>string</code></td>
                <td><code>-</code></td>
                <td>Tab label text (required)</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>'S' | 'M' | 'L' | 'XL'</code></td>
                <td><code>'M'</code></td>
                <td>Tab size</td>
              </tr>
              <tr>
                <td><code>status</code></td>
                <td><code>'Default' | 'Active'</code></td>
                <td><code>'Default'</code></td>
                <td>Tab status (controlled by parent)</td>
              </tr>
              <tr>
                <td><code>state</code></td>
                <td><code>'Default' | 'Hover' | 'Disabled'</code></td>
                <td><code>'Default'</code></td>
                <td>Tab state</td>
              </tr>
              <tr>
                <td><code>variant</code></td>
                <td><code>'Default' | 'Container'</code></td>
                <td><code>'Default'</code></td>
                <td>Tab variant (border style)</td>
              </tr>
              <tr>
                <td><code>leftIcon</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>Left icon name</td>
              </tr>
              <tr>
                <td><code>rightIcon</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>Right icon name</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Disables the tab</td>
              </tr>
              <tr>
                <td><code>onClick</code></td>
                <td><code>() =&gt; void</code></td>
                <td><code>undefined</code></td>
                <td>Click handler</td>
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
      <CodeModal
        isOpen={openModal === 'states'}
        onClose={() => setOpenModal(null)}
        title="States Implementation"
        code={statesCode}
      />
      <CodeModal
        isOpen={openModal === 'icons'}
        onClose={() => setOpenModal(null)}
        title="Icons Implementation"
        code={iconsCode}
      />
    </div>
  );
}
