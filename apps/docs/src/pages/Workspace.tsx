import { useState } from 'react';
import { Workspace, Tab, Button, StudyTableHeader, StudyRow } from '@as-designsystem/core';
import '@as-designsystem/core/Workspace.css';
import '@as-designsystem/core/Avatar.css';
import '@as-designsystem/core/Spinner.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/StudyTableHeader.css';
import '@as-designsystem/core/StudyRow.css';
import '@as-designsystem/core/StudyStatus.css';
import '@as-designsystem/core/Checkbox.css';
import '@as-designsystem/core/IconButton.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './Workspace.css';

const selectionStudies = [
  { id: 'a', status: 'Computed' as const, name: 'A320 Fleet Analysis', description: 'Fleet performance review' },
  { id: 'b', status: 'Computing' as const, name: 'Route Optimization', description: 'Network route analysis' },
  { id: 'c', status: 'Draft' as const, name: 'Maintenance Forecast', description: 'Annual maintenance schedule' },
  { id: 'd', status: 'Failed' as const, name: 'Fuel Burn Study', description: 'Error during computation' },
];

export default function WorkspacePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [selection, setSelection] = useState<Record<string, boolean>>({});

  const selectedCount = selectionStudies.filter((s) => selection[s.id]).length;
  const anySelected = selectedCount > 0;
  const allSelected = selectedCount === selectionStudies.length;

  const basicCode = `import { Workspace } from '@/design-system/composites/Workspace';

<Workspace
  title="My Workspace"
  studyCount={12}
  lastModified="Jan 15, 2025"
  users={[
    { initials: 'MT', name: 'Mark Thompson' },
    { initials: 'JD', name: 'Jane Doe' },
    { initials: 'AB', name: 'Alice Brown' },
  ]}
>
  <p>Folder content here...</p>
</Workspace>`;

  const expandedCode = `import { Workspace } from '@/design-system/composites/Workspace';
import { StudyTableHeader } from '@/design-system/components/StudyTableHeader';
import { StudyRow } from '@/design-system/components/StudyRow';

<Workspace
  title="My Workspace"
  studyCount={3}
  lastModified="Dec 20, 2024"
  users={[{ initials: 'MT', name: 'Mark Thompson' }, { initials: 'JD', name: 'Jane Doe' }]}
  defaultOpen
>
  <StudyTableHeader
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
    ]}
  />
  <StudyRow
    status="Computed"
    columns={[
      { key: 'name', value: 'A320 Fleet Analysis' },
      { key: 'description', value: 'Fleet performance review' },
    ]}
  />
  <StudyRow
    status="Computing"
    columns={[
      { key: 'name', value: 'Route Optimization' },
      { key: 'description', value: 'Network route analysis' },
    ]}
  />
</Workspace>`;

  const selectionCode = `import { useState } from 'react';
import { Workspace } from '@/design-system/composites/Workspace';
import { StudyTableHeader } from '@/design-system/components/StudyTableHeader';
import { StudyRow } from '@/design-system/components/StudyRow';

const studies = [
  { id: 'a', status: 'Computed', name: 'A320 Fleet Analysis' },
  { id: 'b', status: 'Computing', name: 'Route Optimization' },
  { id: 'c', status: 'Draft', name: 'Maintenance Forecast' },
];

const [selection, setSelection] = useState<Record<string, boolean>>({});

// The workspace owns the selection state, so it derives the table-wide flags
const selectedCount = studies.filter((s) => selection[s.id]).length;
const anySelected = selectedCount > 0;
const allSelected = selectedCount === studies.length;

<Workspace title="AirFrance 2026" studyCount={studies.length} defaultOpen>
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
  ))}
</Workspace>`;

  const computingCode = `import { Workspace } from '@/design-system/composites/Workspace';
import { StudyTableHeader } from '@/design-system/components/StudyTableHeader';
import { StudyRow } from '@/design-system/components/StudyRow';

<Workspace
  title="Production Workspace"
  studyCount={3}
  computingText="2 Computing"
  isComputing
  lastModified="Jan 27, 2025"
  users={[
    { initials: 'MT', name: 'Mark Thompson' },
    { initials: 'JD', name: 'Jane Doe' },
    { initials: 'AB', name: 'Alice Brown' },
    { initials: 'KL', name: 'Kevin Lee' },
  ]}
  maxAvatars={3}
  defaultOpen
>
  <StudyTableHeader
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
    ]}
  />
  <StudyRow status="Computing" columns={[...]} />
  <StudyRow status="Computed" columns={[...]} />
</Workspace>`;

  const controlledCode = `import { useState } from 'react';
import { Workspace } from '@/design-system/composites/Workspace';

const [isOpen, setIsOpen] = useState(false);

<Workspace
  title="Controlled Workspace"
  studyCount={3}
  open={isOpen}
  onToggle={setIsOpen}
>
  <div>Controlled content...</div>
</Workspace>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Workspace
        </h1>
        <InstallCommand componentName="workspace" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A collapsible workspace card with folder icon, study count chip, computing state,
        last modified date, and user avatar stack.
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
          {/* Collapsed (Default) */}
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
                Collapsed (Default)
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="workspace-demo">
              <Workspace
                title="My Workspace"
                studyCount={12}
                lastModified="Jan 15, 2025"
                users={[
                  { initials: 'MT', name: 'Mark Thompson' },
                  { initials: 'JD', name: 'Jane Doe' },
                  { initials: 'AB', name: 'Alice Brown' },
                ]}
              >
                <StudyTableHeader
                  columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'description', label: 'Description' },
                  ]}
                />
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Fleet Analysis' },
                    { key: 'description', value: 'Annual fleet review' },
                  ]}
                />
              </Workspace>
            </div>
          </section>

          {/* Expanded */}
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
                Expanded
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('expanded')}
              />
            </div>
            <div className="workspace-demo">
              <Workspace
                title="My Workspace"
                studyCount={3}
                lastModified="Dec 20, 2024"
                users={[{ initials: 'MT', name: 'Mark Thompson' }, { initials: 'JD', name: 'Jane Doe' }]}
                defaultOpen
              >
                <StudyTableHeader
                  columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'description', label: 'Description' },
                  ]}
                />
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'A320 Fleet Analysis' },
                    { key: 'description', value: 'Fleet performance review' },
                  ]}
                />
                <StudyRow
                  status="Computing"
                  columns={[
                    { key: 'name', value: 'Route Optimization' },
                    { key: 'description', value: 'Network route analysis' },
                  ]}
                />
                <StudyRow
                  status="Draft"
                  columns={[
                    { key: 'name', value: 'Maintenance Forecast' },
                    { key: 'description', value: 'Annual maintenance schedule' },
                  ]}
                />
              </Workspace>
            </div>
          </section>

          {/* Selection */}
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
                Selection
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('selection')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              With <code>selectionMode="hover"</code>, checkboxes stay hidden until a row is hovered — the workspace reads as a plain list. As soon as one study is selected, <code>selectionActive</code> turns true and every checkbox of the workspace stays visible, so the selection can be extended without hovering each row. The workspace owns the selection state and derives the flags for both the header and the rows.
            </p>
            <div className="example-container">
              <div className="workspace-demo">
                <Workspace
                  title="AirFrance 2026"
                  studyCount={selectionStudies.length}
                  lastModified="Jan 15, 2025"
                  users={[{ initials: 'JD', name: 'Jean-Marc Dupont' }]}
                  defaultOpen
                >
                  <StudyTableHeader
                    columns={[
                      { key: 'name', label: 'Name' },
                      { key: 'description', label: 'Description' },
                    ]}
                    selectable
                    selectionMode="hover"
                    selectionActive={anySelected}
                    allSelected={allSelected}
                    someSelected={anySelected && !allSelected}
                    onSelectAllChange={(value) =>
                      setSelection(
                        Object.fromEntries(selectionStudies.map((s) => [s.id, value]))
                      )
                    }
                  />
                  {selectionStudies.map((study) => (
                    <StudyRow
                      key={study.id}
                      status={study.status}
                      columns={[
                        { key: 'name', value: study.name },
                        { key: 'description', value: study.description },
                      ]}
                      selectable
                      selectionMode="hover"
                      selectionActive={anySelected}
                      selected={!!selection[study.id]}
                      onSelectionChange={(value) =>
                        setSelection((prev) => ({ ...prev, [study.id]: value }))
                      }
                    />
                  ))}
                </Workspace>
              </div>
            </div>
          </section>

          {/* Computing State */}
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
                Computing State
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('computing')}
              />
            </div>
            <div className="workspace-demo">
              <Workspace
                title="Production Workspace"
                studyCount={3}
                computingText="2 Computing"
                isComputing
                lastModified="Jan 27, 2025"
                users={[
                  { initials: 'MT', name: 'Mark Thompson' },
                  { initials: 'JD', name: 'Jane Doe' },
                  { initials: 'AB', name: 'Alice Brown' },
                  { initials: 'KL', name: 'Kevin Lee' },
                ]}
                maxAvatars={3}
                defaultOpen
              >
                <StudyTableHeader
                  columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'description', label: 'Description' },
                  ]}
                />
                <StudyRow
                  status="Computing"
                  columns={[
                    { key: 'name', value: 'Fuel Burn Analysis' },
                    { key: 'description', value: 'Running simulation...' },
                  ]}
                />
                <StudyRow
                  status="Computing"
                  columns={[
                    { key: 'name', value: 'Noise Footprint' },
                    { key: 'description', value: 'Processing data...' },
                  ]}
                />
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Weight Estimation' },
                    { key: 'description', value: 'Completed successfully' },
                  ]}
                />
              </Workspace>
            </div>
          </section>

          {/* Controlled */}
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
                Controlled
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('controlled')}
              />
            </div>
            <div className="workspace-demo">
              <ControlledWorkspaceExample />
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <section className="component-section">
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
          <div className="props-table-container">
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
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Workspace title</td>
                </tr>
                <tr>
                  <td><code>studyCount</code></td>
                  <td><code>number</code></td>
                  <td>-</td>
                  <td>Number of studies (renders "N Studies" chip)</td>
                </tr>
                <tr>
                  <td><code>computingText</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Computing label (e.g. "3 Computing")</td>
                </tr>
                <tr>
                  <td><code>isComputing</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether to show the spinner</td>
                </tr>
                <tr>
                  <td><code>lastModified</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Last modified date/time string</td>
                </tr>
                <tr>
                  <td><code>users</code></td>
                  <td><code>WorkspaceUser[]</code></td>
                  <td>-</td>
                  <td>Users to display as avatar stack. Each user has <code>initials</code>, optional <code>name</code> (shown on hover), and optional <code>color</code>.</td>
                </tr>
                <tr>
                  <td><code>maxAvatars</code></td>
                  <td><code>number</code></td>
                  <td><code>3</code></td>
                  <td>Maximum visible avatars</td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Collapsible content</td>
                </tr>
                <tr>
                  <td><code>defaultOpen</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether initially open</td>
                </tr>
                <tr>
                  <td><code>open</code></td>
                  <td><code>boolean</code></td>
                  <td>-</td>
                  <td>Controlled open state</td>
                </tr>
                <tr>
                  <td><code>onToggle</code></td>
                  <td><code>(open: boolean) =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when toggled</td>
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
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Workspace — Collapsed"
        sections={[{ title: 'Workspace.tsx', language: 'tsx', code: basicCode }]}
      />
      <CodeModal
        isOpen={openModal === 'expanded'}
        onClose={() => setOpenModal(null)}
        title="Workspace — Expanded"
        sections={[{ title: 'Workspace.tsx', language: 'tsx', code: expandedCode }]}
      />
      <CodeModal
        isOpen={openModal === 'selection'}
        onClose={() => setOpenModal(null)}
        title="Workspace — Selection"
        sections={[{ title: 'Workspace.tsx', language: 'tsx', code: selectionCode }]}
      />
      <CodeModal
        isOpen={openModal === 'computing'}
        onClose={() => setOpenModal(null)}
        title="Workspace — Computing State"
        sections={[{ title: 'Workspace.tsx', language: 'tsx', code: computingCode }]}
      />
      <CodeModal
        isOpen={openModal === 'controlled'}
        onClose={() => setOpenModal(null)}
        title="Workspace — Controlled"
        sections={[{ title: 'Workspace.tsx', language: 'tsx', code: controlledCode }]}
      />
    </div>
  );
}

function ControlledWorkspaceExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button
        label={isOpen ? 'CLOSE' : 'OPEN'}
        size="S"
        variant="Outlined"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Workspace
        title="Controlled Workspace"
        studyCount={2}
        open={isOpen}
        onToggle={setIsOpen}
      >
        <StudyTableHeader
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'description', label: 'Description' },
          ]}
        />
        <StudyRow
          status="Computed"
          columns={[
            { key: 'name', value: 'Weight Estimation' },
            { key: 'description', value: 'Completed successfully' },
          ]}
        />
        <StudyRow
          status="Failed"
          columns={[
            { key: 'name', value: 'Drag Polar Analysis' },
            { key: 'description', value: 'Error during computation' },
          ]}
        />
      </Workspace>
    </div>
  );
}
