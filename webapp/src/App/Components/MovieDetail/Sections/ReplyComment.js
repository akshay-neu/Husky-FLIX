import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';
import './ReplyComment.scss';

function ReplyComment(props) {

    // Here we are using setChildCommentNumber to set the reply on the comment
    // The deafult value of ChildCommentNumber is 0
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)

    const [OpenReplyComments, setOpenReplyComments] = useState(false)


    useEffect(() => {

        let commentNumber = 0;
        props.CommentLists.map((comment) => {
            //Here if the comment.responseTo is equals to its parentCommentID then we are incremeneting the commentNumber 
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        //Here we are setting ChildCommentNumber equal to the commentNUmber
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])


    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div className="singlecomment_scss" >
                        {/* Here we are sending comment postId refreshFunction to the SingleComment Component
                        So that we can add comment to the comment database */}
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        {/* Here we are sending commentLists parentCommentId postId refreshFunction to the Reply Comment component */}
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
        ))

    const handleChange = () => {

        setOpenReplyComments(!OpenReplyComments)
    }


    return (
        <div>
            {/* If the ChildCommentNumber is greater than 0 than will show this section */}
            {ChildCommentNumber > 0 &&
                <p 
                    onClick={handleChange} >
                    View {ChildCommentNumber} more comment(s)
             </p>
            }
            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment
