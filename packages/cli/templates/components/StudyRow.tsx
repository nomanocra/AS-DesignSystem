import { Checkbox } from './Checkbox';
import { StudyStatus, StudyStatusState } from './StudyStatus';
import { IconButton } from './IconButton';
import { Tooltip, TooltipTrigger, TooltipContent, type TooltipSide, type TooltipAlign } from './Tooltip';
import './StudyRow.css';

export interface StudyRowColumn {
  key: string;
  value: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  /** Fixed width (e.g. '200px', '30%') */
  width?: string;
  /** Flex grow factor (default: 1) */
  flex?: number;
}

/**
 * When the selection checkbox is visible.
 *
 * - `'always'` — the checkbox is permanently visible.
 * - `'hover'` — the checkbox is only revealed on hover/focus, when the row is
 *   selected, or when `selectionActive` is true. Lighter interface for tables
 *   where selection is a secondary action.
 */
export type StudySelectionMode = 'always' | 'hover';

export interface StudyRowProps {
  /**
   * Study status
   */
  status: StudyStatusState;
  /**
   * Custom label displayed next to the status icon (e.g. "2 Draft")
   */
  statusLabel?: string;
  /**
   * Custom tooltip content for the status. When provided, the status is wrapped in a Tooltip.
   */
  statusTooltip?: React.ReactNode;
  /**
   * Side of the status indicator where the status tooltip appears.
   * Has no effect if `statusTooltip` is not provided.
   * @default 'right'
   */
  statusTooltipSide?: TooltipSide;
  /**
   * Alignment of the status tooltip relative to the status indicator.
   * Has no effect if `statusTooltip` is not provided.
   * @default 'center'
   */
  statusTooltipAlign?: TooltipAlign;
  /**
   * Column data
   */
  columns: StudyRowColumn[];
  /**
   * Show checkbox for selection
   * @default false
   */
  selectable?: boolean;
  /**
   * Checkbox selected state
   * @default false
   */
  selected?: boolean;
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selected: boolean) => void;
  /**
   * When the selection checkbox is visible. The checkbox column always reserves
   * its width, so toggling visibility never shifts the table layout.
   * Has no effect if `selectable` is false.
   * @default 'always'
   */
  selectionMode?: StudySelectionMode;
  /**
   * Whether at least one row of the table is currently selected. In
   * `selectionMode="hover"`, this reveals the checkbox permanently so the user
   * can extend the selection without hovering each row. The parent owns the
   * selection state, so it is the one that computes this flag.
   * @default false
   */
  selectionActive?: boolean;
  /**
   * Show more options button on hover
   * @default false
   */
  showMoreOptions?: boolean;
  /**
   * Callback when more options button is clicked
   */
  onMoreOptionsClick?: (e: React.MouseEvent) => void;
  /**
   * Click handler for the row. Not fired by clicks on the selection checkbox or
   * on the more-options button — those stop at their own control.
   */
  onClick?: (e: React.MouseEvent) => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * StudyRow Component
 *
 * Table row for displaying study information with status, configurable columns,
 * optional checkbox, and hover-revealed actions.
 *
 * @example
 * ```tsx
 * <StudyRow
 *   status="Computed"
 *   columns={[
 *     { key: 'name', value: 'My Study' },
 *     { key: 'description', value: 'Study description' },
 *   ]}
 *   selectable
 *   showMoreOptions
 * />
 * ```
 *
 * @example Checkbox revealed on hover only
 * ```tsx
 * const anySelected = Object.values(selection).some(Boolean);
 *
 * <StudyRow
 *   status="Computed"
 *   columns={columns}
 *   selectable
 *   selectionMode="hover"
 *   selectionActive={anySelected}
 *   selected={selection[id]}
 *   onSelectionChange={(value) => setSelection({ ...selection, [id]: value })}
 * />
 * ```
 */
export function StudyRow({
  status,
  statusLabel,
  statusTooltip,
  statusTooltipSide = 'right',
  statusTooltipAlign = 'center',
  columns,
  selectable = false,
  selected = false,
  onSelectionChange,
  selectionMode = 'always',
  selectionActive = false,
  showMoreOptions = false,
  onMoreOptionsClick,
  onClick,
  className = '',
}: StudyRowProps) {
  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (checked !== 'indeterminate') {
      onSelectionChange?.(checked);
    }
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoreOptionsClick?.(e);
  };

  // Selecting a row must not also fire the row's `onClick` (typically opening
  // the study). Scoped to the checkbox itself, not the whole 48px cell, so the
  // rest of the column keeps behaving like the rest of the row — same rule as
  // the more-options button, which stops at the button.
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // In hover mode the checkbox stays hidden until the row is hovered/focused —
  // unless it is already selected, or a selection is in progress elsewhere in
  // the table, in which case every checkbox must stay visible.
  const hideCheckbox =
    selectable && selectionMode === 'hover' && !selected && !selectionActive;

  const classes = [
    'study-row',
    hideCheckbox ? 'study-row--select-hover' : '',
    selected ? 'study-row--selected' : '',
    status === 'Failed' ? 'study-row--failed' : '',
    status === 'Warning' ? 'study-row--warning' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Checkbox column */}
      {selectable && (
        <div className="study-row__cell study-row__cell--checkbox">
          <div className="study-row__checkbox" onClick={handleCheckboxClick}>
            <Checkbox
              checked={selected}
              onCheckedChange={handleCheckboxChange}
              size="S"
              showLabel={false}
            />
          </div>
        </div>
      )}

      {/* Status column */}
      <div className="study-row__cell study-row__cell--status">
        {statusTooltip ? (
          <Tooltip>
            <TooltipTrigger>
              <div>
                <StudyStatus state={status} label={statusLabel} />
              </div>
            </TooltipTrigger>
            <TooltipContent side={statusTooltipSide} align={statusTooltipAlign}>
              {statusTooltip}
            </TooltipContent>
          </Tooltip>
        ) : (
          <StudyStatus state={status} label={statusLabel} />
        )}
      </div>

      {/* Data columns */}
      {columns.map((column) => {
        const style: React.CSSProperties = column.width
          ? { width: column.width, flexShrink: 0, flex: 'none' }
          : { flex: column.flex ?? 1 };

        return (
          <div
            key={column.key}
            className={`study-row__cell study-row__cell--${column.align || 'left'} legend-regular-l`}
            style={style}
          >
            {column.value}
          </div>
        );
      })}

      {/* More options button */}
      {showMoreOptions && (
        <div className="study-row__cell study-row__cell--actions">
          <IconButton
            icon="more_horiz"
            size="XS"
            variant="Ghost"
            onClick={handleMoreClick}
            className="study-row__more-button"
          />
        </div>
      )}
    </div>
  );
}

export default StudyRow;
