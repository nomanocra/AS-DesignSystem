import './ButtonGroup.css';

export interface ButtonGroupOption {
  /**
   * Unique identifier for the option
   */
  value: string;
  /**
   * Display label for the button
   */
  label: string;
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface ButtonGroupProps {
  /**
   * Array of options to display
   */
  options: ButtonGroupOption[];
  /**
   * Currently selected value
   */
  value: string;
  /**
   * Callback when selection changes
   */
  onChange: (value: string) => void;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Disable all buttons
   */
  disabled?: boolean;
}

/**
 * ButtonGroup Component
 *
 * A group of toggle buttons where one option can be selected at a time.
 *
 * @example
 * ```tsx
 * const [selected, setSelected] = useState('option1');
 *
 * <ButtonGroup
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *     { value: 'option3', label: 'Option 3' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 */
export function ButtonGroup({
  options,
  value,
  onChange,
  className = '',
  disabled = false,
}: ButtonGroupProps) {
  const containerClasses = [
    'button-group',
    disabled ? 'button-group--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} role="group">
      {options.map((option) => {
        const isActive = option.value === value;
        const isDisabled = disabled || option.disabled;

        const buttonClasses = [
          'button-group__button',
          isActive ? 'button-group__button--active' : '',
          isDisabled ? 'button-group__button--disabled' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={option.value}
            type="button"
            className={buttonClasses}
            onClick={() => !isDisabled && onChange(option.value)}
            disabled={isDisabled}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
