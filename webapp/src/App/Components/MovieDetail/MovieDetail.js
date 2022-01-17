import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';
import axios from 'axios';

import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import { API_URL, API_KEY, IMAGE_URL, IMAGE_SIZE } from '../../Config/Config.js';
import GridCards from '../GridCard/GridCard.js';
import MainImage from '../LandingPage/MainImage/MainImage.js';
import MovieInfo from './Sections/MovieInfo.js';
import Favorite from './Sections/Favorite.js';
import Trailer from './Sections/Trailer.js';
import './MovieDetail.scss';


function MovieDetailPage(props) {

    const movieId = props.match.params.movieId
    //These variables arte defined to setup a particular movie
    // Movie will hold the value of particular movie and setMovie will help us to fetch the value of that movie and will assign the response to Movie
    const [Movie, setMovie] = useState([])

    /**
     * Cast will hold all the cast
     * setCast will set the Cast variable
     * First from the Movie, it will get the cast
     * Then it will assign the value to the Cast Variable and then Cast will have the value
     */
    const [Casts, setCasts] = useState([])

    /**
     * Here we are using these variable just to make sure that when we 
     * click on the toggle button then we should be able to see the Cast...
     * 
     * if we click on Toggle button then setActorToggle will set the ActorToggle value to true
     * and if the value is true then we would be able to see all the cast.
     * Earlier we are providing false value to ActorToggle
     */
    const [CommentLists, setCommentLists] = useState([])

    /**
     * Here we are basically setting our MainImage
     * So for that we have taken a method setLoadingForMovie method and LoadingForMovie Variable
     */
    const [LoadingForMovie, setLoadingForMovie] = useState(true)

    /**
     * Here We are setting the actors on our GridCard Layout. When we will click the Actor Toggle Button, we would be able to see all the actors
     */
    const [LoadingForCasts, setLoadingForCasts] = useState(true)

    /**
     * Here we are setting Actor Toggle. It means that whether the actortoggle button is clicked or not
     */
    const [ActorToggle, setActorToggle] = useState(false)
    /**
     * Here we are setting movieVariable with the movieId
     */
    const movieVariable = {
        movieId: movieId
    }




    useEffect(() => {

        //Here endpointForMovieInfo is basically getting the api link
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)
        //Here we are fetching the comments form the database
        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    //Here we are setting the comments on th UI
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)
                /**
                 * Here Actor gridCard layout works starts
                 * We are first fetching the data from the API Link with the variable endpointForCasts
                 */
                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        // Here we are setting the Cast variable value
                        setCasts(result.cast)
                    })

                setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    //Here we are updating the comments
    /**
     * 
     * newComment is basically a our newComment which user has written and 
     * with the help of updateComment method we are updating our comment list on the UI
     */
    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>
            {/*  Here we loading Main Image on the Header*/}
            {!LoadingForMovie ?
                <MainImage
                    image={`${IMAGE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                :
                <div>loading...</div>
            }


            {/* This is basically our body where we are Mentiing our add to favorite button */}
            <div>

                <div className="bodyMovie">
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

    {/*  -------------------Movie TRAILER ------------------------------------------------------ */}
                <div>
                    <Trailer movie = {Movie.id}/>
                </div>
    {/* ---------------------------------------------------------------------------------------- */}



                {/* Movie Info */}
                {!LoadingForMovie ?
                    <MovieInfo movie={Movie} />
                    :
                    <div>loading...</div>
                }

                <br />
                {/* Actors Grid*/}

                <div className="actorGrid">
                    <Button onClick={toggleActorView}>Toggle Actor View </Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            !LoadingForCasts ? Casts.map((cast, index) => (
                                cast.profile_path &&
                                <GridCards actor image={cast.profile_path} characterName={cast.character} actorName={cast.name} />
                            )) :
                                <div>loading...</div>
                        }
                    </Row>
                }
                <br />
                {/* Here we are showing likedislike options */}
                <div className="likeDislikeButton">
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Here we are metioning the COmment section */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

            </div>

        </div>
    )
}

export default MovieDetailPage;

