import './ButtonGroup.css';
import { Icon, type IconName } from './Icon';

export type ButtonGroupLayout = 'horizontal' | 'vertical';

export interface ButtonGroupOption {
  /**
   * Unique identifier for the option
   */
  value: string;
  /**
   * Display label for the button (optional if iconName is provided)
   */
  label?: string;
  /**
   * Icon name to display (optional, can be used alone or with label)
   */
  iconName?: IconName;
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
   * Layout direction: horizontal (default) or vertical
   */
  layout?: ButtonGroupLayout;
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
 *   layout="horizontal"
 * />
 * ```
 */
export function ButtonGroup({
  options,
  value,
  onChange,
  layout = 'horizontal',
  className = '',
  disabled = false,
}: ButtonGroupProps) {
  const containerClasses = [
    'button-group',
    `button-group--${layout}`,
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

        const iconColor = isActive
          ? 'var(--text-negative, #ffffff)'
          : 'var(--primary-default, #063b9e)';

        const hasIconOnly = option.iconName && !option.label;

        return (
          <button
            key={option.value}
            type="button"
            className={`${buttonClasses}${hasIconOnly ? ' button-group__button--icon-only' : ''}`}
            onClick={() => !isDisabled && onChange(option.value)}
            disabled={isDisabled}
            aria-pressed={isActive}
            aria-label={hasIconOnly ? option.value : undefined}
          >
            {option.iconName && (
              <Icon name={option.iconName} size={16} color={iconColor} />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
