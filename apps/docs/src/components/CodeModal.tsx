import { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeModal.css';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code: string;
}

export default function CodeModal({ isOpen, onClose, title, code }: CodeModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="code-modal-overlay" onClick={onClose}>
      <div className="code-modal" onClick={(e) => e.stopPropagation()}>
        <div className="code-modal-header">
          <h3 className="label-bold-m">{title}</h3>
          <button className="code-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="code-modal-content">
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '6px',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
        <div className="code-modal-footer">
          <button className="code-modal-copy" onClick={handleCopy}>
            Copy code
          </button>
        </div>
      </div>
    </div>
  );
}

