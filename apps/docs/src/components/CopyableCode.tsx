import { useState } from 'react';

interface CopyableCodeProps {
  value: string;
  displayValue?: string;
  className?: string;
}

export function CopyableCode({ value, displayValue, className = 'token-code' }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <code
      className={`${className} clickable`}
      onClick={copyToClipboard}
      title="Click to copy"
      style={{ cursor: 'pointer' }}
    >
      {copied ? '✓ Copied!' : (displayValue || value)}
    </code>
  );
}
