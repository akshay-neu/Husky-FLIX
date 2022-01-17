/* importing react components */
import React from 'react';
/* importing ant design components for styling */
import { Descriptions, Badge } from 'antd';

/**
 * MovieInfo Function
 * The function component displays the details of a movie, like title, release_Date, revenue,
 * runtime, vote_average, vote_count, status, popularity.
 * @param {*} props -- movie 
 * @returns 
 */

function MovieInfo(props) {

    const { movie } = props;
    
    return (
        <Descriptions title="Movie Info" bordered>
        <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
        <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
        <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
        <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
        <Descriptions.Item label="vote_average" span={2}>
        {movie.vote_average}
        </Descriptions.Item>
        <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
        <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
        <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
      </Descriptions>
    )
}

export default MovieInfo;
