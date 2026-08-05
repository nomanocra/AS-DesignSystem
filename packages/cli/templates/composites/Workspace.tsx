import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { Spinner } from '../components/Spinner';
import { Avatar, AvatarStack } from '../components/Avatar';
import { SimpleTooltip } from '../components/Tooltip';
import './Workspace.css';

export interface WorkspaceUser {
  initials: string;
  name?: string;
  color?: string;
}

export interface WorkspaceProps {
  /**
   * Workspace title
   */
  title: string;
  /**
   * Interactive slot rendered inline, right after the title text.
   * Typically one or more `IconButton`s (pin, rename, …).
   *
   * The nodes live above the header hit area, so they receive their own
   * clicks without toggling the workspace. Products can target the stable
   * `.workspace__title-actions` class to reveal them on hover:
   * `.workspace__header:hover .workspace__title-actions { opacity: 1 }`
   */
  titleActions?: React.ReactNode;
  /**
   * Number of studies — renders "N Studies" chip
   */
  studyCount?: number;
  /**
   * Computing label (e.g. "3 Computing")
   */
  computingText?: string;
  /**
   * Whether to show the spinner next to computingText
   * @default false
   */
  isComputing?: boolean;
  /**
   * Last modified date/time string
   */
  lastModified?: string;
  /**
   * Users to display as avatar stack
   */
  users?: WorkspaceUser[];
  /**
   * Maximum visible avatars
   * @default 3
   */
  maxAvatars?: number;
  /**
   * Collapsible content (folder items)
   */
  children: React.ReactNode;
  /**
   * Whether the workspace is initially open
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Callback when toggled
   */
  onToggle?: (open: boolean) => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Workspace Composite
 *
 * A collapsible card for workspace folders. Displays title, study count,
 * computing state, last modified date, and user avatars.
 *
 * Clicking anywhere on the header toggles the workspace. `titleActions`
 * renders interactive nodes right after the title, which keep their own
 * clicks.
 *
 * @example
 * ```tsx
 * <Workspace
 *   title="My Workspace"
 *   studyCount={12}
 *   lastModified="Jan 15, 2025"
 *   users={[{ initials: 'MT' }, { initials: 'JD' }]}
 *   defaultOpen
 * >
 *   <div>Folder content here...</div>
 * </Workspace>
 * ```
 */
export function Workspace({
  title,
  titleActions,
  studyCount,
  computingText,
  isComputing = false,
  lastModified,
  users,
  maxAvatars = 3,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  className = '',
}: WorkspaceProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleToggle = () => {
    const nextOpen = !isOpen;
    if (controlledOpen === undefined) {
      setInternalOpen(nextOpen);
    }
    onToggle?.(nextOpen);
  };

  const containerClasses = [
    'workspace',
    isOpen ? 'workspace--open' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className="workspace__header">
        {/*
          The toggle is a transparent hit area covering the whole header instead of
          the header itself being a <button>: a button may not contain interactive
          content, and the title actions slot needs to sit inside the title line.
          Islands that need their own pointer events (title actions, avatars) are
          lifted above it with z-index.
        */}
        <button
          type="button"
          className="workspace__header-hit"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label={title}
        />
        <span className="workspace__toggle-icon">
          <Icon
            name="dropdown"
            size={20}
            color="var(--text-secondary, #63728a)"
          />
        </span>
        {isComputing ? (
          <Spinner size={24} variant="arc" />
        ) : (
          <Icon
            name={isOpen ? 'folder_open' : 'folder'}
            size={24}
            color="var(--primary-default, #063b9e)"
          />
        )}
        <div className="workspace__title-block">
          <div className="workspace__title-line">
            <span className="workspace__title label-regular-xs">{title}</span>
            {titleActions && (
              <span className="workspace__title-actions">{titleActions}</span>
            )}
          </div>
          <div className="workspace__title-row">
            {studyCount !== undefined && (
              <span className="workspace__study-chip legend-medium-m">
                {studyCount} {studyCount === 1 ? 'Study' : 'Studies'}
              </span>
            )}
            {isComputing && computingText && (
              <span className="workspace__computing-text legend-regular-m">{computingText}</span>
            )}
          </div>
        </div>
        <span className="workspace__spacer" />
        {lastModified && (
          <div className="workspace__last-modified">
            <span className="workspace__last-modified-label legend-regular-m">Last Modification</span>
            <span className="workspace__last-modified-date label-medium-xs">{lastModified}</span>
          </div>
        )}
        {users && users.length > 0 && (
          <SimpleTooltip
            label={users.map(u => u.name || u.initials).join(', ')}
            side="top"
            delayDuration={0}
          >
            {/* Lifted above the hit area so the tooltip still gets its hover;
                the toggle is re-attached so clicking avatars keeps toggling. */}
            <div className="workspace__avatars" onClick={handleToggle}>
              <AvatarStack max={maxAvatars} size="M">
                {users.map((user, i) => (
                  <Avatar
                    key={i}
                    initials={user.initials}
                    size="M"
                    color={user.color || '#ced5dd'}
                    textColor="#00205b"
                  />
                ))}
              </AvatarStack>
            </div>
          </SimpleTooltip>
        )}
      </div>
      <div className="workspace__body">
        <div className="workspace__content">
          <div className="workspace__table-wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
