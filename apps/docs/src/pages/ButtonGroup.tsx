import { useState } from 'react';
import { ButtonGroup, Button, Tab } from '@as-design-system/core';
import '@as-design-system/core/ButtonGroup.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/Tab.css';
import CodeModal from '../components/CodeModal';
import './ButtonGroup.css';

export default function ButtonGroupPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  // Demo states
  const [horizontalValue, setHorizontalValue] = useState('option1');
  const [horizontalIconValue, setHorizontalIconValue] = useState('add');
  const [horizontalIconLabelValue, setHorizontalIconLabelValue] = useState('add');
  const [verticalValue, setVerticalValue] = useState('option1');
  const [verticalIconValue, setVerticalIconValue] = useState('add');
  const [verticalIconLabelValue, setVerticalIconLabelValue] = useState('add');
  const [sizeSValue, setSizeSValue] = useState('option1');
  const [sizeMValue, setSizeMValue] = useState('option1');
  const [sizeLValue, setSizeLValue] = useState('option1');
  const [sizeXlValue, setSizeXlValue] = useState('option1');
  const [disabledValue, setDisabledValue] = useState('option1');

  const horizontalCode = `import { useState } from 'react';
import { ButtonGroup } from '@as-design-system/core';

function Example() {
  const [value, setValue] = useState('option1');

  return (
    <>
      {/* Text only */}
      <ButtonGroup
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        value={value}
        onChange={setValue}
        layout="horizontal"
      />

      {/* Icon only */}
      <ButtonGroup
        options={[
          { value: 'add', iconName: 'add' },
          { value: 'delete', iconName: 'delete' },
          { value: 'code', iconName: 'code' },
        ]}
        value={iconValue}
        onChange={setIconValue}
        layout="horizontal"
      />

      {/* Icon with label */}
      <ButtonGroup
        options={[
          { value: 'add', iconName: 'add', label: 'Add' },
          { value: 'delete', iconName: 'delete', label: 'Delete' },
        ]}
        value={iconLabelValue}
        onChange={setIconLabelValue}
        layout="horizontal"
      />
    </>
  );
}`;

  const verticalCode = `import { useState } from 'react';
import { ButtonGroup } from '@as-design-system/core';

function Example() {
  const [value, setValue] = useState('option1');

  return (
    <>
      {/* Text only */}
      <ButtonGroup
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        value={value}
        onChange={setValue}
        layout="vertical"
      />

      {/* Icon only */}
      <ButtonGroup
        options={[
          { value: 'add', iconName: 'add' },
          { value: 'delete', iconName: 'delete' },
          { value: 'code', iconName: 'code' },
        ]}
        value={iconValue}
        onChange={setIconValue}
        layout="vertical"
      />

      {/* Icon with label */}
      <ButtonGroup
        options={[
          { value: 'add', iconName: 'add', label: 'Add' },
          { value: 'delete', iconName: 'delete', label: 'Delete' },
        ]}
        value={iconLabelValue}
        onChange={setIconLabelValue}
        layout="vertical"
      />
    </>
  );
}`;

  const sizesCode = `import { useState } from 'react';
import { ButtonGroup } from '@as-design-system/core';

function Example() {
  const [value, setValue] = useState('option1');

  return (
    <>
      <ButtonGroup
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
        value={value}
        onChange={setValue}
        size="S"
      />

      <ButtonGroup
        options={[...]}
        value={value}
        onChange={setValue}
        size="M"
      />

      <ButtonGroup
        options={[...]}
        value={value}
        onChange={setValue}
        size="L"
      />

      <ButtonGroup
        options={[...]}
        value={value}
        onChange={setValue}
        size="XL"
      />
    </>
  );
}`;

  const disabledCode = `import { useState } from 'react';
import { ButtonGroup } from '@as-design-system/core';

function Example() {
  const [value, setValue] = useState('option1');

  return (
    <>
      {/* Individual disabled option */}
      <ButtonGroup
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2', disabled: true },
          { value: 'option3', label: 'Option 3' },
        ]}
        value={value}
        onChange={setValue}
      />

      {/* Entire group disabled */}
      <ButtonGroup
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
        value={value}
        onChange={setValue}
        disabled
      />
    </>
  );
}`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        ButtonGroup
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-60, #63728a))' }}>
        A group of toggle buttons where one option can be selected at a time. Uses Button and IconButton components internally.
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
          {/* Horizontal Layout */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Horizontal
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('horizontal')}
              />
            </div>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary, var(--cool-grey-60, #63728a))' }}>
              Buttons are laid out horizontally and fit their content width.
            </p>
            <div className="button-group-examples">
              <div className="button-group-example-row">
                <span className="example-label">Text only:</span>
                <ButtonGroup
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                  value={horizontalValue}
                  onChange={setHorizontalValue}
                  layout="horizontal"
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">Icon only:</span>
                <ButtonGroup
                  options={[
                    { value: 'add', iconName: 'add' },
                    { value: 'delete', iconName: 'delete' },
                    { value: 'code', iconName: 'code' },
                  ]}
                  value={horizontalIconValue}
                  onChange={setHorizontalIconValue}
                  layout="horizontal"
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">Icon + label:</span>
                <ButtonGroup
                  options={[
                    { value: 'add', iconName: 'add', label: 'Add' },
                    { value: 'delete', iconName: 'delete', label: 'Delete' },
                  ]}
                  value={horizontalIconLabelValue}
                  onChange={setHorizontalIconLabelValue}
                  layout="horizontal"
                />
              </div>
            </div>
          </section>

          {/* Vertical Layout */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Vertical
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('vertical')}
              />
            </div>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary, var(--cool-grey-60, #63728a))' }}>
              Buttons are stacked vertically and fill the width of the container.
            </p>
            <div className="button-group-examples">
              <div className="button-group-example-row">
                <span className="example-label">Text only:</span>
                <ButtonGroup
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Very Long Option' },
                  ]}
                  value={verticalValue}
                  onChange={setVerticalValue}
                  layout="vertical"
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">Icon only:</span>
                <ButtonGroup
                  options={[
                    { value: 'add', iconName: 'add' },
                    { value: 'delete', iconName: 'delete' },
                    { value: 'code', iconName: 'code' },
                  ]}
                  value={verticalIconValue}
                  onChange={setVerticalIconValue}
                  layout="vertical"
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">Icon + label:</span>
                <ButtonGroup
                  options={[
                    { value: 'add', iconName: 'add', label: 'Add' },
                    { value: 'delete', iconName: 'delete', label: 'Delete' },
                  ]}
                  value={verticalIconLabelValue}
                  onChange={setVerticalIconLabelValue}
                  layout="vertical"
                />
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
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary, var(--cool-grey-60, #63728a))' }}>
              The size prop controls the size of all buttons in the group.
            </p>
            <div className="button-group-examples">
              <div className="button-group-example-row">
                <span className="example-label">S:</span>
                <ButtonGroup
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                  value={sizeSValue}
                  onChange={setSizeSValue}
                  size="S"
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">M (default):</span>
                <ButtonGroup
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                  value={sizeMValue}
                  onChange={setSizeMValue}
                  size="M"
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">L:</span>
                <ButtonGroup
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                  value={sizeLValue}
                  onChange={setSizeLValue}
                  size="L"
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">XL:</span>
                <ButtonGroup
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                  value={sizeXlValue}
                  onChange={setSizeXlValue}
                  size="XL"
                />
              </div>
            </div>
          </section>

          {/* Disabled */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Disabled
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('disabled')}
              />
            </div>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary, var(--cool-grey-60, #63728a))' }}>
              Individual options or the entire group can be disabled.
            </p>
            <div className="button-group-examples">
              <div className="button-group-example-row">
                <span className="example-label">Disabled option:</span>
                <ButtonGroup
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2', disabled: true },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                  value={disabledValue}
                  onChange={setDisabledValue}
                />
              </div>
              <div className="button-group-example-row">
                <span className="example-label">Disabled group:</span>
                <ButtonGroup
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                  value="option1"
                  onChange={() => {}}
                  disabled
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
                  <td><code>layout</code></td>
                  <td><code>'horizontal' | 'vertical'</code></td>
                  <td><code>'horizontal'</code></td>
                  <td>Layout direction of the buttons</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'S' | 'M' | 'L' | 'XL'</code></td>
                  <td><code>'M'</code></td>
                  <td>Size of the ButtonGroup (matches Button height of same size)</td>
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
                  <td>Display label (optional if iconName is provided)</td>
                </tr>
                <tr>
                  <td><code>iconName</code></td>
                  <td><code>IconName</code></td>
                  <td>Icon to display (optional, can be used alone or with label)</td>
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
        isOpen={openModal === 'horizontal'}
        onClose={() => setOpenModal(null)}
        title="Horizontal Layout"
        code={horizontalCode}
      />
      <CodeModal
        isOpen={openModal === 'vertical'}
        onClose={() => setOpenModal(null)}
        title="Vertical Layout"
        code={verticalCode}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'disabled'}
        onClose={() => setOpenModal(null)}
        title="Disabled States"
        code={disabledCode}
      />
    </div>
  );
}
