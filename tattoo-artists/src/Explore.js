import React from 'react';
import axios from 'axios';
import { Modal, Accordion } from 'react-bootstrap';
import ContactFields from './ContactFields';
import StyleMultiSelect from './StyleMultiSelect';
import ValidateFields from './Validation';
import RenderFilters from './RenderFilters';
import ShowOneArtist from './ShowOneArtist';

export default class Explore extends React.Component {
    url = "https://8888-evelyntys-project2restf-q3ufqgdmigx.ws-us54.gitpod.io/";

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
        checkReviewEmail: false
    }

    showFilters = () => {
        this.setState({
            showFilters: !this.state.showFilters
        })
    }


    async componentDidMount() {
        let response = await axios.get(this.url + 'show-artists');
        this.setState({
            data: response.data
        })
        console.log(response.data)
    }

    ResetSearch = async () => {
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
            data: response.data
        })
    }

    setShowAll = () => {
        this.setState({
            showOne: false
        })
    }

    clickSearch = async () => {
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
            showFilters: false
        })
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
                submitted: false
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
                        <ShowOneArtist showOne={this.setShowAll} artistToShow={this.state.artistToShow}
                        styleKeys={this.styleKeys}
                        confirmEdit={this.confirmEdit} confirmDelete={this.confirmDelete} 
                        findInstagram={this.findInstagram} RenderReviews={this.RenderReviews()} />
                    </React.Fragment>
                )
            }
            // showing one artist in edit mode
            else {
                return (
                    <React.Fragment>
                        <div className="container mt-2">
                            <React.Fragment>
                                <div>
                                    <div className="container">
                                        <h1>Information about the artist</h1>
                                        <div className="row">
                                            <div className="col-12 col-md-6">
                                                <label className="form-label">Name of tattoo artist: </label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="artist name"
                                                    name="modifiedArtistName"
                                                    value={this.state.modifiedArtistName}
                                                    onChange={this.updateFormField} />
                                                {this.state.submitted ? <ValidateFields field="artist name" state={this.state.artistName} /> : null}
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label">Year started tattooing: </label>
                                                <input type="text" className="form-control"
                                                    placeholder="year started tattooing" name="modifiedYearStarted" value={this.state.modifiedYearStarted}
                                                    onChange={this.updateFormField} />
                                                {this.state.submitted ? <ValidateFields field="year" state={this.state.yearStarted} /> : null}
                                            </div>

                                            <div className="col-12 col-md-6 mt-md-2">
                                                <label className="form-label form-check-inline">Gender: </label>
                                                {this.genderRadio.map(each => (
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                        <input type="radio" className="form-check-input"
                                                            value={each.value} name="modifiedGender"
                                                            checked={this.state.modifiedGender === (each.value)} onChange={this.updateFormField} />
                                                        {each.label}</label>
                                                    </div>
                                                ))}

                                            </div>


                                            <div className="col-12 col-md-6 mt-md-2">
                                                <label className="form-label form-check-inline">Are you an apprentice? </label>
                                                {this.generalRadio.slice(0, 2).map(each => (
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                        <input type="radio" className="form-check-input"
                                                            value={each.value} name="modifiedApprentice"
                                                            onChange={this.updateFormField} checked={this.state.modifiedApprentice === (each.value)} />
                                                        {each.label}</label>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label">Please select your method(s) of tattooing:</label>
                                                {this.methodsCheckbox.map(each => (
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                        <input type="checkbox" className="form-check-input"
                                                            value={each.value} name="modifiedMethod"
                                                            onChange={this.updateCheckboxes} checked={this.state.modifiedMethod.includes(each.value)} />
                                                        {each.label}</label>
                                                    </div>
                                                ))}

                                            </div>
                                            {this.state.submitted ? <ValidateFields field="general-checkbox" state={this.state.modifiedMethod} message={"method"} /> : null}

                                            <div className="col-12 col-md-6">
                                                <label className="form-label">Is it temporary? </label>
                                                <select className="form-select" aria-label="Default select example"
                                                    onChange={this.updateFormField} value={this.state.modifiedTemporary} name="modifiedTemporary">
                                                    <option value="no">No</option>
                                                    <option value="yes">Yes</option>
                                                </select>
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <div>
                                                    <label className="form-label">Please select your ink(s):</label>
                                                </div>
                                                {this.inkCheckbox.map(each => (
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                        <input type="checkbox" className="form-check-input"
                                                            value={each.value} name="modifiedInk"
                                                            onChange={this.updateCheckboxes} checked={this.state.modifiedInk.includes(each.value)} />
                                                        {each.label}</label>
                                                    </div>
                                                ))}
                                                {this.state.submitted ? <ValidateFields field="general-checkbox" state={this.state.modifiedInk} message={"ink"} /> : null}
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
                                                <StyleMultiSelect handleSelect={this.handleSelectModified} style={this.state.modifiedStyle} />
                                                {this.state.submitted ? <ValidateFields field="style" state={this.state.modifiedStyle} /> : null}
                                            </div>

                                            <label className="form-label">Please enter the artist's contact details: </label>
                                            <ContactFields handleAddClick={this.handleAddClick}
                                                inputList={this.state.modifiedContact}
                                                setInputList={this.updateData} />
                                            {this.state.submitted ? <ValidateFields field="contact" state={this.state.modifiedContact} /> : null}
                                            <div>
                                                <label className="form-label">Please provide an image link to the artist's reference artwork: </label>
                                                <input type="text" className="form-control" placeholder="image link" name="modifiedImage"
                                                    onChange={this.updateFormField} value={this.state.modifiedImage} />
                                                {this.state.submitted ? <ValidateFields field="general" state={this.state.modifiedImage} message={"a reference image link"} /> : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <h1>Information about the studio</h1>
                                        <div className="row">
                                            <div className="col-12">
                                                <label className="form-label">Name of studio: </label>
                                                <input type="text" className="form-control"
                                                    placeholder="studio name" name="modifiedStudioName"
                                                    value={this.state.modifiedStudioName}
                                                    onChange={this.updateFormField} />
                                                {this.state.submitted ? <ValidateFields field="general" state={this.state.modifiedStudioName} message={"the studio name"} /> : null}
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label form-check-inline">Is it a private studio? </label>
                                                {this.generalRadio.slice(0, 2).map(each => (
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                        <input type="radio" className="form-check-input"
                                                            value={each.value} name="modifiedPrivate"
                                                            onChange={this.updateFormField} checked={this.state.modifiedPrivate === (each.value)} />
                                                        {each.label}</label>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label className="form-label form-check-inline">Are bookings required? </label>
                                                {this.generalRadio.slice(0, 2).map(each => (
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                        <input type="radio" className="form-check-input"
                                                            value={each.value} name="modifiedBookingsRequired"
                                                            onChange={this.updateFormField} checked={this.state.modifiedBookingsRequired === (each.value)} />
                                                        {each.label}</label>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="row">
                                                <h6>Address</h6>

                                                <div className="col-12">
                                                    <label className="form-label">Street: (please enter "nil" if not applicable)</label>
                                                    <input type="text" className="form-control" placeholder="street" name="modifiedStreet"
                                                        value={this.state.modifiedStreet} onChange={this.updateFormField} />
                                                    {this.state.submitted ? <ValidateFields field="general" state={this.state.modifiedStreet} message={"the street"} /> : null}
                                                </div>

                                                <div className="col-12 col-md-6">
                                                    <label className="form-label">Unit: (please enter "nil" if not applicable)</label>
                                                    <input type="text" className="form-control" placeholder="unit" name="modifiedUnit"
                                                        value={this.state.modifiedUnit} onChange={this.updateFormField} />
                                                    {this.state.submitted ? <ValidateFields field="unit" state={this.state.modifiedUnit} /> : null}
                                                </div>

                                                <div className="col-12 col-md-6">
                                                    <label className="form-label">Postal Code: (please enter "000000" if not applicable)</label>
                                                    <input type="text" className="form-control" placeholder="postal code" name="modifiedPostal"
                                                        value={this.state.modifiedPostal} onChange={this.updateFormField} />
                                                    {this.state.submitted ? <ValidateFields field="postal" state={this.state.modifiedPostal} /> : null}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="form-label">Does your studio offer any other services? (please enter nil if no): </label>
                                                <input type="text" className="form-control" placeholder="e.g. piercings" name="modifiedOtherServices"
                                                    value={this.state.modifiedOtherServices} onChange={this.updateFormField} />
                                                {this.state.submitted ? <ValidateFields field="general" state={this.state.modifiedOtherServices} message={"the services available"} /> : null}
                                            </div>
                                        </div>

                                        <button className="btn delete-button my-2 mx-1" onClick={this.updateArtist}>Update artist</button>
                                        <button className="btn cancel-button my-2 mx-1" onClick={() => { this.setState({ editMode: false, showConfirmEdit: false }) }}>Cancel</button>
                                    </div>


                                </div>
                            </React.Fragment>

                        </div>
                    </React.Fragment>
                )
            }
        }
        // showing all artists
        else {
            return (
                <React.Fragment>
                    {this.state.data.length ?
                        <div className="container d-flex flex-row flex-wrap justify-content-evenly">
                            {this.state.data.map(e => (
                                <React.Fragment key={"all" + e._id}>
                                    <div className="card mx-2 my-2" style={{ "width": "18rem" }}>
                                        <h4 className="card-title text-center">{this.findInstagram(e.contact)}</h4>
                                        <img src={e.image} style={{ "height": "180px", "width": "288px", "objectFit": "cover" }} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <div className="card-text">
                                                <h5 className="text-center card-name"> {e.name} </h5>
                                                <p className="text-center card-gender-all"> {e.gender} </p>
                                                <p className="text-center card-year-all"> tattooing since {e.yearStarted}</p>
                                                {/* Apprentice? {e.apprentice} */}
                                                <div className="text-center">
                                                    <div className="card-box-title-all">Method(s)</div>
                                                    <div>{e.method.map(a => (
                                                        <span className="span-body-all" key={a}><i className="bi bi-dot"></i>{a} </span>
                                                    ))}
                                                    </div>
                                                    {/* Temporary? {e.temporary} */}
                                                    <div className="card-box-title-all">Style(s)</div>
                                                    <div>{e.style.map(a => (
                                                        <div className="span-body-all" key={a}> <i className="bi bi-dot"></i>{this.styleKeys[a]['label'].toLowerCase()}</div>
                                                    ))}
                                                    </div>
                                                    <div className="card-box-title-all">Ink(s)</div>
                                                    <div>
                                                        {e.ink.map(a => (
                                                            <span className="span-body-all" key={a}><i className="bi bi-dot"></i>{a} </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn w-100 card-btn" onClick={() => this.showOneArtist(e)}>View</button>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        :
                        "no results found"}
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
                                                <div>
                                                    <h5 className="mb-1">{each.reviewer}</h5>
                                                </div>
                                                <div className="justify-content-end fs-6">
                                                    <button className="btn"
                                                        onClick={() => this.setState({
                                                            editReview: true,
                                                            reviewBeingEdited: each,
                                                            updatedRating: each.rating,
                                                            updatedComment: each.comment
                                                        })}><i className="bi bi-pencil-square"></i></button>

                                                    <button className="btn"
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
                                                        <button className="btn black-button mx-1" onClick={() => { this.validateEditEmail(this.state.reviewBeingEdited) }}>Confirm</button>
                                                        <button className="btn cancel-button mx-1" onClick={() => {
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
                                <button className="btn black-button mx-1" onClick={this.updateReview}>Edit</button>
                                <button className="btn cancel-button mx-1" onClick={() => {
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
                        <div className="my-1">
                            <button className='btn delete-button mx-1' onClick={this.validateDeleteReviewEmail}>Confirm</button>
                            <button className='btn cancel-button mx-1' onClick={() => {
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
                        <button className="btn cancel-button" onClick={handleClose}>
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
                        <button className="btn cancel-button" onClick={handleClose}>
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
                        <button className="btn black-button mx-1" onClick={this.AddReviewToArtist}>add review</button>
                        <button className="btn cancel-button mx-1" onClick={() => {
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
                        <button type="button" className={index <= this.state.updatedRating ? "on" : "off"}
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
                    deleteReview: false
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