import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

class Tab extends Component {

  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    tabRef: PropTypes.func,
    focus: PropTypes.bool,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    activeTabClassName: PropTypes.string,
    disabledTabClassName: PropTypes.string,
    panelId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    focus: false,
    selected: false,
    id: null,
    panelId: null,
    activeTabClassName: 'ReactTabs__Tab--selected',
    disabledTabClassName: 'ReactTabs__Tab--disabled',
  };

  componentDidMount() {
    this.checkFocus();
  }

  componentDidUpdate() {
    this.checkFocus();
  }

  checkFocus() {
    if (this.props.selected && this.props.focus) {
      this.node.focus();
    }
  }

  render() {
    const {
      selected,
      disabled,
      panelId,
      activeTabClassName,
      disabledTabClassName,
      className,
      children,
      id,
      ...attributes } = this.props;

    delete attributes.focus;

    return (
      <li
        {...attributes}
        className={cx(
          'ReactTabs__Tab',
          className,
          {
            [activeTabClassName]: selected,
            [disabledTabClassName]: disabled,
          }
        )}
        ref={(node) => { this.node = node; this.props.tabRef(node); }}
        role="tab"
        id={id}
        aria-selected={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex={selected ? '0' : null}
      >
        {children}
      </li>
    );
  }
}

export default Tab;
