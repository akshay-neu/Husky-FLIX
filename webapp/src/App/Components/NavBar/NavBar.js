/* to import react component */
import React, { useState } from 'react';
/* for Left Menu of NavBar */
import LeftMenu from './Sections/LeftMenu';
/* for Right Menu of NavBar */
import RightMenu from './Sections/RightMenu';
/* to have 'antd' styling  */
import { Drawer, Button, Icon } from 'antd';
/* to import scss styling */
import './NavBar.scss';

/* for Husky-Flix Logo image */
const Logo = require('../../../assets/images/Logo.png');

/**
 * NavBar function
 * The function component renders the Navigation Bar on the application.
 * @returns 
 */

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" className="navbarhead" >
      <div className="menu__logo">
        <a href="/"><img src={Logo} alt="Logo" className="navbarimage"  /></a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar;