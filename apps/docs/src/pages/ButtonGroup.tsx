import { useState } from 'react';
import { ButtonGroup, Button, Tab } from '@as-design-system/core';
import '@as-design-system/core/ButtonGroup.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/Tab.css';
import CodeModal from '../components/CodeModal';
import './ButtonGroup.css';

export default function ButtonGroupPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  // Demo states
  const [basicValue, setBasicValue] = useState('option1');
  const [alignValue, setAlignValue] = useState('left');
  const [viewValue, setViewValue] = useState('day');

  const basicCode = `import { useState } from 'react';
import { ButtonGroup } from '@/design-system/components/ButtonGroup';

function Example() {
  const [value, setValue] = useState('option1');

  return (
    <ButtonGroup
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}`;

  const disabledCode = `import { ButtonGroup } from '@/design-system/components/ButtonGroup';

// Disabled individual option
<ButtonGroup
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B', disabled: true },
    { value: 'c', label: 'Option C' },
  ]}
  value="a"
  onChange={setValue}
/>

// Disabled entire group
<ButtonGroup
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
  value="a"
  onChange={setValue}
  disabled
/>`;

  const useCasesCode = `import { ButtonGroup } from '@/design-system/components/ButtonGroup';

// Text alignment
<ButtonGroup
  options={[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ]}
  value={alignValue}
  onChange={setAlignValue}
/>

// Calendar view
<ButtonGroup
  options={[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ]}
  value={viewValue}
  onChange={setViewValue}
/>`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        ButtonGroup
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-60, #63728a))' }}>
        A group of toggle buttons where one option can be selected at a time.
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
          {/* Basic Usage */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Basic Usage
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="button-group-examples">
              <ButtonGroup
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
                value={basicValue}
                onChange={setBasicValue}
              />
            </div>
          </section>

          {/* Disabled States */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Disabled States
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('disabled')}
              />
            </div>
            <div className="button-group-examples">
              <div className="button-group-example-row">
                <span className="example-label">Disabled option:</span>
                <ButtonGroup
                  options={[
                    { value: 'a', label: 'Option A' },
                    { value: 'b', label: 'Option B', disabled: true },
                    { value: 'c', label: 'Option C' },
                  ]}
                  value="a"
                  onChange={() => {}}
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">Disabled group:</span>
                <ButtonGroup
                  options={[
                    { value: 'a', label: 'Option A' },
                    { value: 'b', label: 'Option B' },
                  ]}
                  value="a"
                  onChange={() => {}}
                  disabled
                />
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Use Cases
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('usecases')}
              />
            </div>
            <div className="button-group-examples">
              <div className="button-group-example-row">
                <span className="example-label">Text alignment:</span>
                <ButtonGroup
                  options={[
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' },
                  ]}
                  value={alignValue}
                  onChange={setAlignValue}
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">Calendar view:</span>
                <ButtonGroup
                  options={[
                    { value: 'day', label: 'Day' },
                    { value: 'week', label: 'Week' },
                    { value: 'month', label: 'Month' },
                    { value: 'year', label: 'Year' },
                  ]}
                  value={viewValue}
                  onChange={setViewValue}
                />
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

          <h3 className="label-bold-m" style={{ marginTop: '24px', marginBottom: '12px', color: 'var(--text-main)' }}>
            ButtonGroup
          </h3>
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
                  <td><code>options</code></td>
                  <td><code>ButtonGroupOption[]</code></td>
                  <td>Required</td>
                  <td>Array of options to display</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><code>string</code></td>
                  <td>Required</td>
                  <td>Currently selected value</td>
                </tr>
                <tr>
                  <td><code>onChange</code></td>
                  <td><code>(value: string) =&gt; void</code></td>
                  <td>Required</td>
                  <td>Callback when selection changes</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disable all buttons</td>
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

          <h3 className="label-bold-m" style={{ marginTop: '24px', marginBottom: '12px', color: 'var(--text-main)' }}>
            ButtonGroupOption
          </h3>
          <div className="props-table">
            <table>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>value</code></td>
                  <td><code>string</code></td>
                  <td>Unique identifier for the option</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td>Display label for the button</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td>Whether the option is disabled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Basic Usage"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'disabled'}
        onClose={() => setOpenModal(null)}
        title="Disabled States"
        code={disabledCode}
      />
      <CodeModal
        isOpen={openModal === 'usecases'}
        onClose={() => setOpenModal(null)}
        title="Use Cases"
        code={useCasesCode}
      />
    </div>
  );
}
