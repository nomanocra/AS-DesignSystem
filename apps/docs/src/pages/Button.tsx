import { useState } from 'react';
import { Button } from '@as-design-system/core';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Button.css';

export default function ButtonPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const variantsCode = `import { Button } from '@as-design-system/core';
import '@as-design-system/core/Button.css';

// Enabled
<Button label="Default" variant="Default" size="M" />
<Button label="Outlined" variant="Outlined" size="M" />
<Button label="Ghost" variant="Ghost" size="M" />

// Disabled
<Button label="Default" variant="Default" size="M" disabled />
<Button label="Outlined" variant="Outlined" size="M" disabled />
<Button label="Ghost" variant="Ghost" size="M" disabled />`;

  const sizesCode = `import { Button } from '@as-design-system/core';
import '@as-design-system/core/Button.css';

<Button label="Size XS" size="XS" variant="Default" />
<Button label="Size S" size="S" variant="Default" />
<Button label="Size M" size="M" variant="Default" />
<Button label="Size L" size="L" variant="Default" />
<Button label="Size XL" size="XL" variant="Default" />`;

  const iconsCode = `import { Button } from '@as-design-system/core';
import '@as-design-system/core/Button.css';

// Left icon
<Button label="Add" leftIcon="add" size="M" variant="Default" />
<Button label="Delete" leftIcon="delete" size="M" variant="Outlined" />
<Button label="Construction" leftIcon="construction" size="M" variant="Ghost" />

// Right icon
<Button label="Next" rightIcon="keyboard_arrow_down" size="M" variant="Default" />
<Button label="Up" rightIcon="keyboard_arrow_up" size="M" variant="Outlined" />

// Both icons
<Button label="Action" leftIcon="add" rightIcon="keyboard_arrow_down" size="M" variant="Default" />`;


  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        Button
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '32px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Le composant Button permet de créer des boutons avec différentes tailles, états et variantes.
      </p>

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
        <div className="button-examples">
          <Button label="Default" variant="Default" size="M" />
          <Button label="Outlined" variant="Outlined" size="M" />
          <Button label="Ghost" variant="Ghost" size="M" />
          <Button label="Default Disabled" variant="Default" size="M" disabled />
          <Button label="Outlined Disabled" variant="Outlined" size="M" disabled />
          <Button label="Ghost Disabled" variant="Ghost" size="M" disabled />
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
        <div className="button-examples">
          <Button label="Size XS" size="XS" variant="Default" />
          <Button label="Size S" size="S" variant="Default" />
          <Button label="Size M" size="M" variant="Default" />
          <Button label="Size L" size="L" variant="Default" />
          <Button label="Size XL" size="XL" variant="Default" />
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
        <div className="button-showcase">
          <div className="button-group">
            <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Left icon</h3>
            <div className="button-examples">
              <Button label="Add" leftIcon="add" size="M" variant="Default" />
              <Button label="Delete" leftIcon="delete" size="M" variant="Outlined" />
              <Button label="Construction" leftIcon="construction" size="M" variant="Ghost" />
            </div>
          </div>

          <div className="button-group">
            <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Right icon</h3>
            <div className="button-examples">
              <Button label="Next" rightIcon="keyboard_arrow_down" size="M" variant="Default" />
              <Button label="Up" rightIcon="keyboard_arrow_up" size="M" variant="Outlined" />
            </div>
          </div>

          <div className="button-group">
            <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Both icons</h3>
            <div className="button-examples">
              <Button label="Action" leftIcon="add" rightIcon="keyboard_arrow_down" size="M" variant="Default" />
            </div>
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
                <td><code>label</code></td>
                <td><code>string</code></td>
                <td><code>'BUTTON LABEL'</code></td>
                <td>Button text</td>
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
                <td>Disables the button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

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
        isOpen={openModal === 'icons'}
        onClose={() => setOpenModal(null)}
        title="Icons Implementation"
        code={iconsCode}
      />
    </div>
  );
}


