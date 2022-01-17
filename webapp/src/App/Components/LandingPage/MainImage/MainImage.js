import React from 'react'; 
//We are using Typography component from Ant Design to styling 
import {Typography} from 'antd';
import './MainImage.scss';

const { Title } = Typography;

function MainImage(props) {
    return (
        <div className="mainMovieImage" style={{background:
            `linear-gradient(to bottom, rgba(0,0,0,0)
    39%,rgba(0,0,0,0)
    41%,rgba(0,0,0,0.65)
    100%),
    url('${props.image}'), #1c1c1c`}}>
            <div>
                <div className="textPosition" >
                    {/* Movie Title */}
                    <Title className="styleHeading" level={2} > {props.title} </Title>
                    {/* Movie Description */}
                    <p className="styleIntro">{props.text} </p>
                </div>
            </div>
        </div>
    )
}

export default MainImage;