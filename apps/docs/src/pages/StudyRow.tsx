import { useState } from 'react';
import { StudyRow, StudyTableHeader, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/StudyRow.css';
import '@as-designsystem/core/StudyTableHeader.css';
import '@as-designsystem/core/StudyStatus.css';
import '@as-designsystem/core/Checkbox.css';
import '@as-designsystem/core/IconButton.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/Spinner.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Tooltip.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './StudyRow.css';

export default function StudyRowPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Demo data for the hover-revealed checkbox example
  const hoverStudies = [
    { id: 'a', status: 'Computed' as const, name: 'A320 Fleet Analysis', description: 'Fleet performance review' },
    { id: 'b', status: 'Computing' as const, name: 'Route Optimization', description: 'Network route analysis' },
    { id: 'c', status: 'Draft' as const, name: 'Maintenance Planning', description: 'Annual maintenance schedule' },
    { id: 'd', status: 'Failed' as const, name: 'Fuel Burn Study', description: 'Error during computation' },
  ];
  const [hoverSelection, setHoverSelection] = useState<Record<string, boolean>>({});
  const hoverSelectedCount = hoverStudies.filter((s) => hoverSelection[s.id]).length;
  const hoverAnySelected = hoverSelectedCount > 0;
  const hoverAllSelected = hoverSelectedCount === hoverStudies.length;

  const basicCode = `import { StudyRow } from '@/design-system/components/StudyRow';

<StudyRow
  status="Computed"
  columns={[
    { key: 'name', value: 'Flight Analysis 2024' },
    { key: 'description', value: 'Comprehensive flight performance study' },
    { key: 'author', value: 'John Doe' },
    { key: 'date', value: '2024-01-15', align: 'right' },
  ]}
/>`;

  const withCheckboxCode = `import { StudyRow } from '@/design-system/components/StudyRow';

<StudyRow
  status="Computing"
  columns={[
    { key: 'name', value: 'Network Optimization' },
    { key: 'description', value: 'Route optimization analysis' },
  ]}
  selectable
  selected={isSelected}
  onSelectionChange={(selected) => setIsSelected(selected)}
/>`;

  const hoverCheckboxCode = `import { useState } from 'react';
import { StudyTableHeader } from '@/design-system/components/StudyTableHeader';
import { StudyRow } from '@/design-system/components/StudyRow';

const studies = [
  { id: 'a', status: 'Computed', name: 'A320 Fleet Analysis' },
  { id: 'b', status: 'Computing', name: 'Route Optimization' },
  { id: 'c', status: 'Draft', name: 'Maintenance Planning' },
];

const [selection, setSelection] = useState<Record<string, boolean>>({});

// The parent owns the selection state, so it computes the table-wide flags
const selectedIds = studies.filter((s) => selection[s.id]);
const anySelected = selectedIds.length > 0;
const allSelected = selectedIds.length === studies.length;

<StudyTableHeader
  columns={[{ key: 'name', label: 'Name' }]}
  selectable
  selectionMode="hover"
  selectionActive={anySelected}
  allSelected={allSelected}
  someSelected={anySelected && !allSelected}
  onSelectAllChange={(value) =>
    setSelection(Object.fromEntries(studies.map((s) => [s.id, value])))
  }
/>

{studies.map((study) => (
  <StudyRow
    key={study.id}
    status={study.status}
    columns={[{ key: 'name', value: study.name }]}
    selectable
    selectionMode="hover"
    selectionActive={anySelected}
    selected={!!selection[study.id]}
    onSelectionChange={(value) =>
      setSelection((prev) => ({ ...prev, [study.id]: value }))
    }
  />
))}`;

  const withActionsCode = `import { StudyRow } from '@/design-system/components/StudyRow';

<StudyRow
  status="Computed"
  columns={[
    { key: 'name', value: 'Maintenance Planning' },
    { key: 'description', value: 'Annual maintenance schedule' },
  ]}
  showMoreOptions
  onMoreOptionsClick={(e) => console.log('More options clicked')}
/>`;

  const allStatesCode = `import { StudyRow } from '@/design-system/components/StudyRow';

<StudyRow status="Computed" columns={[...]} />
<StudyRow status="Computing" columns={[...]} />
<StudyRow status="Failed" columns={[...]} />
<StudyRow status="Draft" columns={[...]} />
<StudyRow status="Warning" columns={[...]} />`;

  const columnSizingCode = `import { StudyRow } from '@/design-system/components/StudyRow';

// Mix fixed widths and flex proportional columns
<StudyRow
  status="Computed"
  columns={[
    { key: 'name', value: 'Flight Analysis 2024', width: '200px' },
    { key: 'description', value: 'Comprehensive flight performance study', flex: 2 },
    { key: 'author', value: 'John Doe', flex: 1 },
    { key: 'date', value: '2024-01-15', width: '120px', align: 'right' },
  ]}
/>`;

  const statusTooltipCode = `import { StudyRow } from '@/design-system/components/StudyRow';

// With statusLabel and statusTooltip
<StudyRow
  status="Draft"
  statusLabel="2 Draft"
  statusTooltip={
    <div>
      <div>Flight Analysis — Draft</div>
      <div>Network Optimization — Draft</div>
    </div>
  }
  columns={[
    { key: 'name', value: 'Multi-Study Batch' },
    { key: 'description', value: 'Grouped studies overview' },
  ]}
/>`;

  const tooltipPositionCode = `import { StudyRow } from '@/design-system/components/StudyRow';

// Default position: side="right", align="center"
<StudyRow
  status="Draft"
  statusLabel="2 Draft"
  statusTooltip={<div>Tooltip on the right (default)</div>}
  columns={[{ key: 'name', value: 'Default position' }]}
/>

// Tooltip below the status, left-aligned with it
<StudyRow
  status="Computed"
  statusLabel="3 Computed"
  statusTooltip={<div>Tooltip below, start-aligned</div>}
  statusTooltipSide="bottom"
  statusTooltipAlign="start"
  columns={[{ key: 'name', value: 'Bottom + start' }]}
/>

// Tooltip above the status, end-aligned
<StudyRow
  status="Warning"
  statusLabel="1 Warning"
  statusTooltip={<div>Tooltip above, end-aligned</div>}
  statusTooltipSide="top"
  statusTooltipAlign="end"
  columns={[{ key: 'name', value: 'Top + end' }]}
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          StudyRow
        </h1>
        <InstallCommand componentName="study-row" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Table row for displaying study information with status, configurable columns, optional checkbox, and hover-revealed actions.
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
              <div className="study-row-demo">
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Flight Analysis 2024' },
                    { key: 'description', value: 'Comprehensive flight performance study' },
                    { key: 'author', value: 'John Doe' },
                    { key: 'date', value: '2024-01-15', align: 'right' },
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
                With Checkbox
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
              <div className="study-row-demo">
                <StudyRow
                  status="Computing"
                  columns={[
                    { key: 'name', value: 'Network Optimization' },
                    { key: 'description', value: 'Route optimization analysis' },
                    { key: 'author', value: 'Jane Smith' },
                  ]}
                  selectable
                  selected={selectedRows['row1']}
                  onSelectionChange={() => toggleRow('row1')}
                />
              </div>
            </div>
          </section>

          {/* Checkbox Revealed on Hover */}
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
                Checkbox Revealed on Hover
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('hoverCheckbox')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Set <code>selectionMode="hover"</code> to keep the interface light: the checkbox only appears when the row is hovered or focused. Pass <code>selectionActive</code> (true as soon as one row is selected) so that <strong>every</strong> checkbox of the table stays visible while a selection is in progress — otherwise the user would have to hover each row to extend it. The checkbox column always reserves its width, so nothing shifts.
            </p>
            <div className="example-container">
              <div className="study-row-demo">
                <StudyTableHeader
                  columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'description', label: 'Description' },
                  ]}
                  selectable
                  selectionMode="hover"
                  selectionActive={hoverAnySelected}
                  allSelected={hoverAllSelected}
                  someSelected={hoverAnySelected && !hoverAllSelected}
                  onSelectAllChange={(value) =>
                    setHoverSelection(
                      Object.fromEntries(hoverStudies.map((s) => [s.id, value]))
                    )
                  }
                />
                {hoverStudies.map((study) => (
                  <StudyRow
                    key={study.id}
                    status={study.status}
                    columns={[
                      { key: 'name', value: study.name },
                      { key: 'description', value: study.description },
                    ]}
                    selectable
                    selectionMode="hover"
                    selectionActive={hoverAnySelected}
                    selected={!!hoverSelection[study.id]}
                    onSelectionChange={(value) =>
                      setHoverSelection((prev) => ({ ...prev, [study.id]: value }))
                    }
                  />
                ))}
              </div>
            </div>
          </section>

          {/* With Actions */}
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
                With More Options (hover to reveal)
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
              <div className="study-row-demo">
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Maintenance Planning' },
                    { key: 'description', value: 'Annual maintenance schedule' },
                  ]}
                  showMoreOptions
                  onMoreOptionsClick={() => console.log('More options clicked')}
                />
              </div>
            </div>
          </section>

          {/* All States */}
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
                Status States
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('allStates')}
              />
            </div>
            <div className="example-container">
              <div className="study-row-demo">
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Computed Study' },
                    { key: 'description', value: 'Successfully completed' },
                  ]}
                />
                <StudyRow
                  status="Computing"
                  columns={[
                    { key: 'name', value: 'Computing Study' },
                    { key: 'description', value: 'In progress...' },
                  ]}
                />
                <StudyRow
                  status="Failed"
                  columns={[
                    { key: 'name', value: 'Failed Study' },
                    { key: 'description', value: 'Error during computation' },
                  ]}
                />
                <StudyRow
                  status="Draft"
                  columns={[
                    { key: 'name', value: 'Draft Study' },
                    { key: 'description', value: 'Not yet computed' },
                  ]}
                />
                <StudyRow
                  status="Warning"
                  columns={[
                    { key: 'name', value: 'Warning Study' },
                    { key: 'description', value: 'Completed with warnings' },
                  ]}
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
              <div className="study-row-demo">
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Flight Analysis 2024', width: '200px' },
                    { key: 'description', value: 'Comprehensive flight performance study', flex: 2 },
                    { key: 'author', value: 'John Doe', flex: 1 },
                    { key: 'date', value: '2024-01-15', width: '120px', align: 'right' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Status Label & Tooltip */}
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
                Status Label & Tooltip
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('statusTooltip')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Use <code>statusLabel</code> to display a custom label next to the status icon, and <code>statusTooltip</code> to wrap the status in a tooltip with custom content. Hover the status to see the tooltip.
            </p>
            <div className="example-container">
              <div className="study-row-demo">
                <StudyRow
                  status="Draft"
                  statusLabel="2 Draft"
                  statusTooltip={
                    <div>
                      <div>Flight Analysis — Draft</div>
                      <div>Network Optimization — Draft</div>
                    </div>
                  }
                  columns={[
                    { key: 'name', value: 'Multi-Study Batch' },
                    { key: 'description', value: 'Grouped studies overview' },
                  ]}
                />
                <StudyRow
                  status="Computed"
                  statusLabel="3 Computed"
                  statusTooltip={
                    <div>
                      <div>Flight Analysis — Computed</div>
                      <div>Network Optimization — Computed</div>
                      <div>Maintenance Planning — Computed</div>
                    </div>
                  }
                  columns={[
                    { key: 'name', value: 'Completed Batch' },
                    { key: 'description', value: 'All studies computed' },
                  ]}
                />
                <StudyRow
                  status="Failed"
                  statusLabel="1 Failed"
                  columns={[
                    { key: 'name', value: 'Without Tooltip' },
                    { key: 'description', value: 'statusLabel without statusTooltip' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Status Tooltip Position */}
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
                Status Tooltip Position
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('tooltipPosition')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Use <code>statusTooltipSide</code> (<code>'top' | 'right' | 'bottom' | 'left'</code>) and <code>statusTooltipAlign</code> (<code>'start' | 'center' | 'end'</code>) to control where the tooltip appears. Defaults to <code>side="right"</code> and <code>align="center"</code>. Hover the status to see each placement.
            </p>
            <div className="example-container">
              <div className="study-row-demo">
                <StudyRow
                  status="Draft"
                  statusLabel="2 Draft"
                  statusTooltip={
                    <div>
                      <div>Flight Analysis — Draft</div>
                      <div>Network Optimization — Draft</div>
                    </div>
                  }
                  columns={[
                    { key: 'name', value: 'Default (right + center)' },
                    { key: 'description', value: 'No position props' },
                  ]}
                />
                <StudyRow
                  status="Computed"
                  statusLabel="3 Computed"
                  statusTooltip={
                    <div>
                      <div>Flight Analysis — Computed</div>
                      <div>Network Optimization — Computed</div>
                      <div>Maintenance Planning — Computed</div>
                    </div>
                  }
                  statusTooltipSide="bottom"
                  statusTooltipAlign="start"
                  columns={[
                    { key: 'name', value: 'Bottom + start' },
                    { key: 'description', value: 'side="bottom" align="start"' },
                  ]}
                />
                <StudyRow
                  status="Warning"
                  statusLabel="1 Warning"
                  statusTooltip={
                    <div>
                      <div>Flight Analysis — Warning</div>
                    </div>
                  }
                  statusTooltipSide="top"
                  statusTooltipAlign="end"
                  columns={[
                    { key: 'name', value: 'Top + end' },
                    { key: 'description', value: 'side="top" align="end"' },
                  ]}
                />
                <StudyRow
                  status="Computing"
                  statusLabel="2 Computing"
                  statusTooltip={
                    <div>
                      <div>Flight Analysis — Computing</div>
                      <div>Network Optimization — Computing</div>
                    </div>
                  }
                  statusTooltipSide="bottom"
                  statusTooltipAlign="center"
                  columns={[
                    { key: 'name', value: 'Bottom + center' },
                    { key: 'description', value: 'side="bottom" align="center"' },
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
                <td><code>status</code></td>
                <td><code>StudyStatusState</code></td>
                <td>-</td>
                <td>Study status (required)</td>
              </tr>
              <tr>
                <td><code>statusLabel</code></td>
                <td><code>string</code></td>
                <td>-</td>
                <td>Custom label next to the status icon (e.g. "2 Draft")</td>
              </tr>
              <tr>
                <td><code>statusTooltip</code></td>
                <td><code>React.ReactNode</code></td>
                <td>-</td>
                <td>Custom tooltip content. When provided, the status is wrapped in a Tooltip.</td>
              </tr>
              <tr>
                <td><code>statusTooltipSide</code></td>
                <td><code>'top' | 'right' | 'bottom' | 'left'</code></td>
                <td><code>'right'</code></td>
                <td>Side of the status indicator where the tooltip appears. Ignored if <code>statusTooltip</code> is not provided.</td>
              </tr>
              <tr>
                <td><code>statusTooltipAlign</code></td>
                <td><code>'start' | 'center' | 'end'</code></td>
                <td><code>'center'</code></td>
                <td>Alignment of the tooltip relative to the status indicator. Ignored if <code>statusTooltip</code> is not provided.</td>
              </tr>
              <tr>
                <td><code>columns</code></td>
                <td><code>StudyRowColumn[]</code></td>
                <td>-</td>
                <td>Column data (required)</td>
              </tr>
              <tr>
                <td><code>selectable</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Show checkbox for selection</td>
              </tr>
              <tr>
                <td><code>selected</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Checkbox selected state</td>
              </tr>
              <tr>
                <td><code>onSelectionChange</code></td>
                <td><code>(selected: boolean) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when selection changes</td>
              </tr>
              <tr>
                <td><code>selectionMode</code></td>
                <td><code>'always' | 'hover'</code></td>
                <td><code>'always'</code></td>
                <td>When the checkbox is visible. <code>'hover'</code> only reveals it on row hover/focus, when the row is selected, or when <code>selectionActive</code> is true. The column always reserves its width, so the layout never shifts. Ignored if <code>selectable</code> is false.</td>
              </tr>
              <tr>
                <td><code>selectionActive</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Whether at least one row of the table is selected. In <code>selectionMode="hover"</code>, forces every checkbox visible so the selection can be extended without hovering each row. Computed by the parent, which owns the selection state.</td>
              </tr>
              <tr>
                <td><code>showMoreOptions</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Show more options button on hover</td>
              </tr>
              <tr>
                <td><code>onMoreOptionsClick</code></td>
                <td><code>(e: MouseEvent) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when more options clicked</td>
              </tr>
              <tr>
                <td><code>onClick</code></td>
                <td><code>(e: MouseEvent) =&gt; void</code></td>
                <td>-</td>
                <td>Row click handler. Not fired by clicks on the selection checkbox or the more-options button — those stop at their own control.</td>
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
            StudyRowColumn
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
                <td><code>value</code></td>
                <td><code>React.ReactNode</code></td>
                <td>Column content</td>
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
        title="With Checkbox"
        code={withCheckboxCode}
      />
      <CodeModal
        isOpen={openModal === 'hoverCheckbox'}
        onClose={() => setOpenModal(null)}
        title="Checkbox Revealed on Hover"
        code={hoverCheckboxCode}
      />
      <CodeModal
        isOpen={openModal === 'withActions'}
        onClose={() => setOpenModal(null)}
        title="With More Options"
        code={withActionsCode}
      />
      <CodeModal
        isOpen={openModal === 'allStates'}
        onClose={() => setOpenModal(null)}
        title="Status States"
        code={allStatesCode}
      />
      <CodeModal
        isOpen={openModal === 'columnSizing'}
        onClose={() => setOpenModal(null)}
        title="Column Sizing"
        code={columnSizingCode}
      />
      <CodeModal
        isOpen={openModal === 'statusTooltip'}
        onClose={() => setOpenModal(null)}
        title="Status Label & Tooltip"
        code={statusTooltipCode}
      />
      <CodeModal
        isOpen={openModal === 'tooltipPosition'}
        onClose={() => setOpenModal(null)}
        title="Status Tooltip Position"
        code={tooltipPositionCode}
      />
    </div>
  );
}
