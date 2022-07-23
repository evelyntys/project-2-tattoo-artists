import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactFields from './ContactFields';
import StyleMultiSelect from './StyleMultiSelect';
import axios from 'axios';
import { Toast, ToastContainer, ProgressBar } from 'react-bootstrap';
import StepProgressBar from './TestProgressBar';
import ValidateFields from './Validation';


export default class AddNewArtist extends React.Component {
    url = this.props.url

    state = {
        artistName: "",
        gender: "others",
        yearStarted: "",
        apprentice: "no",
        method: [],
        temporary: "no",
        style: [],
        ink: [],
        contact: [{ contactKey: "", contactValue: "", }],
        image: "",
        ownerName: "",
        ownerEmail: "",
        studioName: "",
        private: "no",
        bookingsRequired: "no",
        street: "",
        unit: "",
        postal: "",
        otherServices: [],
        firstPage: true,
        secondPage: false,
        thirdPage: false,
        submitted: false,
        showCreateToast: false,
        addSuccess: false
    }

    renderToastContent() {
        let contentToRender = "";
        if (this.state.addSuccess) {
            contentToRender =
                <React.Fragment>
                    Your artist listing has been successfully created!
                </React.Fragment>
        }
        else {
            contentToRender =
                <React.Fragment>
                    There were some problems in adding a new artist, please check that you have filled in
                    the fields appropriately
                </React.Fragment>
        }
        return contentToRender
    }

    AutoHideToast() {
        return (
            <React.Fragment>
                <ToastContainer position="top-end">
                    <Toast onClose={() => this.setState({
                        showCreateToast: false
                    })} show={this.state.showCreateToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">{this.state.addSuccess ? 'Artist successfully added'
                                :
                                'Error!'
                            }</strong>
                        </Toast.Header>
                        <Toast.Body>{this.renderToastContent()}</Toast.Body>
                    </Toast>
                </ToastContainer>
                {/* <div className="progress my-2">
                    <div className="progress-bar bg-danger" role="progressbar" style={{ "width": "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}
                <h1>your information</h1>
                <label className="form-label">Your name: </label>
                <input type="text" className="form-control" placeholder="e.g. John Doe" name="ownerName"
                    value={this.state.ownerName} onChange={this.updateFormField} />
                {this.state.submitted? <ValidateFields field="name" state={this.state.ownerName}/> : " null"}

                <label className="form-label">Your email: </label>
                <input type="text" className="form-control" placeholder="e.g. johndoe@email.com" name="ownerEmail"
                    value={this.state.ownerEmail} onChange={this.updateFormField} />
                {this.state.submitted? <ValidateFields field="email" state={this.state.ownerEmail} /> : null}

                <div>
                    <button className="btn black-button my-2 mx-1" onClick={() => {
                        this.setState({
                            firstPage: false,
                            secondPage: true,
                            thirdPage: false
                        })
                    }}>previous</button>
                    <button className="btn delete-button my-2" onClick={this.addData}>Add new artist</button>
                </div>
            </React.Fragment>
        );
    }

    handleSelect = (data) => {
        this.setState({
            style: data
        })
    }

    handleAddClick = () => {
        this.setState({
            contact: [...this.state.contact, { contactKey: "", contactValue: "" }]
        })
    }

    updateData = (list) => {
        this.setState({
            contact: list
        })
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

    addData = async () => {
        this.setState({
            submitted: true,
            showCreateToast: true
        })
        try {
            let response = await axios.post(this.url + "add-new-artist", {
                name: this.state.artistName,
                gender: this.state.gender,
                yearStarted: this.state.yearStarted,
                apprentice: this.state.apprentice,
                method: this.state.method,
                temporary: this.state.temporary,
                style: this.state.style,
                ink: this.state.ink,
                contact: this.state.contact,
                image: this.state.image,
                studioName: this.state.studioName,
                private: this.state.private,
                bookingsRequired: this.state.bookingsRequired,
                street: this.state.street,
                unit: this.state.unit,
                postal: this.state.postal,
                otherServices: this.state.otherServices,
                ownerName: this.state.ownerName,
                ownerEmail: this.state.ownerEmail,
                studio: {
                    studioName: this.state.studioName,
                    private: this.state.private,
                    bookingsRequired: this.state.bookingsRequired,
                    address: {
                        street: this.state.street,
                        unit: this.state.unit,
                        postal: this.state.post
                    },
                    otherServices: this.state.otherServices,
                },
                owner: {
                    ownerName: this.state.ownerName,
                    ownerEmail: this.state.ownerEmail
                },
            })
            console.log(response.data)
            this.setState({
                addSuccess: true,
                artistName: "",
                gender: "others",
                yearStarted: "",
                apprentice: "no",
                method: [],
                temporary: "no",
                style: [],
                ink: [],
                contact: [{ contactKey: "", contactValue: "", }],
                image: "",
                ownerName: "",
                ownerEmail: "",
                studioName: "",
                private: "no",
                bookingsRequired: "no",
                street: "",
                unit: "",
                postal: "",
                otherServices: [],
                firstPage: true,
                secondPage: false,
                thirdPage: false,
                submitted: false,
            })
             {this.props.ChangePages('explore')}
        }
        catch (e) {
            this.setState({
                addSuccess: false,
            })
            console.log(e)
        }
    }

    renderSection() {

        let contentToRender = "";

        if (this.state.firstPage) {
            contentToRender =
                <div className="container">
                    {/* <div className="progress my-2">
                        <div className="progress-bar bg-danger" role="progressbar" style={{ "width": "33%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> */}
                    {/* <StepProgressBar/> */}
                    <h1>Information about the artist</h1>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label className="form-label">Name of tattoo artist: </label>
                            <input type="text"
                                className="form-control"
                                placeholder="artist name"
                                name="artistName"
                                value={this.state.artistName}
                                onChange={this.updateFormField} />
                            {this.state.submitted? <ValidateFields field="artist name" state={this.state.artistName}/> : null}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Year started tattooing: </label>
                            <input type="text" className="form-control"
                                placeholder="year started tattooing" name="yearStarted" value={this.state.yearStarted}
                                onChange={this.updateFormField} />
                            {this.state.submitted ? <ValidateFields field="year" state={this.state.yearStarted}/> : null}
                        </div>

                        <div className="col-12 col-md-6 mt-md-2">
                            <label className="form-label form-check-inline">Gender: </label>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input"
                                    value="female" name="gender"
                                    checked={this.state.gender === "female"} onChange={this.updateFormField} />
                                Female</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input"
                                    value="male" name="gender"
                                    checked={this.state.gender === "male"} onChange={this.updateFormField} />
                                Male</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input"
                                    value="others" name="gender"
                                    checked={this.state.gender === "others"} onChange={this.updateFormField} />
                                Others</label>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 mt-md-2">
                            <label className="form-label form-check-inline">Are you an apprentice? </label>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input"
                                    value="yes" name="apprentice"
                                    onChange={this.updateFormField} checked={this.state.apprentice === "yes"} />
                                Yes</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input"
                                    value="no" name="apprentice"
                                    onChange={this.updateFormField} checked={this.state.apprentice === "no"} />
                                No</label>
                            </div>
                        </div>


                        <div className="col-12 col-md-6">
                            <label className="form-label">Please select your method(s) of tattooing: </label>
                            <div>
                                <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input"
                                        value="handpoke" name="method"
                                        onChange={this.updateCheckboxes} checked={this.state.method.includes('handpoke')} />
                                    Handpoke</label>
                                </div>

                                <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input"
                                        value="machine" name="method"
                                        onChange={this.updateCheckboxes} checked={this.state.method.includes('machine')} />
                                    Machine</label>
                                </div>

                                <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input"
                                        value="jagua" name="method"
                                        onChange={this.updateCheckboxes} checked={this.state.method.includes('jagua')} />
                                    Jagua</label>
                                </div>
                                {this.state.submitted ? <ValidateFields field="general-checkbox" state={this.state.method} message={"method"}/> : null}
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Is it temporary? </label>
                            <select className="form-select" aria-label="Default select example"
                                onChange={this.updateFormField} value={this.state.temporary} name="temporary">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-6">
                            <div>
                                <label className="form-label">Please select your ink(s):</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"
                                    value="black" name="ink"
                                    onChange={this.updateCheckboxes} checked={this.state.ink.includes('black')} />
                                Black</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"
                                    value="colours" name="ink"
                                    onChange={this.updateCheckboxes} checked={this.state.ink.includes('colours')} />
                                Colours</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"
                                    value="jagua" name="ink"
                                    onChange={this.updateCheckboxes} checked={this.state.ink.includes('jagua')} />
                                Jagua</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"
                                    value="uv" name="ink"
                                    onChange={this.updateCheckboxes} checked={this.state.ink.includes('uv')} />
                                UV</label>
                            </div>
                            {this.state.submitted ? <ValidateFields field="general-checkbox" state={this.state.ink} message={"ink"} /> : null}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
                            <StyleMultiSelect handleSelect={this.handleSelect} style={this.state.style} />
                            {this.state.submitted ? <ValidateFields field="style" state={this.state.style} /> : null}
                        </div>

                        <label className="form-label">Please enter the artist's contact details: </label>
                        <ContactFields handleAddClick={this.handleAddClick}
                            inputList={this.state.contact}
                            setInputList={this.updateData} />
                        {this.state.submitted ? <ValidateFields field="contact" state={this.state.contact} /> : null}

                        <div>
                            <label className="form-label">Please provide an image link to the artist's reference artwork: </label>
                            <input type="text" className="form-control" placeholder="image link" name="image"
                                onChange={this.updateFormField} value={this.state.image} />
                            {this.state.submitted ? <ValidateFields field="general" state={this.state.image} message={"a reference image link"} /> : null}
                        </div>
                    </div>

                    <div>
                        <button className="btn delete-button my-2" onClick={() => {
                            this.setState({
                                firstPage: false,
                                secondPage: true
                            })
                        }}>next</button>
                    </div>
                </div>

        }

        else if (this.state.secondPage) {
            contentToRender = <div className="container">
                {/* <div className="progress my-2">
                    <div className="progress-bar bg-danger" role="progressbar" style={{ "width": "66%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}
                <h1>Information about the studio</h1>
                <div className="row">
                    <div className="col-12">
                        <label className="form-label">Name of studio: </label>
                        <input type="text" className="form-control"
                            placeholder="studio name" name="studioName"
                            value={this.state.studioName}
                            onChange={this.updateFormField} />
                        {this.state.submitted ? <ValidateFields field="general" state={this.state.studioName} message={"the studio name"} /> : null}
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label form-check-inline">Is it a private studio? </label>

                        <div className="form-check form-check-inline">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input"
                                value="yes" name="private"
                                onChange={this.updateFormField} checked={this.state.private === "yes"} />
                            Yes</label>
                        </div>

                        <div className="form-check form-check-inline">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input"
                                value="no" name="private"
                                onChange={this.updateFormField} checked={this.state.private === "no"} />
                            No</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        
                        <label className="form-label form-check-inline">Are bookings required? </label>

                        <div className="form-check form-check-inline">
                        <label className="form-check-label">
                        <input type="radio" className="form-check-input"
                            value="yes" name="bookingsRequired"
                            onChange={this.updateFormField} checked={this.state.bookingsRequired === "yes"} />
                        Yes</label>
                        </div>

                        <div className="form-check form-check-inline">
                        <label className="form-check-label">
                        <input type="radio" className="form-check-input"
                            value="no" name="bookingsRequired"
                            onChange={this.updateFormField} checked={this.state.bookingsRequired === "no"} />
                        No</label>
                        </div>
                    </div>

                    <div className="row">
                        <h6>Address</h6>

                        <div className="col-12">
                        <label className="form-label">Street: (please enter "nil" if not applicable)</label>
                        <input type="text" className="form-control" placeholder="street" name="street"
                            value={this.state.street} onChange={this.updateFormField} />
                        {this.state.submitted ? <ValidateFields field="general" state={this.state.street} message={"the street"} /> : null}
                        </div>

                        <div className="col-12 col-md-6">
                        <label className="form-label">Unit: (please enter "#00-00" if not applicable)</label>
                        <input type="text" className="form-control" placeholder="unit" name="unit"
                            value={this.state.unit} onChange={this.updateFormField} />
                        {this.state.submitted ? <ValidateFields field={"unit"} state={this.state.unit} />: null}
                        </div>

                        <div className="col-12 col-md-6">
                        <label className="form-label">Postal Code: (please enter "000000" if not applicable)</label>
                        <input type="text" className="form-control" placeholder="postal code" name="postal"
                            value={this.state.postal} onChange={this.updateFormField} />
                        {this.state.submitted ? <ValidateFields field={"postal"} state={this.state.postal}/> : null}
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Does your studio offer any other services? (please enter nil if no, and separate with a ',' if more than 1): </label>
                        <input type="text" className="form-control" placeholder="e.g. piercings" name="otherServices"
                            value={this.state.otherServices} onChange={this.updateFormField} />
                        {this.state.submitted? <ValidateFields field="general" state={this.state.otherServices} message={"the services available"} /> : null}
                    </div>
                </div>
                <div>
                    <button className="btn black-button my-2 mx-1" onClick={() => {
                        this.setState({
                            firstPage: true,
                            secondPage: false,
                            thirdPage: false
                        })
                    }}>previous</button>
                    <button className="btn delete-button my-2 mx-1" onClick={() => {
                        this.setState({
                            firstPage: false,
                            secondPage: false,
                            thirdPage: true
                        })
                    }}>next</button>
                </div>
            </div>
        }
        else if (this.state.thirdPage) {
            contentToRender =
                <div className="container">
                    {this.AutoHideToast()}
                </div>

        }
        return contentToRender
    }

    render() {

        return (
            <React.Fragment>
                <div className="header-banner">
                    <img className="header-image" src={require('./images/add-new.jpg')} alt="female artist tattooing a client" />
                    <div className="overlay d-flex align-items-center justify-content-center">
                        <h1>Add a new artist</h1>
                    </div>
                </div>
                {this.renderSection()}
            </React.Fragment>

        )
    }
}