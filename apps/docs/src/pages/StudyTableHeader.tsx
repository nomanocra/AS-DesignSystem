import { useState } from 'react';
import { StudyTableHeader, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/StudyTableHeader.css';
import '@as-designsystem/core/Checkbox.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './StudyTableHeader.css';

export default function StudyTableHeaderPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [allSelected, setAllSelected] = useState(false);
  const [someSelected, setSomeSelected] = useState(false);

  const basicCode = `import { StudyTableHeader } from '@/design-system/components/StudyTableHeader';

<StudyTableHeader
  columns={[
    { key: 'name', label: 'Name', align: 'left' },
    { key: 'description', label: 'Description', align: 'left' },
    { key: 'author', label: 'Author', align: 'left' },
    { key: 'date', label: 'Created', align: 'right' },
  ]}
/>`;

  const withCheckboxCode = `import { StudyTableHeader } from '@/design-system/components/StudyTableHeader';

<StudyTableHeader
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
  ]}
  selectable
  allSelected={allSelected}
  someSelected={someSelected}
  onSelectAllChange={(selected) => setAllSelected(selected)}
/>`;

  const withActionsCode = `import { StudyTableHeader } from '@/design-system/components/StudyTableHeader';

<StudyTableHeader
  columns={[
    { key: 'name', label: 'Study Name' },
    { key: 'status', label: 'Status' },
  ]}
  showActionsColumn
/>`;

  const columnSizingCode = `import { StudyTableHeader } from '@/design-system/components/StudyTableHeader';

// Mix fixed widths and flex proportional columns
<StudyTableHeader
  columns={[
    { key: 'name', label: 'Name', width: '200px' },
    { key: 'description', label: 'Description', flex: 2 },
    { key: 'author', label: 'Author', flex: 1 },
    { key: 'date', label: 'Created', width: '120px', align: 'right' },
  ]}
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          StudyTableHeader
        </h1>
        <InstallCommand componentName="study-table-header" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Table header row for study lists with configurable columns, optional select-all checkbox, and status column.
      </p>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="example-container">
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
      </div>

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <>
          {/* Basic */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Basic
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="example-container">
              <div className="study-table-header-demo">
                <StudyTableHeader
                  columns={[
                    { key: 'name', label: 'Name', align: 'left' },
                    { key: 'description', label: 'Description', align: 'left' },
                    { key: 'author', label: 'Author', align: 'left' },
                    { key: 'date', label: 'Created', align: 'right' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* With Checkbox */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                With Select All
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('withCheckbox')}
              />
            </div>
            <div className="example-container">
              <div className="study-table-header-demo">
                <StudyTableHeader
                  columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'description', label: 'Description' },
                  ]}
                  selectable
                  allSelected={allSelected}
                  someSelected={someSelected}
                  onSelectAllChange={(selected) => {
                    setAllSelected(selected);
                    setSomeSelected(false);
                  }}
                />
                <div style={{ padding: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={someSelected}
                      onChange={(e) => {
                        setSomeSelected(e.target.checked);
                        setAllSelected(false);
                      }}
                    />
                    {' '}Toggle "some selected" (indeterminate) state
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* With Actions Column */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                With Actions Column
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('withActions')}
              />
            </div>
            <div className="example-container">
              <div className="study-table-header-demo">
                <StudyTableHeader
                  columns={[
                    { key: 'name', label: 'Study Name' },
                    { key: 'status', label: 'Status' },
                  ]}
                  showActionsColumn
                />
              </div>
            </div>
          </section>

          {/* Column Sizing */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Column Sizing
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('columnSizing')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Columns support fixed widths and flex proportional sizing. Use <code>width</code> for a fixed size (e.g. '200px') or <code>flex</code> for a proportional grow factor. By default, all columns use <code>flex: 1</code>.
            </p>
            <div className="example-container">
              <div className="study-table-header-demo">
                <StudyTableHeader
                  columns={[
                    { key: 'name', label: 'Name', width: '200px' },
                    { key: 'description', label: 'Description', flex: 2 },
                    { key: 'author', label: 'Author', flex: 1 },
                    { key: 'date', label: 'Created', width: '120px', align: 'right' },
                  ]}
                />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <section className="props-section">
          <h2
            className="heading-6"
            style={{
              marginTop: '32px',
              marginBottom: '16px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            Props
          </h2>
          <table className="props-table">
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
                <td><code>columns</code></td>
                <td><code>StudyTableHeaderColumn[]</code></td>
                <td>-</td>
                <td>Column headers (required)</td>
              </tr>
              <tr>
                <td><code>selectable</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Show select-all checkbox</td>
              </tr>
              <tr>
                <td><code>allSelected</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>All items selected state</td>
              </tr>
              <tr>
                <td><code>someSelected</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Some (not all) items selected</td>
              </tr>
              <tr>
                <td><code>onSelectAllChange</code></td>
                <td><code>(selected: boolean) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when select all changes</td>
              </tr>
              <tr>
                <td><code>selectionMode</code></td>
                <td><code>'always' | 'hover'</code></td>
                <td><code>'always'</code></td>
                <td>When the select-all checkbox is visible. <code>'hover'</code> only reveals it on header hover/focus, or when a selection is in progress. Mirrors the same prop on <code>StudyRow</code>. Ignored if <code>selectable</code> is false.</td>
              </tr>
              <tr>
                <td><code>selectionActive</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Whether at least one row of the table is selected. Redundant when <code>allSelected</code> or <code>someSelected</code> is already true.</td>
              </tr>
              <tr>
                <td><code>showStatusColumn</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Show status column header</td>
              </tr>
              <tr>
                <td><code>showActionsColumn</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Show actions column placeholder</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td><code>''</code></td>
                <td>Additional CSS class</td>
              </tr>
            </tbody>
          </table>

          <h3
            className="heading-6"
            style={{
              marginTop: '24px',
              marginBottom: '12px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            StudyTableHeaderColumn
          </h3>
          <table className="props-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>key</code></td>
                <td><code>string</code></td>
                <td>Unique key for the column</td>
              </tr>
              <tr>
                <td><code>label</code></td>
                <td><code>string</code></td>
                <td>Column header text</td>
              </tr>
              <tr>
                <td><code>align</code></td>
                <td><code>'left' | 'center' | 'right'</code></td>
                <td>Text alignment (default: 'left')</td>
              </tr>
              <tr>
                <td><code>width</code></td>
                <td><code>string</code></td>
                <td>Fixed width (e.g. '200px', '30%'). Disables flex.</td>
              </tr>
              <tr>
                <td><code>flex</code></td>
                <td><code>number</code></td>
                <td>Flex grow factor (default: 1)</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Basic"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'withCheckbox'}
        onClose={() => setOpenModal(null)}
        title="With Select All"
        code={withCheckboxCode}
      />
      <CodeModal
        isOpen={openModal === 'withActions'}
        onClose={() => setOpenModal(null)}
        title="With Actions Column"
        code={withActionsCode}
      />
      <CodeModal
        isOpen={openModal === 'columnSizing'}
        onClose={() => setOpenModal(null)}
        title="Column Sizing"
        code={columnSizingCode}
      />
    </div>
  );
}
