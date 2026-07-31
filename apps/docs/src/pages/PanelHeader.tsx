import { useState } from 'react';
import { PanelHeader, Tab, Button, IconButton } from '@as-designsystem/core';
import '@as-designsystem/core/PanelHeader.css';
import '@as-designsystem/core/PanelStudyName.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/IconButton.css';
import '@as-designsystem/core/Tooltip.css';
import '@as-designsystem/core/Tab.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './PanelHeader.css';

export default function PanelHeaderPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { PanelHeader } from '@/design-system/composites/PanelHeader';

<PanelHeader
  studyName="My Study"
  onBackHome={() => console.log('Back home')}
  onStudyNameClick={() => console.log('Edit study name')}
  onDuplicate={() => console.log('Duplicate study')}
/>`;

  const workspaceCode = `import { PanelHeader } from '@/design-system/composites/PanelHeader';

{/* Custom workspace label */}
<PanelHeader
  workspaceName="Fleet Operations"
  studyName="My Study"
  onBackHome={() => navigate('/')}
/>

{/* With an optional icon on the left of the label */}
<PanelHeader
  workspaceIcon="folder"
  workspaceName="Fleet Operations"
  studyName="My Study"
  onBackHome={() => navigate('/')}
/>`;

  const withBackgroundCode = `import { PanelHeader } from '@/design-system/composites/PanelHeader';

<PanelHeader
  studyName="Fleet Analysis Q4 2025"
  onBackHome={() => navigate('/')}
  onStudyNameClick={() => openRenameDialog()}
  onDuplicate={() => duplicateStudy()}
  backgroundImage="/assets/backgrounds/Maintenance.png"
/>`;

  const longNameCode = `import { PanelHeader } from '@/design-system/composites/PanelHeader';

{/* Long study name with single-line truncation */}
<PanelHeader
  studyName="Very Long Study Name That Overflows The Container Width"
  onBackHome={() => navigate('/')}
/>

{/* Long study name with 2-line truncation */}
<PanelHeader
  studyName="Very Long Study Name That Overflows Onto Multiple Lines"
  studyNameLines={2}
  onBackHome={() => navigate('/')}
/>`;

  const customActionsCode = `import { PanelHeader } from '@/design-system/composites/PanelHeader';
import { IconButton } from '@/design-system/components/IconButton';

{/* Replace duplicate button with a "more" menu */}
<PanelHeader
  studyName="My Study"
  showDuplicateButton={false}
  actions={<IconButton icon="more_horiz" variant="Ghost" size="S" />}
  onBackHome={() => navigate('/')}
/>

{/* Multiple custom action buttons */}
<PanelHeader
  studyName="My Study"
  showDuplicateButton={false}
  actions={
    <>
      <IconButton icon="share" variant="Ghost" size="S" />
      <IconButton icon="more_horiz" variant="Ghost" size="S" />
    </>
  }
  onBackHome={() => navigate('/')}
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          PanelHeader
        </h1>
        <InstallCommand componentName="panel-header" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A dark corporate panel header with background image, "Back Home" navigation,
        study name with edit capability, and a duplicate action button.
        Used as the top section of a study page side panel.
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
          {/* Default */}
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
                Default
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
              <div className="panel-header-demo">
                <PanelHeader
                  studyName="My Study"
                  onBackHome={() => console.log('Back home')}
                  onStudyNameClick={() => console.log('Edit study name')}
                  onDuplicate={() => console.log('Duplicate study')}
                />
              </div>
            </div>
          </section>

          {/* Workspace Label */}
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
                Workspace Label
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('workspace')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Use <code>workspaceName</code> to set the label above the study name, and the optional{' '}
              <code>workspaceIcon</code> to prefix it with an icon (e.g. <code>folder</code> to
              indicate a workspace).
            </p>
            <div className="panel-header-demo-grid">
              <div className="example-container">
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Label only
                </p>
                <div className="panel-header-demo">
                  <PanelHeader
                    workspaceName="Fleet Operations"
                    studyName="My Study"
                    onBackHome={() => console.log('Back home')}
                    onDuplicate={() => console.log('Duplicate')}
                  />
                </div>
              </div>
              <div className="example-container">
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  With workspace icon
                </p>
                <div className="panel-header-demo">
                  <PanelHeader
                    workspaceIcon="folder"
                    workspaceName="Fleet Operations"
                    studyName="My Study"
                    onBackHome={() => console.log('Back home')}
                    onDuplicate={() => console.log('Duplicate')}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* With Background Image */}
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
                With Background Image
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('withBackground')}
              />
            </div>
            <div className="example-container">
              <div className="panel-header-demo">
                <PanelHeader
                  studyName="Fleet Analysis Q4 2025"
                  onBackHome={() => console.log('Back home')}
                  onStudyNameClick={() => console.log('Edit study name')}
                  onDuplicate={() => console.log('Duplicate study')}
                  backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop"
                />
              </div>
            </div>
          </section>

          {/* Long Name */}
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
                Long Study Name
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('longName')}
              />
            </div>
            <div className="panel-header-demo-grid">
              <div className="example-container">
                <div className="panel-header-demo">
                  <PanelHeader
                    studyName="Very Long Study Name That Overflows The Container Width Easily"
                    onBackHome={() => console.log('Back home')}
                    onDuplicate={() => console.log('Duplicate')}
                  />
                </div>
              </div>
              <div className="example-container">
                <div className="panel-header-demo">
                  <PanelHeader
                    studyName="Very Long Study Name That Overflows Onto Multiple Lines In The Container"
                    studyNameLines={2}
                    onBackHome={() => console.log('Back home')}
                    onDuplicate={() => console.log('Duplicate')}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Custom Actions */}
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
                Custom Actions
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customActions')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Use <code>showDuplicateButton=&#123;false&#125;</code> to hide the default duplicate button,
              and <code>actions</code> to add custom buttons.
            </p>
            <div className="panel-header-demo-grid">
              <div className="example-container">
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  With "more" menu button
                </p>
                <div className="panel-header-demo">
                  <PanelHeader
                    studyName="Fleet Analysis Q4"
                    showDuplicateButton={false}
                    actions={
                      <IconButton
                        icon="more_horiz"
                        variant="Ghost"
                        size="S"
                        onClick={() => console.log('Open menu')}
                        className="panel-header__icon-button"
                      />
                    }
                    onBackHome={() => console.log('Back home')}
                  />
                </div>
              </div>
              <div className="example-container">
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  With multiple custom buttons
                </p>
                <div className="panel-header-demo">
                  <PanelHeader
                    studyName="Fleet Analysis Q4"
                    showDuplicateButton={false}
                    actions={
                      <>
                        <IconButton
                          icon="share"
                          variant="Ghost"
                          size="S"
                          onClick={() => console.log('Share')}
                          className="panel-header__icon-button"
                        />
                        <IconButton
                          icon="more_horiz"
                          variant="Ghost"
                          size="S"
                          onClick={() => console.log('Open menu')}
                          className="panel-header__icon-button"
                        />
                      </>
                    }
                    onBackHome={() => console.log('Back home')}
                  />
                </div>
              </div>
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
                  <td><code>workspaceName</code></td>
                  <td><code>string</code></td>
                  <td><code>'Workspace Name'</code></td>
                  <td>Label displayed above the study name</td>
                </tr>
                <tr>
                  <td><code>workspaceIcon</code></td>
                  <td><code>IconName</code></td>
                  <td>-</td>
                  <td>Optional decorative icon displayed on the left of the workspace label</td>
                </tr>
                <tr>
                  <td><code>studyName</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>The study name to display (required)</td>
                </tr>
                <tr>
                  <td><code>studyNameLines</code></td>
                  <td><code>number</code></td>
                  <td><code>1</code></td>
                  <td>Number of visible lines before truncation</td>
                </tr>
                <tr>
                  <td><code>onStudyNameClick</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when the study name is clicked (e.g., to rename)</td>
                </tr>
                <tr>
                  <td><code>showDuplicateButton</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether to show the duplicate button</td>
                </tr>
                <tr>
                  <td><code>onDuplicate</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when the duplicate button is clicked</td>
                </tr>
                <tr>
                  <td><code>onBackHome</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when the "Back Home" button is clicked</td>
                </tr>
                <tr>
                  <td><code>backgroundImage</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Background image URL. If not provided, uses solid dark blue</td>
                </tr>
                <tr>
                  <td><code>actions</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Custom action buttons (use with showDuplicateButton=false to replace)</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Additional CSS class names</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Default"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'workspace'}
        onClose={() => setOpenModal(null)}
        title="Workspace Label"
        code={workspaceCode}
      />
      <CodeModal
        isOpen={openModal === 'withBackground'}
        onClose={() => setOpenModal(null)}
        title="With Background Image"
        code={withBackgroundCode}
      />
      <CodeModal
        isOpen={openModal === 'longName'}
        onClose={() => setOpenModal(null)}
        title="Long Study Name"
        code={longNameCode}
      />
      <CodeModal
        isOpen={openModal === 'customActions'}
        onClose={() => setOpenModal(null)}
        title="Custom Actions"
        code={customActionsCode}
      />
    </div>
  );
}
