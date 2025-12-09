import { useState } from 'react';
import { Select, VSelect, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/Select.css';
import '@as-design-system/core/VSelect.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Select.css';

export default function SelectPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [componentType, setComponentType] = useState<'select' | 'vselect'>('select');

  const [selectValue, setSelectValue] = useState<string>();
  const [vselectValue, setVselectValue] = useState<string>();

  const countryOptions = [
    { value: 'fr', label: 'France' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'es', label: 'Spain' },
  ];

  const sizesCode = `import { Select } from '@/design-system/components/Select';

const options = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
];

<Select label="Size XS" options={options} size="XS" />
<Select label="Size S" options={options} size="S" />
<Select label="Size M" options={options} size="M" />
<Select label="Size L" options={options} size="L" />`;

  const statesCode = `import { Select } from '@/design-system/components/Select';

const options = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
];

<Select label="Default" options={options} state="Default" />
<Select label="Error" options={options} state="Error" legend="This field is required" showLegend />
<Select label="Valid" options={options} state="Valid" legend="Selection confirmed" showLegend />
<Select label="Disabled" options={options} state="Disabled" />
<Select label="Read-only" options={options} state="Read-only" value="fr" />`;

  const optionsCode = `import { Select } from '@/design-system/components/Select';

const options = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
];

// With optional text
<Select label="Country" options={options} showOptional />

// With legend
<Select label="Country" options={options} legend="Select your country" showLegend />

// With left icon
<Select label="Country" options={options} showLeftIcon leftIcon="AIR_fleet" />

// With info icon
<Select label="Country" options={options} showInfo />`;

  const vselectCode = `import { VSelect } from '@/design-system/components/VSelect';

const options = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
];

// Vanilla Select (no Radix UI dependency)
<VSelect label="Country" options={options} size="M" />`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        Select
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Select components with two implementations: Select (Radix UI) and VSelect (Vanilla React).
      </p>

      {/* Implementation Type Tabs */}
      <div className="tabs-container" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '0', marginBottom: '16px' }}>
          <Tab
            label="Select (Radix UI)"
            size="M"
            status={componentType === 'select' ? 'Active' : 'Default'}
            onClick={() => setComponentType('select')}
          />
          <Tab
            label="VSelect (Vanilla)"
            size="M"
            status={componentType === 'vselect' ? 'Active' : 'Default'}
            onClick={() => setComponentType('vselect')}
          />
        </div>
      </div>

      {/* Main Tabs */}
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
            <div className="select-examples">
              {componentType === 'select' ? (
                <>
                  <Select label="Size XS" options={countryOptions} size="XS" value={selectValue} onValueChange={setSelectValue} />
                  <Select label="Size S" options={countryOptions} size="S" value={selectValue} onValueChange={setSelectValue} />
                  <Select label="Size M" options={countryOptions} size="M" value={selectValue} onValueChange={setSelectValue} />
                  <Select label="Size L" options={countryOptions} size="L" value={selectValue} onValueChange={setSelectValue} />
                </>
              ) : (
                <>
                  <VSelect label="Size XS" options={countryOptions} size="XS" value={vselectValue} onChange={setVselectValue} />
                  <VSelect label="Size S" options={countryOptions} size="S" value={vselectValue} onChange={setVselectValue} />
                  <VSelect label="Size M" options={countryOptions} size="M" value={vselectValue} onChange={setVselectValue} />
                  <VSelect label="Size L" options={countryOptions} size="L" value={vselectValue} onChange={setVselectValue} />
                </>
              )}
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
            <div className="select-examples">
              {componentType === 'select' ? (
                <>
                  <Select label="Default" options={countryOptions} state="Default" />
                  <Select label="Error" options={countryOptions} state="Error" legend="This field is required" showLegend />
                  <Select label="Valid" options={countryOptions} state="Valid" legend="Selection confirmed" showLegend />
                  <Select label="Disabled" options={countryOptions} state="Disabled" />
                  <Select label="Read-only" options={countryOptions} state="Read-only" value="fr" />
                </>
              ) : (
                <>
                  <VSelect label="Default" options={countryOptions} state="Default" />
                  <VSelect label="Error" options={countryOptions} state="Error" legend="This field is required" showLegend />
                  <VSelect label="Valid" options={countryOptions} state="Valid" legend="Selection confirmed" showLegend />
                  <VSelect label="Disabled" options={countryOptions} state="Disabled" />
                  <VSelect label="Read-only" options={countryOptions} state="Read-only" value="fr" />
                </>
              )}
            </div>
          </section>

          {/* Options */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Options
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('options')}
              />
            </div>
            <div className="select-showcase">
              <div className="select-group">
                <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>With optional text</h3>
                <div className="select-examples">
                  {componentType === 'select' ? (
                    <Select label="Country" options={countryOptions} showOptional />
                  ) : (
                    <VSelect label="Country" options={countryOptions} showOptional />
                  )}
                </div>
              </div>

              <div className="select-group">
                <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>With legend</h3>
                <div className="select-examples">
                  {componentType === 'select' ? (
                    <Select label="Country" options={countryOptions} legend="Select your country" showLegend />
                  ) : (
                    <VSelect label="Country" options={countryOptions} legend="Select your country" showLegend />
                  )}
                </div>
              </div>

              <div className="select-group">
                <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>With left icon</h3>
                <div className="select-examples">
                  {componentType === 'select' ? (
                    <Select label="Country" options={countryOptions} showLeftIcon leftIcon="AIR_fleet" />
                  ) : (
                    <VSelect label="Country" options={countryOptions} showLeftIcon leftIcon="AIR_fleet" />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Section */}
          {componentType === 'select' && (
            <section className="component-section">
              <div className="section-header">
                <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                  Select vs VSelect
                </h2>
                <Button
                  label="Code"
                  leftIcon="code"
                  size="S"
                  variant="Outlined"
                  onClick={() => setOpenModal('vselect')}
                />
              </div>
              <div className="comparison-box">
                <p className="label-regular-m" style={{ marginBottom: '12px' }}>
                  <strong>Select</strong> uses Radix UI for better accessibility and keyboard navigation.
                </p>
                <p className="label-regular-m" style={{ marginBottom: '12px' }}>
                  <strong>VSelect</strong> is a vanilla React implementation with no external dependencies (except React).
                </p>
                <p className="label-regular-m">
                  Both components have the same API and visual appearance. Choose based on your needs.
                </p>
              </div>
            </section>
          )}
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
                  <td><code>'Label'</code></td>
                  <td>Select label text</td>
                </tr>
                <tr>
                  <td><code>legend</code></td>
                  <td><code>string</code></td>
                  <td><code>'Legend'</code></td>
                  <td>Helper text below select</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td><code>string</code></td>
                  <td><code>'Select an option'</code></td>
                  <td>Placeholder text</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'XS' | 'S' | 'M' | 'L'</code></td>
                  <td><code>'M'</code></td>
                  <td>Select size</td>
                </tr>
                <tr>
                  <td><code>state</code></td>
                  <td><code>'Default' | 'Hover' | 'Active' | 'Disabled' | 'Error' | 'Valid' | 'Read-only'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Select state</td>
                </tr>
                <tr>
                  <td><code>showLabel</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show label</td>
                </tr>
                <tr>
                  <td><code>showLegend</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show legend</td>
                </tr>
                <tr>
                  <td><code>showOptional</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show "(Optional)" text</td>
                </tr>
                <tr>
                  <td><code>showInfo</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show info icon</td>
                </tr>
                <tr>
                  <td><code>showLeftIcon</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show left icon</td>
                </tr>
                <tr>
                  <td><code>leftIcon</code></td>
                  <td><code>string</code></td>
                  <td><code>'AIR_fleet'</code></td>
                  <td>Left icon name</td>
                </tr>
                <tr>
                  <td><code>options</code></td>
                  <td><code>{'SelectOption[]'}</code></td>
                  <td><code>[]</code></td>
                  <td>Array of options</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Selected value</td>
                </tr>
                <tr>
                  <td><code>onValueChange</code> (Select)<br/><code>onChange</code> (VSelect)</td>
                  <td><code>(value: string) =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Value change callback</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modals */}
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
        isOpen={openModal === 'options'}
        onClose={() => setOpenModal(null)}
        title="Options Implementation"
        code={optionsCode}
      />
      <CodeModal
        isOpen={openModal === 'vselect'}
        onClose={() => setOpenModal(null)}
        title="VSelect Implementation"
        code={vselectCode}
      />
    </div>
  );
}
