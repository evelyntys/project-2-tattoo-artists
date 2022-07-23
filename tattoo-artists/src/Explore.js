import React from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import ValidateFields from './Validation';
import RenderFilters from './RenderFilters';
import ShowOneArtist from './ShowOneArtist';
import EditArtist from './EditArtist';
import ShowAllArtists from './ShowAllArtists';

export default class Explore extends React.Component {
    url = this.props.url;

    //have state for view-all (originally true) so that it will change to false whe nclick on artist
    //when click on view-all navbar, check if view-all is false => then change to true 
    styleKeys = this.props.styleKeys;

    generalRadio = this.props.generalRadio;

    methodsCheckbox = this.props.methodsCheckbox;

    inkCheckbox = this.props.inkCheckbox;

    genderRadio = this.props.genderRadio;

    state = {
        data: [],
        showConfirmDelete: false,
        confirmDeleteEmail: "",
        showConfirmEdit: false,
        confirmEditEmail: "",
        showOne: false,
        artistToShow: {},
        editMode: false,
        modifiedArtistName: "",
        modifiedGender: "",
        modifiedYearStarted: "",
        modifiedApprentice: "",
        modifiedMethod: [],
        modifiedTemporary: "",
        modifiedStyle: [],
        modifiedInk: [],
        modifiedContact: [{ contactKey: "", contactValue: "" }],
        modifiedImage: "",
        modifiedStudioName: "",
        modifiedPrivate: "no",
        modifiedBookingsRequired: "no",
        modifiedStreet: "",
        modifiedUnit: "",
        modifiedPostal: "",
        modifiedOtherServices: [],
        submitted: false,
        showValidateEmail: false,
        showReviews: false,
        editReview: false,
        reviewBeingEdited: {},
        editReviewEmail: "",
        correctReviewEmail: false,
        deleteReview: false,
        reviewBeingDeleted: {},
        deleteReviewEmail: "",
        correctDeleteReviewEmail: false,
        updatedRating: 0,
        updatedComment: "",
        addReview: false,
        addReviewReviewer: "",
        addReviewEmail: "",
        addReviewRating: 0,
        addReviewComment: "",
        showFilters: true,
        search: '',
        gender: "any",
        yearsOfExperience: "0",
        apprentice: "any",
        temporary: "any",
        method: [],
        style: [],
        ink: [],
        private: "any",
        bookingsRequired: "any",
        otherServices: [],
        showAddReviewButton: true,
        submittedReview: false,
        submittedEditReview: false,
        checkReviewEmail: false,
        showLoader: false
    }

    showFilters = () => {
        this.setState({
            showFilters: !this.state.showFilters
        })
    }


    async componentDidMount() {
        this.setState({
            showLoader: true
        })
        let response = await axios.get(this.url + 'show-artists');
        this.setState({
            data: response.data,
            showLoader: false
        })
        console.log(response.data)
    }

    ResetSearch = async () => {
        this.setState({
            showLoader: true
        })
        let response = await axios.get(this.url + 'show-artists');
        this.setState({
            search: '',
            gender: 'any',
            yearsOfExperience: "0",
            apprentice: 'any',
            temporary: 'any',
            method: [],
            style: [],
            ink: [],
            private: 'any',
            bookingsRequired: 'any',
            otherServices: [],
            data: response.data,
            showLoader: false
        })
    }

    setShowAll = () => {
        this.setState({
            showOne: false
        })
        if (window.innerWidth > 768){
            this.setState({
                showFilters: true
            })
        }
    }

    stopEdit = () => {
        this.setState({
            editMode: false,
            showConfirmEdit: false
        })
    }

    clickSearch = async () => {
        this.setState({
            showLoader: true
        })
        let styleQuery = this.state.style.map(value => value.value)
        let response = await axios.get(this.url +
            'show-artists?search=' + this.state.search
            + '&gender=' + this.state.gender
            + '&yearsOfExperience=' + this.state.yearsOfExperience
            + '&apprentice=' + this.state.apprentice
            + '&temporary=' + this.state.temporary
            + '&method=' + this.state.method
            + '&ink=' + this.state.ink
            + '&private=' + this.state.private
            + '&bookings=' + this.state.bookingsRequired
            + '&otherServices=' + this.state.otherServices, { params: { style: styleQuery } });
        this.setState({
            data: response.data,
            showLoader: false
        })
        if (window.innerWidth < 769) {
            this.setState({
                showFilters: false
            })
        }
        console.log(response.data)
    }

    findInstagram(array) {
        let instagram = array.find((element) => {
            return element.contactKey === 'instagram';
        })
        if (instagram) {
            return instagram.contactValue;
        }
        return 'nil'
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showOneArtist = async (artist) => {
        let updatedStyle = artist.style.map(style => this.styleKeys[style]);
        this.setState({
            showOne: true,
            artistToShow: artist,
            modifiedArtistName: artist.name,
            modifiedGender: artist.gender,
            modifiedYearStarted: artist.yearStarted,
            modifiedApprentice: artist.apprentice,
            modifiedMethod: artist.method,
            modifiedTemporary: artist.temporary,
            modifiedStyle: updatedStyle,
            modifiedInk: artist.ink,
            modifiedContact: artist.contact,
            modifiedImage: artist.image,
            modifiedStudioName: artist.studio.name,
            modifiedPrivate: artist.studio.private,
            modifiedBookingsRequired: artist.studio.bookingsRequired,
            modifiedStreet: artist.studio.address.street,
            modifiedUnit: artist.studio.address.unit,
            modifiedPostal: artist.studio.address.postal,
            modifiedOtherServices: artist.studio.otherServices,
            showFilters: false
        })
    }

    handleSelectModified = (data) => {
        this.setState({
            modifiedStyle: data
        })
    }

    handleSelectFilter = (data) => {
        this.setState({
            style: data
        })
    }

    handleAddClick = () => {
        this.setState({
            modifiedContact: [...this.state.modifiedContact, { contactKey: "", contactValue: "" }]
        })
    }

    updateData = (list) => {
        this.setState({
            modifiedContact: list
        })
    }

    updateCheckboxes = (e) => {
        if (this.state[e.target.name].includes(e.target.value)) {
            let indexToRemove = this.state[e.target.name].indexOf(e.target.value);

            let cloned = [...this.state[e.target.name].slice(0, indexToRemove),
            ...this.state[e.target.name].slice(indexToRemove + 1)]
            this.setState({
                [e.target.name]: cloned
            })
        }
        else {
            let cloned = [...this.state[e.target.name], e.target.value]
            this.setState({
                [e.target.name]: cloned
            })
        }
    }

    updateArtist = async () => {
        let id = this.state.artistToShow._id;
        this.setState({
            submitted: true
        })
        try {
            let response = await axios.put(this.url + `tattoo-artist/${id}`, {
                ownerEmail: this.state.confirmEditEmail,
                name: this.state.modifiedArtistName,
                gender: this.state.modifiedGender,
                yearStarted: this.state.modifiedYearStarted,
                apprentice: this.state.modifiedApprentice,
                method: this.state.modifiedMethod,
                temporary: this.state.modifiedTemporary,
                style: this.state.modifiedStyle,
                ink: this.state.modifiedInk,
                contact: this.state.modifiedContact,
                image: this.state.modifiedImage,
                studioName: this.state.modifiedStudioName,
                private: this.state.modifiedPrivate,
                bookingsRequired: this.state.modifiedBookingsRequired,
                street: this.state.modifiedStreet,
                unit: this.state.modifiedUnit,
                postal: this.state.modifiedPostal,
                otherServices: this.state.modifiedOtherServices,
                studio: {
                    studioName: this.state.modifiedStudioName,
                    private: this.state.modifiedPrivate,
                    bookingsRequired: this.state.modifiedBookingsRequired,
                    address: {
                        street: this.state.modifiedStreet,
                        unit: this.state.modifiedUnit,
                        postal: this.state.modifiedPostal
                    },
                    otherServices: this.state.modifiedOtherServices,
                }
            })
            console.log(response.data)
            let updatedResponse = await axios.get(this.url + 'show-artists');
            let updatedArtists = updatedResponse.data;
            let indexOfModified = updatedArtists.findIndex(artist => artist._id === this.state.artistToShow._id);
            this.setState({
                showOne: true,
                editMode: false,
                showConfirmEdit: false,
                data: updatedArtists,
                artistToShow: updatedArtists[indexOfModified],
                submitted: false,
                confirmEditEmail: false
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    ShowOneOrAll() {
        if (this.state.showOne) {
            // showing one artist, not editing
            if (!this.state.editMode) {
                return (
                    <React.Fragment>
                        <ShowOneArtist showAll={this.setShowAll} artistToShow={this.state.artistToShow}
                            styleKeys={this.styleKeys}
                            ConfirmEdit={this.ConfirmEdit()} ConfirmDelete={this.ConfirmDelete(this.state.artistToShow)}
                            findInstagram={this.findInstagram} RenderReviews={this.RenderReviews()} />

                    </React.Fragment>
                )
            }
            // showing one artist in edit mode
            else {
                return (
                    <React.Fragment>
                        <EditArtist modifiedArtistName={this.state.modifiedArtistName} updateFormField={this.updateFormField}
                            submitted={this.state.submitted} modifiedYearStarted={this.state.modifiedYearStarted}
                            genderRadio={this.genderRadio} modifiedGender={this.state.modifiedGender}
                            generalRadio={this.generalRadio} modifiedApprentice={this.state.modifiedApprentice}
                            methodsCheckbox={this.methodsCheckbox} updateCheckboxes={this.updateCheckboxes}
                            modifiedMethod={this.state.modifiedMethod} modifiedTemporary={this.state.modifiedTemporary}
                            modifiedStyle={this.state.modifiedStyle}
                            inkCheckbox={this.inkCheckbox} modifiedInk={this.state.modifiedInk}
                            handleSelectModified={this.handleSelectModified} updateData={this.updateData}
                            modifiedContact={this.state.modifiedContact} modifiedImage={this.state.modifiedImage}
                            modifiedStudioName={this.state.modifiedStudioName} modifiedPrivate={this.state.modifiedPrivate}
                            modifiedBookingsRequired={this.state.modifiedBookingsRequired} modifiedStreet={this.state.modifiedStreet}
                            modifiedUnit={this.state.modifiedUnit} modifiedPostal={this.state.modifiedPostal}
                            modifiedOtherServices={this.state.modifiedOtherServices} updateArtist={this.updateArtist}
                            stopEdit={this.stopEdit} />
                    </React.Fragment>
                )
            }
        }
        // showing all artists
        else {
            return (
                <React.Fragment>
                    {this.state.showLoader ? <div className="d-flex justify-content-center"><img src={require('./images/loader.gif')} alt="loader" /></div> :
                        (this.state.data.length ?
                            <ShowAllArtists data={this.state.data} styleKeys={this.styleKeys} showOneArtist={this.showOneArtist}
                                findInstagram={this.findInstagram} />
                            :
                            "no results found")
                    }
                </React.Fragment>
            )
        }
    }

    RenderReviews() {
        let contentToReturn = "";
        if (!this.state.editReview || !this.state.correctReviewEmail) {
            contentToReturn =
                <div className="my-md-2">
                    <h5>Reviews:</h5>
                    {this.state.artistToShow.reviews === undefined || this.state.artistToShow.reviews.length === 0 ?
                        <div>
                            <h1>no reviews available</h1>
                            {this.RenderAddReview()}
                            {this.state.showAddReviewButton ?
                                <button className="btn black-button my-2" onClick={() => {
                                    this.setState({
                                        addReview: true,
                                        showAddReviewButton: false
                                    })
                                }}>Add a new review</button>
                                :
                                ""
                            }
                        </div>
                        :
                        <div>
                            <div className="list-group">
                                {this.state.artistToShow.reviews.map(
                                    each => (
                                        <div className="list-group-item my-1" key={each._id + "one"}>
                                            <div className="d-flex w-100 justify-content-between">
                                                <h6 className="mb-1 align-self-center">{each.reviewer}</h6>
                                                <div className="justify-content-end">
                                                    <button className="btn btn-small p-1 review-btn"
                                                        onClick={() => this.setState({
                                                            editReview: true,
                                                            reviewBeingEdited: each,
                                                            updatedRating: each.rating,
                                                            updatedComment: each.comment
                                                        })}><i className="bi bi-pencil-square review-btn"></i></button>

                                                    <button className="btn btn-small p-1"
                                                        onClick={() => this.setState({
                                                            reviewBeingDeleted: each,
                                                            deleteReview: true
                                                        })}><i className="bi bi-trash"></i></button>
                                                </div>
                                            </div>
                                            <small className="text-muted">
                                                ratings: {each.rating} &#9733;
                                            </small>
                                            <p className="mb-1">{each.comment}</p>
                                            {this.state.editReview && this.state.reviewBeingEdited === each ?
                                                <div>
                                                    <div>
                                                        <label>Please enter your email to confirm your identity to edit this review:</label>
                                                        <input type="email" className="form-control" name="editReviewEmail" onChange={this.updateFormField} />
                                                    </div>
                                                    {!this.state.checkReviewEmail && !this.state.correctReviewEmail ? null : <div style={{ "color": "red" }}>sorry, it seems that you are not the owner of this review</div>}
                                                    <div className="my-1">
                                                        <button className="btn delete-button my-2 mx-1" onClick={() => { this.validateEditEmail(this.state.reviewBeingEdited) }}>Confirm</button>
                                                        <button className="btn black-button my-2 mx-1" onClick={() => {
                                                            this.setState({
                                                                editReview: false,
                                                                checkReviewEmail: false,
                                                                correctReviewEmail: false,
                                                                editReviewEmail: "",
                                                            })
                                                        }}>Cancel</button>
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                    ))}
                            </div>
                            {this.RenderAddReview()}
                            {this.state.showAddReviewButton ?
                                <button className="btn black-button my-2" onClick={() => {
                                    this.setState({
                                        addReview: true,
                                        showAddReviewButton: false
                                    })
                                }}>Add a new review</button>
                                :
                                null
                            }
                        </div>}
                </div>
        }

        if (this.state.editReview && this.state.correctReviewEmail) {
            contentToReturn =
                <React.Fragment>
                    <div className="list-group">
                        <div className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{this.state.reviewBeingEdited.reviewer}</h5>
                                <small className="text-muted">{this.state.reviewBeingEdited._id}</small>
                            </div>

                            <small className="text-muted">ratings:
                                {this.EditStarRating()}
                            </small>

                            <textarea className="form-control" name="updatedComment" value={this.state.updatedComment}
                                onChange={this.updateFormField}>
                            </textarea>
                            {this.state.submittedEditReview && this.state.updatedComment.length === 0 ?
                                <div style={{ "color": "red" }}>Please enter your review</div>
                                :
                                null}
                            <div className="my-2">
                                <button className="btn delete-button my-2 mx-1" onClick={this.updateReview}>Edit</button>
                                <button className="btn black-button my-2 mx-1" onClick={() => {
                                    this.setState({
                                        editReview: false,
                                        correctReviewEmail: false,
                                        editReviewEmail: ""
                                    })
                                }}>Cancel</button>
                            </div>
                        </div>
                    </div>

                </React.Fragment>
        }
        if (this.state.deleteReview) {
            contentToReturn =
                <React.Fragment>
                    Are you sure you want to delete this review?
                    <div className="list-group">
                        <div className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{this.state.reviewBeingDeleted.reviewer}</h5>
                                {/* <small className="text-muted">{this.state.reviewBeingDeleted._id}</small> */}
                            </div>
                            <small className="text-muted">ratings: {this.state.reviewBeingDeleted.rating} <i className="bi bi-star-fill"></i></small>
                            <p className="mb-1">{this.state.reviewBeingDeleted.comment}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label className="form-label">Please enter your email to confirm deletion: </label>
                            <input type="email" name="deleteReviewEmail" className="form-control" onChange={this.updateFormField} />
                        </div>
                        {!this.state.checkReviewEmail && !this.state.correctDeleteReviewEmail ? null : <div style={{ "color": "red" }}>sorry, it seems that you are not the owner of this review</div>}

                        <div className="my-1">
                            <button className='btn delete-button my-2 mx-1' onClick={this.validateDeleteReviewEmail}>Confirm</button>
                            <button className='btn black-button my-2 mx-1' onClick={() => {
                                this.setState({
                                    deleteReview: false
                                })
                            }}>Cancel</button>
                        </div>
                    </div>
                </React.Fragment>
        }
        return contentToReturn
    }

    validateEditEmail(review) {
        this.setState({
            checkReviewEmail: true
        })
        if (this.state.editReviewEmail === review.email) {
            this.setState({
                correctReviewEmail: true
            })
        }
        console.log(review.email)
    }

    processDelete = async (id, confirmDeleteEmail) => {
        try {
            let response = await axios.delete(this.url + `tattoo-artist/${id}?email=` + this.state.confirmDeleteEmail);
            const index = this.state.data.findIndex(artist => artist._id === this.state.artistToShow._id);
            const modifiedData = [...this.state.data.slice(0, index),
            ...this.state.data.slice(index + 1)]
            this.setState({
                showConfirmDelete: false,
                showOne: false,
                data: modifiedData,
                confirmDeleteEmail: ""
            })
            console.log(response.data)
        }
        catch (e) {
            console.log(e)
        }

    }

    GoToEdit(inputEmail, ownerEmail) {
        if (inputEmail === ownerEmail) {
            this.setState({
                editMode: true,
            })
        }
        else {
            this.setState({
                showValidateEmail: true
            })
        }
    }

    ConfirmEdit() {

        const handleClose = () => this.setState({
            showConfirmEdit: false,
            confirmEditEmail: ""
        });
        const handleShow = () => this.setState({
            showConfirmEdit: true
        });

        return (
            <React.Fragment>
                <button className="btn" onClick={handleShow}>
                    <i className="bi bi-pencil-square"></i>
                </button>

                <Modal
                    show={this.state.showConfirmEdit}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>

                        <Modal.Title>Confirm Edit Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to edit the record for {this.state.artistToShow.name}?
                        Please enter your email to confirm your identity:
                        <div>
                            <label className="form-label">Email: </label>
                            <input type="text" className="form-control" name="confirmEditEmail" placeholder="email" value={this.state.confirmEditEmail} onChange={this.updateFormField} />
                        </div>
                        {this.state.showValidateEmail ? <div style={{ "color": "red" }}> sorry, it seems that you are not the owner of this document</div>
                            : ""}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn black-button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="btn delete-button" onClick={() => { this.GoToEdit(this.state.confirmEditEmail, this.state.artistToShow.owner.email) }}>Confirm identity</button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );

    }

    ConfirmDelete(artist) {

        const handleClose = () => this.setState({
            showConfirmDelete: false,
            confirmDeleteEmail: ""
        });
        const handleShow = () => this.setState({
            showConfirmDelete: true
        });

        return (
            <React.Fragment>
                <button className="btn" onClick={handleShow}>
                    <i className="bi bi-trash"></i>
                </button>

                <Modal
                    show={this.state.showConfirmDelete}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete the record for {artist.name}?
                        Please enter your email to confirm deletion of this entry:
                        <div>
                            <label className="form-label">Email: </label>
                            <input type="text" className="form-control" name="confirmDeleteEmail" placeholder="email" value={this.state.confirmDeleteEmail} onChange={this.updateFormField} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn black-button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="btn delete-button" onClick={() => { this.processDelete(artist._id, this.state.confirmDeleteEmail) }}>Confirm delete</button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }

    RenderAddReview() {
        if (this.state.addReview) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <label>Name: </label>
                            <input type="text" className="form-control" name="addReviewReviewer" value={this.state.addReviewReviewer} onChange={this.updateFormField} />
                            {this.state.submittedReview ? <ValidateFields field="reviewer name" state={this.state.addReviewReviewer} /> : null}
                        </div>
                        <div className="col-6">
                            <label>Email: </label>
                            <input type="email" className="form-control" name="addReviewEmail" value={this.state.addReviewEmail} onChange={this.updateFormField} />
                            {this.state.submittedReview ? <ValidateFields field="email" state={this.state.addReviewEmail} /> : null}
                        </div>
                        <div>
                        </div>
                        <label>Rating: </label>
                        {/* <input type="text" className="form-control" name="addReviewRating" value={this.state.addReviewRating} onChange={this.updateFormField} /> */}
                        {this.AddStarRating()}
                        {this.state.submittedReview && this.state.addReviewRating === 0 ?
                            <div style={{ "color": "red" }}>
                                Please ensure that you select a rating
                            </div>
                            :
                            null}
                    </div>
                    <div>
                        <label>Comment: </label>
                        <textarea className="form-control" name="addReviewComment" value={this.state.addReviewComment} onChange={this.updateFormField}>
                        </textarea>
                        {this.state.submittedReview ? <ValidateFields field="general" state={this.state.addReviewComment} message={"the review"} /> : null}
                    </div>
                    <div className="my-2">
                        <button className="btn delete-button my-2 mx-1" onClick={this.AddReviewToArtist}>add review</button>
                        <button className="btn black-button my-2 mx-1" onClick={() => {
                            this.setState({
                                addReview: false,
                                showAddReviewButton: true
                            })
                        }}>cancel</button>
                    </div>
                </div>
            )
        }
    }

    AddStarRating = () => {
        return (
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button type="button" key={index} className={index <= this.state.addReviewRating ? "on" : "off"}
                            onClick={() => {
                                this.setState({
                                    addReviewRating: index
                                })
                            }}>
                            <span className="star">&#9733;</span></button>
                    )
                })}
            </div>
        );
    };

    EditStarRating = () => {
        return (
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button type="button" key={"edit" + index} className={index <= this.state.updatedRating ? "on" : "off"}
                            onClick={() => {
                                this.setState({
                                    updatedRating: index
                                })
                            }}>
                            <span className="star">&#9733;</span></button>
                    )
                })}
            </div>
        );
    };

    updateReview = async () => {
        this.setState({
            submittedEditReview: true
        })
        try {
            let result = await axios.post(this.url + `reviews/${this.state.reviewBeingEdited._id}/edit`, {
                reviewer: this.state.reviewBeingEdited.reviewer,
                email: this.state.editReviewEmail,
                rating: this.state.updatedRating,
                comment: this.state.updatedComment
            })
            let updatedResponse = await axios.get(this.url + `tattoo-artist/${this.state.artistToShow._id}`);
            console.log(result)
            this.setState({
                editReview: false,
                artistToShow: updatedResponse.data,
                correctReviewEmail: false,
                editReviewEmail: "",
                checkReviewEmail: false

            })
        }
        catch (e) {
            console.log(e)
        }
    }

    validateDeleteReviewEmail = async () => {
        this.setState({
            checkReviewEmail: true
        })
        if (this.state.deleteReviewEmail === this.state.reviewBeingDeleted.email) {
            this.setState({
                correctDeleteReviewEmail: true
            })
            try {
                let result = await axios.get(this.url + `reviews/${this.state.reviewBeingDeleted._id}/delete`, { params: { email: this.state.deleteReviewEmail } });
                let updatedResponse = await axios.get(this.url + `tattoo-artist/${this.state.artistToShow._id}`);
                this.setState({
                    deleteReviewEmail: "",
                    correctDeleteReviewEmail: false,
                    artistToShow: updatedResponse.data,
                    deleteReview: false,
                    checkReviewEmail: false
                })
            }
            catch (e) {
                console.log(e)
                alert('error deleting')
            }
        }
    }

    AddReviewToArtist = async () => {
        this.setState({
            submittedReview: true,
        })
        try {
            let result = await axios.post(this.url + `tattoo-artist/${this.state.artistToShow._id}/add-review`, {
                reviewer: this.state.addReviewReviewer,
                email: this.state.addReviewEmail,
                rating: this.state.addReviewRating,
                comment: this.state.addReviewComment
            })
            let updatedResponse = await axios.get(this.url + `tattoo-artist/${this.state.artistToShow._id}`);
            this.setState({
                addReview: false,
                showAddReviewButton: true,
                submittedReview: false,
                addReviewReviewer: "",
                addReviewEmail: "",
                addReviewRating: 1,
                addReviewComment: "",
                artistToShow: updatedResponse.data
            })
            console.log(result)
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        {!this.state.showOne ?
                            <div className="col-12 col-md-3">
                                {/* {this.renderFilters()} */}
                                <RenderFilters showFiltersState={this.state.showFilters}
                                    updateFormField={this.updateFormField} gender={this.state.gender}
                                    yearsOfExperience={this.state.yearsOfExperience} generalRadio={this.generalRadio}
                                    apprentice={this.state.apprentice} temporary={this.state.temporary}
                                    methodsCheckbox={this.methodsCheckbox} updateCheckboxes={this.updateCheckboxes}
                                    method={this.state.method} style={this.state.style} handleSelectFilter={this.handleSelectFilter}
                                    inkCheckbox={this.inkCheckbox} ink={this.state.ink} private={this.state.private}
                                    bookingsRequired={this.state.bookingsRequired} showFilters={this.showFilters}
                                    clickSearch={this.clickSearch} ResetSearch={this.ResetSearch} />
                            </div>
                            :
                            null
                        }
                        <div className={'col-12 ' + (this.state.showOne ? '' : 'col-md-9')}>
                            {!this.state.showOne ? <h3 className="mt-4">Showing {this.state.data.length} result(s): </h3>
                                :
                                null
                            }
                            {this.ShowOneOrAll()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}