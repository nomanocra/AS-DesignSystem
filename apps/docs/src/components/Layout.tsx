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
                <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
                <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
                <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
                <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
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
              to="/components/button-group"
              className={`nav-link nav-link-sub ${location.pathname === '/components/button-group' ? 'active' : ''}`}
            >
              ButtonGroup
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
