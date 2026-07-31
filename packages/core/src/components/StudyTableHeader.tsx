import { Checkbox } from './Checkbox';
import './StudyTableHeader.css';

export interface StudyTableHeaderColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  /** Fixed width (e.g. '200px', '30%') */
  width?: string;
  /** Flex grow factor (default: 1) */
  flex?: number;
}

export interface StudyTableHeaderProps {
  /**
   * Column headers
   */
  columns: StudyTableHeaderColumn[];
  /**
   * Show checkbox for "select all"
   * @default false
   */
  selectable?: boolean;
  /**
   * All items selected state
   * @default false
   */
  allSelected?: boolean;
  /**
   * Some (but not all) items selected
   * @default false
   */
  someSelected?: boolean;
  /**
   * Callback when select all changes
   */
  onSelectAllChange?: (selected: boolean) => void;
  /**
   * When the select-all checkbox is visible. The checkbox column always reserves
   * its width, so toggling visibility never shifts the table layout.
   * Has no effect if `selectable` is false.
   *
   * Same contract as `StudySelectionMode` on StudyRow — the union is inlined
   * rather than imported so this component stays installable on its own.
   * @default 'always'
   */
  selectionMode?: 'always' | 'hover';
  /**
   * Whether at least one row of the table is currently selected. In
   * `selectionMode="hover"`, this reveals the select-all checkbox permanently.
   * Redundant when `allSelected` or `someSelected` is already true.
   * @default false
   */
  selectionActive?: boolean;
  /**
   * Show status column header
   * @default true
   */
  showStatusColumn?: boolean;
  /**
   * Show actions column placeholder
   * @default false
   */
  showActionsColumn?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * StudyTableHeader Component
 *
 * Table header row for study lists with configurable columns,
 * optional select-all checkbox, and status column.
 *
 * @example
 * ```tsx
 * <StudyTableHeader
 *   columns={[
 *     { key: 'name', label: 'Name', align: 'left' },
 *     { key: 'description', label: 'Description', align: 'left' },
 *   ]}
 *   selectable
 * />
 * ```
 */
export function StudyTableHeader({
  columns,
  selectable = false,
  allSelected = false,
  someSelected = false,
  onSelectAllChange,
  selectionMode = 'always',
  selectionActive = false,
  showStatusColumn = true,
  showActionsColumn = false,
  className = '',
}: StudyTableHeaderProps) {
  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (checked !== 'indeterminate') {
      onSelectAllChange?.(checked);
    }
  };

  // Same rule as StudyRow: hidden until the header is hovered/focused, unless a
  // selection is already in progress somewhere in the table.
  const hideCheckbox =
    selectable &&
    selectionMode === 'hover' &&
    !allSelected &&
    !someSelected &&
    !selectionActive;

  const classes = [
    'study-table-header',
    hideCheckbox ? 'study-table-header--select-hover' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {/* Checkbox column */}
      {selectable && (
        <div className="study-table-header__cell study-table-header__cell--checkbox">
          <Checkbox
            checked={someSelected && !allSelected ? 'indeterminate' : allSelected}
            onCheckedChange={handleCheckboxChange}
            size="S"
            showLabel={false}
          />
        </div>
      )}

      {/* Status column */}
      {showStatusColumn && (
        <div className="study-table-header__cell study-table-header__cell--status label-regular-xs">
          Status
        </div>
      )}

      {/* Data column headers */}
      {columns.map((column) => {
        const style: React.CSSProperties = column.width
          ? { width: column.width, flexShrink: 0, flex: 'none' }
          : { flex: column.flex ?? 1 };

        return (
          <div
            key={column.key}
            className={`study-table-header__cell study-table-header__cell--${column.align || 'left'} label-regular-xs`}
            style={style}
          >
            {column.label}
          </div>
        );
      })}

      {/* Actions column placeholder */}
      {showActionsColumn && (
        <div className="study-table-header__cell study-table-header__cell--actions">
          {/* Empty - placeholder for row action buttons */}
        </div>
      )}
    </div>
  );
}

export default StudyTableHeader;
