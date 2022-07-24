import React from 'react';

export default function RenderReviews(props) {
    let contentToReturn = "";
    if (!props.editReview || !props.correctReviewEmail) {
        contentToReturn =
            <div className="my-md-2">
                <h5>Reviews:</h5>
                {props.artistToShow.reviews === undefined || props.artistToShow.reviews.length === 0 ?
                    <div>
                        <h1>no reviews available</h1>
                        {props.RenderAddReview}
                        {props.showAddReviewButton ?
                            <button className="btn black-button my-2" onClick={props.addReviewButton}>
                                Add a new review</button>

                            :
                            ""
                        }
                    </div>
                    :
                    <div>
                        <div className="list-group">
                            {props.artistToShow.reviews.map(
                                each => (
                                    <div className="list-group-item my-1" key={each._id + "one"}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <div>
                                                <h5 className="mb-1">{each.reviewer}</h5>
                                            </div>
                                            <div className="justify-content-end fs-6">
                                                <button className="btn"
                                                    onClick={() => {props.startEditReview(each)}}> <i className="bi bi-pencil-square"></i></button>

                                                <button className="btn"
                                                    onClick={() => {props.startDeleteReview(each)}}><i className="bi bi-trash"></i></button>
                                            </div>
                                        </div>
                                        <small className="text-muted">
                                            ratings: {each.rating} &#9733;
                                        </small>
                                        <p className="mb-1">{each.comment}</p>
                                        {props.editReview && props.reviewBeingEdited === each ?
                                            <div>
                                                <div>
                                                    <label>Please enter your email to confirm your identity to edit this review:</label>
                                                    <input type="email" className="form-control" name="editReviewEmail" onChange={props.updateFormField} />
                                                </div>
                                                {!props.checkReviewEmail && !props.correctReviewEmail ? null : <div style={{ "color": "red" }}>sorry, it seems that you are not the owner of this review</div>}
                                                <div className="my-1">
                                                    <button className="btn delete-button my-2 mx-1" onClick={props.validateEditEmail}>Confirm</button>
                                                    <button className="btn black-button my-2 mx-1" onClick={props.cancelEditReview}>Cancel</button>
                                                </div>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                ))}
                        </div>
                        {props.RenderAddReview}
                        {props.showAddReviewButton ?
                            <button className="btn delete-button my-2" onClick={props.addReviewButton}>Add a new review</button>
                            :
                            null
                        }
                    </div>
                }
            </div >
    }
    if (props.editReview && props.correctReviewEmail) {
        contentToReturn =
            <React.Fragment>
                <div className="list-group">
                    <div className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{props.reviewBeingEdited.reviewer}</h5>
                            <small className="text-muted">{props.reviewBeingEdited._id}</small>
                        </div>

                        <small className="text-muted">ratings:
                            {props.EditStarRating}
                        </small>

                        <textarea className="form-control" name="updatedComment" value={props.updatedComment}
                            onChange={props.updateFormField}>
                        </textarea>
                        {props.submittedEditReview && props.updatedComment.length === 0 ?
                            <div style={{ "color": "red" }}>Please enter your review</div>
                            :
                            null}
                        <div className="my-2">
                            <button className="btn delete-button my-2 mx-1" onClick={props.updateReview}>Edit</button>
                            <button className="btn blacks-button my-2 mx-1" onClick={props.cancelEditReview}>Cancel</button>
                        </div>
                    </div>
                </div>

            </React.Fragment>
    }
    if (props.deleteReview) {
        contentToReturn =
            <React.Fragment>
                Are you sure you want to delete this review?
                <div className="list-group">
                    <div className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{props.reviewBeingDeleted.reviewer}</h5>
                            {/* <small className="text-muted">{this.state.reviewBeingDeleted._id}</small> */}
                        </div>
                        <small className="text-muted">ratings: {props.reviewBeingDeleted.rating} <i className="bi bi-star-fill"></i></small>
                        <p className="mb-1">{props.reviewBeingDeleted.comment}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label className="form-label">Please enter your email to confirm deletion: </label>
                        <input type="email" name="deleteReviewEmail" className="form-control" onChange={props.updateFormField} />
                    </div>
                    <div className="my-1">
                        <button className='btn delete-button my-2 mx-1' onClick={props.validateDeleteReviewEmail}>Confirm</button>
                        <button className='btn black-button my-2 mx-1' onClick={props.cancelDeleteReview}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
    }
    return(
        contentToReturn
    )
}