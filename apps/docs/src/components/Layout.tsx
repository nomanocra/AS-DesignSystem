import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Icon } from '@as-design-system/core';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

interface NavSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
}

function NavSection({ title, children, defaultOpen = true, icon }: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="nav-section">
      <button
        className="nav-section-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="nav-section-title-wrapper">
          {icon && <span className="nav-section-icon">{icon}</span>}
          <h2 className="nav-section-title legend-bold">{title}</h2>
        </div>
        <span className={`nav-section-chevron ${isOpen ? 'open' : ''}`}>
          <Icon name="keyboard_arrow_down" size={16} color="var(--text-secondary, #63728a)" />
        </span>
      </button>
      <div className={`nav-section-links ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Logo />
        </div>
        <nav className="sidebar-nav">
          {/* Section Getting Started */}
          <NavSection
            title="Getting Started"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
          >
            <Link
              to="/getting-started/welcome"
              className={`nav-link nav-link-sub ${location.pathname === '/getting-started/welcome' ? 'active' : ''}`}
            >
              Welcome
            </Link>
            <Link
              to="/getting-started/installation"
              className={`nav-link nav-link-sub ${location.pathname === '/getting-started/installation' ? 'active' : ''}`}
            >
              Installation
            </Link>
            <Link
              to="/getting-started/how-to-use"
              className={`nav-link nav-link-sub ${location.pathname === '/getting-started/how-to-use' ? 'active' : ''}`}
            >
              How to Use
            </Link>
            <Link
              to="/getting-started/supported-platforms"
              className={`nav-link nav-link-sub ${location.pathname === '/getting-started/supported-platforms' ? 'active' : ''}`}
            >
              Supported Platforms
            </Link>
          </NavSection>

          {/* Section Tokens */}
          <NavSection
            title="Tokens"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
              </svg>
            }
          >
            <Link
              to="/tokens/text-styles"
              className={`nav-link nav-link-sub ${location.pathname === '/tokens/text-styles' ? 'active' : ''}`}
            >
              Text Styles
            </Link>
            <Link
              to="/tokens/colors"
              className={`nav-link nav-link-sub ${location.pathname === '/tokens/colors' ? 'active' : ''}`}
            >
              Colors
            </Link>
            <Link
              to="/tokens/icons"
              className={`nav-link nav-link-sub ${location.pathname === '/tokens/icons' ? 'active' : ''}`}
            >
              Icons
            </Link>
          </NavSection>

          {/* Section Components */}
          <NavSection
            title="Components"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            }
          >
            <Link
              to="/components/button"
              className={`nav-link nav-link-sub ${location.pathname === '/components/button' ? 'active' : ''}`}
            >
              Button
            </Link>
            <Link
              to="/components/icon-button"
              className={`nav-link nav-link-sub ${location.pathname === '/components/icon-button' ? 'active' : ''}`}
            >
              IconButton
            </Link>
            <Link
              to="/components/tool-icons"
              className={`nav-link nav-link-sub ${location.pathname === '/components/tool-icons' ? 'active' : ''}`}
            >
              ToolIcons
            </Link>
            <Link
              to="/components/tab"
              className={`nav-link nav-link-sub ${location.pathname === '/components/tab' ? 'active' : ''}`}
            >
              Tab
            </Link>
            <Link
              to="/components/select"
              className={`nav-link nav-link-sub ${location.pathname === '/components/select' ? 'active' : ''}`}
            >
              Select
            </Link>
          </NavSection>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
