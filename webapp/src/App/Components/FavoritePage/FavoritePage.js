/* importing react components */
import React, { useEffect, useState } from 'react'
/* importing ant design components for styling */
import { Typography, Popover, Button } from 'antd';
/* importing Axios for creating HTTP request */
import axios from 'axios';
import './FavoritePage.scss';
/*importing redux components*/
import { useSelector } from 'react-redux';
/*importing API URLs for loading images */
import { IMAGE_URL, POSTER_SIZE } from '../../Config/Config.js'

/* Adding typography antd component for title styling */
const { Title } = Typography;

/**
 * Favorite Page includes the list of all the movies that an user has added to their favorite list.
 * This list is being fetched from database based on the objectId of a particular user from comments collection.
 */
function FavoritePage() {

    /*defining user states*/
    const user = useSelector(state => state.user)
    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    /**
     * this function is used to fetch the favorite movies marked by an user.
     * Here we have used Axios library to create HTTP requests.
     * It retrieves the data and adds it to the state to facilitate the application as needed.
     */

    const fetchFavoredMovie = () => {
        axios.post('/api/favorite/getFavoredMovie', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                    setLoading(false)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }

    /**
     * Removing movie object from the favorites list when clicked removed by passing movieId and user data.
     * @param {*} movieId 
     * @param {*} userFrom 
     */
    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }

        /**
         * removing movie from database and again fetching list of favorite movies.
         */
        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('Failed to Remove From Favorite')
                }
            })
    }

    /**
     * Displaying movie poster in favourite page
     */
    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_URL}${POSTER_SIZE}${favorite.moviePost}`} />
                    : "no image"}
            </div>
        );

        /**
         * Displaying time and remove button on favorite page
         */
        return <tr key={index}>

            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>

            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}> Remove </button></td>
        </tr>
    })

    /**
     * Displaying favorite page only if the user is authorised, else asking for logging in
     */
    return (
        <div className="favorite-main">
            <Title level={2} > Favorite Movies By Me </Title>
            <hr />
            {user.userData && !user.userData.isAuth ?
                <div className="favorite-user">
                    <p>Please Log in first...</p>
                    <a href="/login">Go to Login page</a>
                </div>
                :
                !Loading &&
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default FavoritePage