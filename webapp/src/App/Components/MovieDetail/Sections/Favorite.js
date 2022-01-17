/* importing react components */
import React, { useEffect, useState } from 'react';
/* importing Axios for creating HTTP request */
import axios from 'axios';
/* importing ant design components for styling */
import { Button } from 'antd';
/*importing redux components*/
import { useSelector } from 'react-redux';

/**
 * Favorite Function
 * The function component displays all the movies in the favourite list of the user.
 * @param {*} props 
 * @returns
 */

function Favorite(props) {

    const user = useSelector(state => state.user)
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    const onClickFavorite = () => {

        /* Favourite section to be shown only after sign in*/
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            /* when we are already subscribed */
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            /* when we are not subscribed yet */

            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    }

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get Favorite Number')
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.subcribed)
                } else {
                    alert('Failed to get Favorite Information')
                }
            })

    }, [])


    return (
        <>
        {/* to add the movie, in user's favorite list */}
            <Button onClick={onClickFavorite} > {!Favorited ? "Add to Favorite" : "Not Favorite"} {FavoriteNumber}</Button>
        </>
    )
}

export default Favorite;

