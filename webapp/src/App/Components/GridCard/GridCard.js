import React from 'react'
import {Col} from 'antd'; //importing grid element from antd
import {IMAGE_URL} from '../../Config/Config.js'; //importing tmdp image baseurl
import './GridCard.scss';

function GridCard(props) {

    let { actor, key, image, movieId, movieName, characterName, actorName } = props
    const POSTER_SIZE = "w154"; //character/movie poster of width 154px

    if (actor) {
        return (
            // predefined large, medium and extra small values for size of images for responsiveness
            <Col key={key} lg={6} md={8} xs={24}>
                <div>
                    <img alt={characterName} src={`${IMAGE_URL}${POSTER_SIZE}${image}`} />
                </div>
                <div > <b> Character: {characterName} </b></div>
                <div > <b> Actor: {actorName} </b></div>
            </Col>
        )
    } else {
        return (
            // predefined large, medium and extra small values for size of images for responsiveness
            <Col key={key} lg={6} md={8} xs={24}>
                <div>
                    <a href={`/movie/${movieId}`} >
                        <img alt={movieName} src={image} />
                    </a>
                </div>
            </Col>
        )
    }

}

export default GridCard;