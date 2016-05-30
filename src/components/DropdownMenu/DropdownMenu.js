import React from 'react';
import styles from './DropdownMenu.scss';

const MenuItem = (props) => {
  return (
    <div
      className={ styles.menuItem }
      onClick={ props.onClick}
    >{ props.children }</div>
  );
};

MenuItem.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.node.isRequired,
};

//

class DropdownMenu extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
  }

  state = {
    menuVisible: false,
  }

  onMouseEnter = () => {
    this.setState({ menuVisible: true });
  }

  onMouseLeave = () => {
    this.setState({ menuVisible: false });
  }

  onClick = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  }

  render() {
    return (
      <div
        className={ styles.menuContainer }
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ this.onMouseLeave }
      >
        <div className={ styles.label } onClick={ this.onClick }>
          { this.props.label }
        </div>

        { this.state.menuVisible ? (
          <div className={ styles.menu }>
            { this.props.children }
          </div>
        ) : null }
      </div>
    );
  }
};

export default DropdownMenu;
export {
  MenuItem,
}