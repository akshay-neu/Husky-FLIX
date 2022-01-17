import { Typography} from 'antd'; // library for styling of webpages
import React from 'react';
import './Subscription.scss';
import { useSelector } from 'react-redux';
import Checkout from './Checkout';

function Subscription() {
    const { Title } = Typography; // for styling webpage
    const user = useSelector(state => state.user) // get the state of the user

    console.log("User", user)

    return (

        <div className="mainDiv">
            <Title level={2} > Subscription Details </Title>
            <hr />
            {user.userData && !user.userData.subscribed? // check if user is subscribed
                <div className="subscription">
                    <p>You are not subscribed</p>
                    {/* call the checkout page */}
                    <Checkout user = "user.userData.subscribed"/> 
                </div>
                :   
                <div>You are subscribed!</div>
            }
        </div>
    )
}

export default Subscription


