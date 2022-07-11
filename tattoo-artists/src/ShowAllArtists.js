import React from 'react';
import axios from 'axios';
import { Button, Modal, Col, Row, Toast } from 'react-bootstrap';
import ContactFields from './ContactFields';
import StyleMultiSelect from './StyleMultiSelect';

export default class ShowAllArtists extends React.Component {
    url = "https://8888-evelyntys-project2restf-q3ufqgdmigx.ws-us53.gitpod.io/";

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
        showCreateToast: false,
        showReviews: false,
        editReview: false,
        reviewBeingEdited: {},
        editReviewEmail: "",
        correctReviewEmail: false,
        deleteReview: false,
        reviewBeingDeleted: {},
        deleteReviewEmail: "",
        correctDeleteEmail: false,
        updatedRating: 0,
        updatedComment: "",
        addReview: false,
        addReviewReviewer: "",
        addReviewEmail: "",
        addReviewRating: 0,
        addReviewComment: "",
    }

    AutoHideToast() {
        return (
            <Row>
                <Col xs={6}>
                    <Toast onClose={() => this.setState({
                        showCreateToast: false
                    })} show={this.state.showCreateToast} delay={3000} autohide>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                    </Toast>
                </Col>
                <Col xs={6}>
                    <Button onClick={() => this.setState({ showCreateToast: true })}>Show Toast</Button>
                </Col>
            </Row>
        );
    }

    // ToggleShowReviews(artist) {
    //     this.setState({
    //         showReviews: true,
    //         artistToShow: artist
    //     })
    // }

    async componentDidMount() {
        let response = await axios.get(this.url + 'show-artists');
        this.setState({
            data: response.data
        })
        console.log(response.data)
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showOneArtist = async (artist) => {
        this.setState({
            showOne: true,
            artistToShow: artist,
            modifiedArtistName: artist.name,
            modifiedGender: artist.gender,
            modifiedYearStarted: artist.yearStarted,
            modifiedApprentice: artist.apprentice,
            modifiedMethod: artist.method,
            modifiedTemporary: artist.temporary,
            modifiedStyle: artist.style,
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
        })
    }

    handleSelect = (data) => {
        this.setState({
            modifiedStyle: data
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
        console.log(this.state.modifiedPostal)
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
            this.setState({
                showOne: true,
                editMode: false,
                showConfirmEdit: false
            })
        }
        catch (e) {
            alert('error updating')
            console.log(e)
        }
    }

    ValidateFields(state, field) {
        if (this.state.submitted) {
            if (!state) {
                return (
                    <div style={{ "color": "red" }}>Please ensure that you fill in the {field}</div>
                )
            }
        }
    }

    ShowOneOrAll() {
        if (this.state.showOne) {
            if (!this.state.editMode) {
                return (
                    <React.Fragment key={this.state.artistToShow._id}>
                        <div className="card" style={{ "width": "20rem" }}>
                            <img src={this.state.artistToShow.image} style={{ "height": "auto" }} class="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{this.state.artistToShow.name}</h5>
                                <p className="card-text">
                                    Gender: {this.state.artistToShow.gender}<br />
                                    Years of experience: {this.state.artistToShow.yearsOfExperience}<br />
                                    Apprentice? {this.state.artistToShow.apprentice}<br />
                                    Methods: {this.state.artistToShow.method.map(a => (
                                        <span class="badge rounded-pill bg-secondary" key={a}>{a}</span>
                                    ))}<br />
                                    Temporary? {this.state.artistToShow.temporary}<br />
                                    Style: {this.state.artistToShow.style.map(a => (
                                        <span class="badge rounded-pill bg-secondary">{a.label}</span>
                                    ))}<br />
                                    Ink: {this.state.artistToShow.ink.map(a => (
                                        <span class="badge rounded-pill bg-secondary" key={a}>{a}</span>
                                    ))}<br />

                                    <h6>Contact: </h6>
                                    {this.state.artistToShow.contact.map(a => (
                                        <React.Fragment>
                                            <div><b>{a.contactKey}</b>: {a.contactValue}</div>
                                        </React.Fragment>
                                    ))}

                                    <div>
                                        studio name: {this.state.artistToShow.studio.name}<br />
                                        private studio: {this.state.artistToShow.studio.private} <br />
                                        address: {this.state.artistToShow.studio.address.street}, {this.state.artistToShow.studio.address.unit}, {this.state.artistToShow.studio.address.postal} <br />
                                        bookings required: {this.state.artistToShow.studio.bookingsRequired} <br />
                                        other services: {this.state.artistToShow.studio.otherServices} <br />
                                    </div>


                                    reviews:
                                    {this.state.artistToShow.reviews != undefined ?
                                        <div>{this.state.artistToShow.reviews.map(each => (
                                            each._id + each.reviewer + each.rating + each.comment
                                        ))}
                                        </div>
                                        :
                                        "no reviews available"}

                                </p>
                            </div>
                        </div>

                        <h1>hi! i am just one artist</h1>
                        <div className="container">
                            <h2>{this.state.artistToShow.name}</h2>
                            <h4>artist id: {this.state.artistToShow._id}</h4>
                            <p>gender: {this.state.artistToShow.gender}</p>
                        </div>
                        <div>
                            {this.ConfirmEdit()}
                            {this.ConfirmDelete(this.state.artistToShow)}
                            <button className="btn btn-secondary" onClick={() => {
                                this.setState({
                                    showOne: false
                                })
                            }}>return to all artists</button>
                        </div>
                    </React.Fragment>
                )
            }
            else {
                return (
                    <React.Fragment>
                        <div className="container">
                            <React.Fragment>
                                <div>
                                    <div className="container">
                                        <h1>Information about the artist</h1>
                                        <div>
                                            <label className="form-label">Name of tattoo artist: </label>
                                            <input type="text"
                                                className="form-control"
                                                placeholder="artist name"
                                                name="modifiedArtistName"
                                                value={this.state.modifiedArtistName}
                                                onChange={this.updateFormField} />
                                            {this.ValidateFields(this.state.modifiedArtistName, "artist name")}
                                        </div>

                                        <div>
                                            <label className="form-label">Gender: </label>

                                            <input type="radio" className="form-check-input mx-2"
                                                value="female" name="modifiedGender"
                                                checked={this.state.modifiedGender == "female"} onChange={this.updateFormField} />
                                            <label className="form-check-label">Female</label>

                                            <input type="radio" className="form-check-input mx-2"
                                                value="male" name="modifiedGender"
                                                checked={this.state.modifiedGender == "male"} onChange={this.updateFormField} />
                                            <label className="form-check-label">Male</label>

                                            <input type="radio" className="form-check-input mx-2"
                                                value="others" name="modifiedGender"
                                                checked={this.state.modifiedGender == "others"} onChange={this.updateFormField} />
                                            <label className="form-check-label">Others</label>
                                        </div>

                                        <div>
                                            <label className="form-label">Year started tattooing: </label>
                                            <input type="text" className="form-control"
                                                placeholder="year started tattooing" name="modifiedYearStarted" value={this.state.modifiedYearStarted}
                                                onChange={this.updateFormField} />
                                        </div>

                                        <div>
                                            <label className="form-label">Are you an apprentice? </label>

                                            <input type="radio" className="form-check-input mx-2"
                                                value="yes" name="modifiedApprentice"
                                                onChange={this.updateFormField} checked={this.state.modifiedApprentice == "yes"} />
                                            <label className="form-check-label">Yes</label>

                                            <input type="radio" className="form-check-input mx-2"
                                                value="no" name="modifiedApprentice"
                                                onChange={this.updateFormField} checked={this.state.modifiedApprentice == "no"} />
                                            <label className="form-check-label">No</label>
                                        </div>

                                        <div>
                                            <label className="form-label">Please select your method(s) of tattooing:</label>

                                            <input type="checkbox" className="form-check-input mx-2"
                                                value="handpoke" name="modifiedMethod"
                                                onChange={this.updateCheckboxes} checked={this.state.modifiedMethod.includes('handpoke')} />
                                            <label className="form-check-label">Handpoke</label>

                                            <input type="checkbox" className="form-check-input mx-2"
                                                value="machine" name="modifiedMethod"
                                                onChange={this.updateCheckboxes} checked={this.state.modifiedMethod.includes('machine')} />
                                            <label className="form-check-label">Machine</label>

                                            <input type="checkbox" className="form-check-input mx-2"
                                                value="jagua" name="modifiedMethod"
                                                onChange={this.updateCheckboxes} checked={this.state.modifiedMethod.includes('jagua')} />
                                            <label className="form-check-label">Jagua</label>
                                        </div>

                                        <div>
                                            <label className="form-label">Is it temporary? </label>
                                            <select class="form-select" aria-label="Default select example"
                                                onChange={this.updateFormField} value={this.state.modifiedTemporary} name="modifiedTemporary">
                                                <option value="no">No</option>
                                                <option value="yes">Yes</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
                                            <StyleMultiSelect handleSelect={this.handleSelect} style={this.state.modifiedStyle} />
                                        </div>


                                        <div>
                                            <label className="form-label">Please select your ink(s):</label>
                                            <input type="checkbox" className="form-check-input mx-2"
                                                value="black" name="modifiedInk"
                                                onChange={this.updateCheckboxes} checked={this.state.modifiedInk.includes('black')} />
                                            <label className="form-check-label">Black</label>

                                            <input type="checkbox" className="form-check-input mx-2"
                                                value="colours" name="modifiedInk"
                                                onChange={this.updateCheckboxes} checked={this.state.modifiedInk.includes('colours')} />
                                            <label className="form-check-label">Colours</label>

                                            <input type="checkbox" className="form-check-input mx-2"
                                                value="jagua" name="modifiedInk"
                                                onChange={this.updateCheckboxes} checked={this.state.modifiedInk.includes('jagua')} />
                                            <label className="form-check-label">Jagua</label>

                                            <input type="checkbox" className="form-check-input mx-2"
                                                value="uv" name="modifiedInk"
                                                onChange={this.updateCheckboxes} checked={this.state.modifiedInk.includes('uv')} />
                                            <label className="form-check-label">UV</label>
                                        </div>

                                        <label className="form-label">Please enter the artist's contact details: </label>
                                        <ContactFields handleAddClick={this.handleAddClick}
                                            inputList={this.state.modifiedContact}
                                            setInputList={this.updateData} />

                                        <div>
                                            <label className="form-label">Please provide an image link to the artist's reference artwork: </label>
                                            <input type="text" className="form-control" placeholder="image link" name="modifiedImage"
                                                onChange={this.updateFormField} value={this.state.modifiedImage} />
                                        </div>

                                    </div>

                                    <div className="container">
                                        <h1>Information about the studio</h1>
                                        <div>
                                            <label className="form-label">Name of studio: </label>
                                            <input type="text" className="form-control"
                                                placeholder="studio name" name="modifiedStudioName"
                                                value={this.state.modifiedStudioName}
                                                onChange={this.updateFormField} />
                                        </div>

                                        <div>
                                            <label className="form-label">Is it a private studio? </label>
                                            <input type="radio" className="form-check-input mx-2"
                                                value="yes" name="modifiedPrivate"
                                                onChange={this.updateFormField} checked={this.state.modifiedPrivate == "yes"} />
                                            <label className="form-check-label">Yes</label>

                                            <input type="radio" className="form-check-input mx-2"
                                                value="no" name="modifiedPrivate"
                                                onChange={this.updateFormField} checked={this.state.modifiedPrivate == "no"} />
                                            <label className="form-check-label">No</label>
                                        </div>

                                        <div>
                                            <label className="form-label">Are bookings required? </label>
                                            <input type="radio" className="form-check-input mx-2"
                                                value="yes" name="modifiedBookingsRequired"
                                                onChange={this.updateFormField} checked={this.state.modifiedBookingsRequired == "yes"} />
                                            <label className="form-check-label">Yes</label>

                                            <input type="radio" className="form-check-input mx-2"
                                                value="no" name="modifiedBookingsRequired"
                                                onChange={this.updateFormField} checked={this.state.modifiedBookingsRequired == "no"} />
                                            <label className="form-check-label">No</label>
                                        </div>

                                        <div>
                                            <h6>Address</h6>

                                            <label className="form-label">Street: (please enter "nil" if not applicable)</label>
                                            <input type="text" className="form-control" placeholder="street" name="modifiedStreet"
                                                value={this.state.modifiedStreet} onChange={this.updateFormField} />

                                            <label className="form-label">Unit: (please enter "nil" if not applicable)</label>
                                            <input type="text" className="form-control" placeholder="unit" name="modifiedUnit"
                                                value={this.state.modifiedUnit} onChange={this.updateFormField} />

                                            <label className="form-label">Postal Code: (please enter "000000" if not applicable)</label>
                                            <input type="text" className="form-control" placeholder="postal code" name="modifiedPostal"
                                                value={this.state.modifiedPostal} onChange={this.updateFormField} />
                                        </div>

                                        <div>
                                            <label className="form-label">Does your studio offer any other services? (please enter nil if no): </label>
                                            <input type="text" className="form-control" placeholder="e.g. piercings" name="modifiedOtherServices"
                                                value={this.state.modifiedOtherServices} onChange={this.updateFormField} />
                                        </div>

                                        <button className="btn btn-primary mt-2" onClick={this.updateArtist}>Update artist</button>
                                    </div>


                                </div>
                            </React.Fragment>

                        </div>
                    </React.Fragment>
                )
            }
        }
        else {
            // if (this.state.showReviews) {
            //     return (
            //         <React.Fragment>
            //             reviews:
            //             {this.state.artistToShow.reviews != undefined ?
            //                 <div>{this.state.artistToShow.reviews.map(
            //                     each => (
            //                         <div className="list-group">
            //                         <div className="list-group-item list-group-item-action">
            //                         <div className="d-flex w-100 justify-content-between">
            //                           <h5 className="mb-1">{each.reviewer}</h5>
            //                           <small className="text-muted">{each._id}</small>
            //                         </div>
            //                         <small className="text-muted">ratings: {each.rating} <i class="bi bi-star-fill"></i></small>
            //                         <p className="mb-1">{each.comment}</p>
            //                       </div>
            //                       </div>
            //                 ))}
            //                 </div>
            //                 :
            //                 "no reviews available"}
            //         </React.Fragment>
            //     )
            // }
            // else{
            return (
                <React.Fragment>
                    {this.state.data.map(e => (
                        <React.Fragment key={e._id}>
                            <div className="card" style={{ "width": "20rem" }}>
                                <img src={e.image} style={{ "height": "auto" }} class="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{e.name}</h5>
                                    <p className="card-text">
                                        Gender: {e.gender}<br />
                                        Years of experience: {e.yearsOfExperience}<br />
                                        Apprentice? {e.apprentice}<br />
                                        Methods: {e.method.map(a => (
                                            <span class="badge rounded-pill bg-secondary" key={a}>{a}</span>
                                        ))}<br />
                                        Temporary? {e.temporary}<br />
                                        Style: {e.style.map(a => (
                                            <span class="badge rounded-pill bg-secondary">{a.label}</span>
                                        ))}<br />
                                        Ink: {e.ink.map(a => (
                                            <span class="badge rounded-pill bg-secondary" key={a}>{a}</span>
                                        ))}<br />

                                        <h6>Contact: </h6>
                                        {e.contact.map(a => (
                                            <React.Fragment>
                                                <div><b>{a.contactKey}</b>: {a.contactValue}</div>
                                            </React.Fragment>
                                        ))}

                                        <div>
                                            studio name: {e.studio.name}<br />
                                            private studio: {e.studio.private} <br />
                                            address: {e.studio.address.street}, {e.studio.address.unit}, {e.studio.address.postal} <br />
                                            bookings required: {e.studio.bookingsRequired} <br />
                                            other services: {e.studio.otherServices} <br />
                                        </div>


                                        reviews:
                                        {e.reviews != undefined ?
                                            <div>{e.reviews.map(each => (
                                                each._id + each.reviewer + each.rating + each.comment
                                            ))}
                                            </div>
                                            :
                                            "no reviews available"}

                                    </p>
                                    <button className="btn btn-primary" onClick={() => this.showOneArtist(e)}>View</button>
                                    {this.ReviewsModal(e)}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </React.Fragment>
            )
        }
    }
    // }

    validateEditEmail(review) {
        if (this.state.editReviewEmail === review.email) {
            this.setState({
                correctReviewEmail: true
            })
        }
        console.log(review.email)
    }

    processDelete = async (id, confirmDeleteEmail) => {
        try {
            let response = await axios.delete(this.url + `tattoo-artist/${id}`, {
                email: confirmDeleteEmail
            })
            console.log(response.data)
        }
        catch (e) {
            alert(404)
            console.log(e)
            console.log(confirmDeleteEmail)
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
            showConfirmEdit: false
        });
        const handleShow = () => this.setState({
            showConfirmEdit: true
        });

        return (
            <React.Fragment>
                <Button variant="secondary" onClick={handleShow}>
                    Edit
                </Button>

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
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => { this.GoToEdit(this.state.confirmEditEmail, this.state.artistToShow.owner.email) }}>Confirm identity</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );

    }

    ConfirmDelete(artist) {

        const handleClose = () => this.setState({
            showConfirmDelete: false
        });
        const handleShow = () => this.setState({
            showConfirmDelete: true
        });

        return (
            <React.Fragment>
                <Button variant="danger" onClick={handleShow}>
                    Delete
                </Button>

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
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => { this.processDelete(artist._id, this.state.confirmDeleteEmail) }}>Confirm delete</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }


    ReviewsModal(artist) {
        return (
            <>
                <Button onClick={() => this.setState({
                    showReviews: true,
                    artistToShow: artist,
                })}>Show reviews</Button>
                <Modal
                    size="lg"
                    show={this.state.showReviews}
                    onHide={() => this.setState({
                        showReviews: false,
                        editReview: false
                    })}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title show={this.state.editReview} id="example-modal-sizes-title-lg">
                            {this.state.editReview ? <React.Fragment>Editing review</React.Fragment>
                                :
                                <React.Fragment>
                                    Showing reviews for {this.state.artistToShow.name}
                                </React.Fragment>
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.renderReviewModal()}
                    </Modal.Body>
                </Modal>
            </>
        );
        // else {
        //     return(
        //         <React.Fragment>
        //         <label>please confirm your email:</label>
        //         <input type="email" className="form-control"/>
        //         </React.Fragment>
        //     )
        //  }
    }

    renderReviewModal() {
        let contentToReturn = ""
        if (this.state.editReview && !this.state.correctReviewEmail) {
            contentToReturn =
                <React.Fragment>
                    <div>
                        <label>Please enter your email to confirm your identity:</label>
                        <input type="email" className="form-control" name="editReviewEmail" onChange={this.updateFormField} />
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => { this.validateEditEmail(this.state.reviewBeingEdited) }}>Confirm</button>
                        <button className="btn btn-secondary" onClick={() => {
                            this.setState({
                                editReview: false
                            })
                        }}>Cancel</button>
                    </div>
                </React.Fragment>
        }
        else if (this.state.editReview && this.state.correctReviewEmail) {
            contentToReturn =
                <React.Fragment>
                    <div className="list-group">
                        <div className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{this.state.reviewBeingEdited.reviewer}</h5>
                                <small className="text-muted">{this.state.reviewBeingEdited._id}</small>
                            </div>
                            <small className="text-muted">ratings: <input type="text" className="form-control"
                                name="updatedRating" value={this.state.updatedRating}
                                onChange={this.updateFormField} /> <i class="bi bi-star-fill"></i></small>
                            <p className="mb-1"><textarea className="form-control" name="updatedComment" value={this.state.updatedComment} onChange={this.updateFormField}>
                            </textarea></p>
                            <button className="btn btn-warning" onClick={this.updateReview}>Edit</button>
                            <button className="btn btn-secondary" onClick={() => {
                                this.setState({
                                    editReview: false
                                })
                            }}>Cancel</button>
                        </div>
                    </div>

                </React.Fragment>
        }
        else if (!this.state.editReview) {
            contentToReturn =
                <React.Fragment>
                    {this.state.artistToShow.reviews == undefined || this.state.artistToShow.reviews.length == 0 ?
                        <div>
                            <h1>no reviews available</h1>
                            <button className="btn btn-primary" onClick={() => {
                                this.setState({
                                    addReview: true
                                })
                            }}>Add a new review</button>
                        </div>
                        :
                        <div>
                            <div className="list-group">{this.state.artistToShow.reviews.map(
                                each => (
                                    <div className="list-group-item list-group-item-action">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{each.reviewer}</h5>
                                            <small className="text-muted">{each._id}</small>
                                        </div>
                                        <small className="text-muted">ratings: {each.rating} <i class="bi bi-star-fill"></i></small>
                                        <p className="mb-1">{each.comment}</p>
                                        <button className="btn btn-warning" onClick={() => { this.setState({ reviewBeingEdited: each, editReview: true, updatedRating: each.rating, updatedComment: each.comment }) }}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => { this.setState({ reviewBeingDeleted: each, deleteReview: true }) }}>Delete</button>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary" onClick={() => {
                                this.setState({
                                    addReview: true
                                })
                            }}>Add a new review</button>
                        </div>}
                </React.Fragment>
        }

        if (this.state.deleteReview) {
            contentToReturn =
                <React.Fragment>
                    Are you sure you want to delete this review?
                    <div className="list-group">
                        <div className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{this.state.reviewBeingDeleted.reviewer}</h5>
                                <small className="text-muted">{this.state.reviewBeingDeleted._id}</small>
                            </div>
                            <small className="text-muted">ratings: {this.state.reviewBeingDeleted.rating} <i class="bi bi-star-fill"></i></small>
                            <p className="mb-1">{this.state.reviewBeingDeleted.comment}</p>
                            <div>
                                <label>Please enter your email to confirm deletion</label>
                                <input type="email" name="deleteReviewEmail" onChange={this.updateFormField} />
                            </div>
                            <div>
                                <button className='btn btn-danger' onClick={this.validateDeleteEmail}>Confirm</button>
                                <button className='btn btn-secondary' onClick={() => {
                                    this.setState({
                                        deleteReview: false
                                    })
                                }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
        }

        if (this.state.addReview) {
            contentToReturn =
                <React.Fragment>
                    <div>
                        <label>Name: </label>
                        <input type="text" className="form-control" name="addReviewReviewer" value={this.state.addReviewReviewer} onChange={this.updateFormField} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" className="form-control" name="addReviewEmail" value={this.state.addReviewEmail} onChange={this.updateFormField} />
                    </div>
                    <div>
                        <label>Rating: </label>
                        <input type="text" className="form-control" name="addReviewRating" value={this.state.addReviewRating} onChange={this.updateFormField} />
                    </div>
                    <div>
                        <label>comment: </label>
                        <textarea className="form-control" name="addReviewComment" value={this.state.addReviewComment} onChange={this.updateFormField}>
                        </textarea>
                    </div>
                    <button className="btn btn-primary" onClick={this.addReview}>add review</button>
                </React.Fragment>
        }

        return contentToReturn
    }


    updateReview = async () => {
        try {
            let result = await axios.post(this.url + `reviews/${this.state.reviewBeingEdited._id}/edit`, {
                reviewer: this.state.reviewBeingEdited.reviewer,
                email: this.state.editReviewEmail,
                rating: this.state.updatedRating,
                comment: this.state.updatedComment
            })
            console.log(result)
        }
        catch (e) {
            console.log(e)
            alert('error udpating')
        }
        this.setState({
            editReview: false
        })
    }

    validateDeleteEmail = async () => {
        if (this.state.deleteReviewEmail === this.state.reviewBeingDeleted.email) {
            this.setState({
                correctDeleteEmail: true
            })
            try {
                let result = await axios.get(this.url + `reviews/${this.state.reviewBeingDeleted._id}/delete`);
                console.log(result)
            }
            catch (e) {
                console.log(e)
                alert('error deleting')
            }
        }
    }

    addReview = async () => {
        console.log(this.state.artistToShow._id)
        try {
            let result = await axios.post(this.url + `tattoo-artist/${this.state.artistToShow._id}/add-review`, {
                reviewer: this.state.addReviewReviewer,
                email: this.state.addReviewEmail,
                rating: this.state.addReviewRating,
                comment: this.state.addReviewComment
            })
            console.log(result)
        }
        catch (e) {
            console.log(e)
        }
        this.setState({
            addReview: false
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.ShowOneOrAll()}
            </React.Fragment>
        )
    }
}