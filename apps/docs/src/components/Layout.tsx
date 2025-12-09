import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
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
          <div className="nav-section">
            <h2 className="nav-section-title legend-bold">Getting Started</h2>
            <div className="nav-section-links">
              <Link
                to="/getting-started/welcome"
                className={`nav-link nav-link-sub ${location.pathname === '/getting-started/welcome' ? 'active' : ''
                  }`}
              >
                Welcome
              </Link>
              <Link
                to="/getting-started/installation"
                className={`nav-link nav-link-sub ${location.pathname === '/getting-started/installation' ? 'active' : ''
                  }`}
              >
                Installation
              </Link>
              <Link
                to="/getting-started/how-to-use"
                className={`nav-link nav-link-sub ${location.pathname === '/getting-started/how-to-use' ? 'active' : ''
                  }`}
              >
                How to Use
              </Link>
              <Link
                to="/getting-started/supported-platforms"
                className={`nav-link nav-link-sub ${location.pathname === '/getting-started/supported-platforms' ? 'active' : ''
                  }`}
              >
                Supported Platforms
              </Link>
            </div>
          </div>

          {/* Section Tokens */}
          <div className="nav-section">
            <h2 className="nav-section-title legend-bold">Tokens</h2>
            <div className="nav-section-links">
              <Link
                to="/tokens/text-styles"
                className={`nav-link nav-link-sub ${location.pathname === '/tokens/text-styles' ? 'active' : ''
                  }`}
              >
                Text Styles
              </Link>
              <Link
                to="/tokens/colors"
                className={`nav-link nav-link-sub ${location.pathname === '/tokens/colors' ? 'active' : ''
                  }`}
              >
                Colors
              </Link>
              <Link
                to="/tokens/icons"
                className={`nav-link nav-link-sub ${location.pathname === '/tokens/icons' ? 'active' : ''
                  }`}
              >
                Icons
              </Link>
            </div>
          </div>

          {/* Section Components */}
          <div className="nav-section">
            <h2 className="nav-section-title legend-bold">Components</h2>
            <div className="nav-section-links">
              <Link
                to="/components/button"
                className={`nav-link nav-link-sub ${location.pathname === '/components/button' ? 'active' : ''
                  }`}
              >
                Button
              </Link>
              <Link
                to="/components/icon-button"
                className={`nav-link nav-link-sub ${location.pathname === '/components/icon-button' ? 'active' : ''
                  }`}
              >
                IconButton
              </Link>
              <Link
                to="/components/tool-icons"
                className={`nav-link nav-link-sub ${location.pathname === '/components/tool-icons' ? 'active' : ''
                  }`}
              >
                ToolIcons
              </Link>
              <Link
                to="/components/tab"
                className={`nav-link nav-link-sub ${location.pathname === '/components/tab' ? 'active' : ''
                  }`}
              >
                Tab
              </Link>
              <Link
                to="/components/select"
                className={`nav-link nav-link-sub ${location.pathname === '/components/select' ? 'active' : ''
                  }`}
              >
                Select
              </Link>
            </div>
          </div>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}

