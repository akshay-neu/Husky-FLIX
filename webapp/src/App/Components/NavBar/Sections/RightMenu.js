/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
/* importing ant design components for styling */
import { Menu } from 'antd';
/* importing Axios for creating HTTP request */
import axios from 'axios';
/* Config file */ 
import { USER_SERVER } from '../../../Config/Config';
/* importing react-router-dom component */
import { withRouter } from 'react-router-dom';
/* to have useSelector */
import { useSelector } from "react-redux";
/* for scss styling */
import './RightMenu.scss';


const Upload = require('../../../../assets/images/upload.png');

/**
 * RightMenu Function
 * The function component renders the Right hand side menu of the NavBar.
 * @param {*} props 
 * @returns 
 */
function RightMenu(props) {

  const user = useSelector(state => state.user)

  /* to have onclick login/out functionality */
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };


  /* when the user is not logged in */
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  };

 /* when the user is logged in:
    1. display the name of the user
    2. link to Subscribe
    3. logout functionality
 */
  if(user.userData && user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
    <Menu.Item key="name" className="helloname">
     <a >  Hello {user.userData.name} </a>
     </Menu.Item>
     <Menu.Item key="subscribe">
        <a href="/subscription">Subscribe</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout </a>
        </Menu.Item>
      </Menu>
    )
    }  
  
  else {
    return (
      <Menu mode={props.mode}>
       
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);