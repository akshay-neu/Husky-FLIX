import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
import './SingleComment.scss';

const { TextArea } = Input;


function SingleComment(props) {
    const user = useSelector(state => state.user);
    // We are using setCommentValue method to set the CommentValue
    const [CommentValue, setCommentValue] = useState("")
    // We are using setOpenReply method to set the variable OpenReply true or false. The dafault value for the OpenReply is set to false
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();


        // Here we have defined an object named variables where we are providing fields like writer, postId, responseTo and content from the userdata
        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }



        //This request will send the request to the backend
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    // If the response is true then we will set OpenReply variable to true;
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>


            {OpenReply &&
                <form className="form_scss"    onSubmit={onSubmit}>
                    <TextArea
                        className="textarea_scss"
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button className="button_scss"  onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment;
