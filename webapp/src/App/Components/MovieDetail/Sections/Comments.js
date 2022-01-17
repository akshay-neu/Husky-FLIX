/* importing react components */
import React, { useState } from 'react';
/* importing ant design components for styling */
import { Button, Input, Typography, } from 'antd';
/* importing Axios for creating HTTP request */
import axios from 'axios';
/* importing redux components*/
import { useSelector } from 'react-redux';
/* to import SingleComment component*/
import SingleComment from './SingleComment';
/* to import ReplyCommet component*/
import ReplyComment from './ReplyComment';
/* for scss styling*/
import './Comments.scss';


const { TextArea } = Input;
const { Title } = Typography;

/**
 * Comments function
 * Comments fucntion returns the comment component which lets the user to write a comment on the movie,
 * and to view comments of other users.
 * @param {*} props 
 */
function Comments(props) {

    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        /* a user can only submit a comment when once signed in */
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }
        console.log(variables)

        /* to save the comment in the comment section*/

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    return (
        <div>
            <br />
            <Title level={3} > Share your opinions about {props.movieTitle} </Title>
            <hr />
            {/* Comment Lists  */}
            {console.log(props.CommentLists)}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {/* if no comment exists for the movie */}
            {props.CommentLists && props.CommentLists.length === 0 &&
                <div className="comment_scss"  >
                    Be the first one who shares your thought about this movie
                </div>
            }

            {/* Root Comment Form */}
            <form className="comment_text"  onSubmit={onSubmit}>
                <TextArea
                    className="textarea_scss"
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                {/* on click of submit button, the comment gets posted */}
                <Button className="button_scss"  onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comments;
