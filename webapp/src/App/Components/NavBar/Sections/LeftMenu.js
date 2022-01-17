/* importing react components */
import React from 'react';
/* importing ant design components for styling */
import { Menu } from 'antd';

/**
 * LeftMenu Function
 * The function component handles the Left side menu of the NavBar
 * @param {*} props 
 * @returns 
 */

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
        {/* link to the Favorite movie list page*/}
        <a href="/favorite">Favorite</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu;