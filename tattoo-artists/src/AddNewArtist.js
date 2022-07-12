import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactFields from './ContactFields';
import Select from 'react-select';
import StyleMultiSelect from './StyleMultiSelect';
import axios from 'axios';
import { Col, Row, Toast, Button } from 'react-bootstrap'


export default class AddNewArtist extends React.Component {
    url = "https://8888-evelyntys-project2restf-q3ufqgdmigx.ws-us53.gitpod.io/"

    state = {
        artistName: "",
        gender: "others",
        yearStarted: "",
        apprentice: "no",
        method: [],
        temporary: "no",
        style: [],
        ink: [],
        contact: [{contactKey: "", contactValue: "",}],
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
        toastPosition: 'top-end'
    }

    AutoHideToast() {
        return (
            <Row>
                <Col xs={6}>
                    <Toast onClose={() => this.setState({
                        showCreateToast: false
                    })} show={this.state.showCreateToast} autohide position={this.state.toastPosition}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Success</strong>
                        </Toast.Header>
                        <Toast.Body>Your artist listing has been successfully created!</Toast.Body>
                    </Toast>
                </Col>
                <Col xs={6}>
                    <Button onClick={this.addData}>Add new artist</Button>
                </Col>
            </Row>
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
                showCreateToast: true
            })
        }
        catch (e) {
            alert('error adding')
            console.log(e)
        }
    }

    ValidatArtistName() {
        if (this.state.submitted) {
            if (!this.state.artistName || this.state.artistName.length < 2) {
                return (
                    <div style={{ "color": "red" }}>Please ensure that the artist name is at least 2 characters long</div>
                )
            }
        }
    }

    ValidateYearStarted(){
        if (this.state.submitted){
            if (!this.state.yearStarted || parseInt(this.state.yearStarted) === NaN){
                return (
                    <div style={{ "color": "red" }}>Please ensure that you fill in a valid year</div>
                )
            }
        }
    }

    ValidateMethod(){
        if (this.state.submitted){
            if (this.state.method == [] || this.state.method.length == 0){
                return (
                    <div style={{ "color": "red" }}>Please ensure that you select at least one method</div>
                )
            }
        }
    }

    ValidateStyle(){
        if (this.state.submitted){
            if (this.state.style.length == 0 || !this.state.style || this.state.style == null || this.state.style.length > 3){
                return (
                    <div style={{ "color": "red" }}>Please ensure that you select at least one and at most 3 styles</div>
                )
            }
        }
    }

    ValidateInk(){
        if (this.state.submitted){
            if (this.state.ink == [] || this.state.ink.length == 0){
                return (
                    <div style={{ "color": "red" }}>Please ensure that you select at least one type of ink</div>
                )
            }
        }
    }

    ValidateContact(){
        if (this.state.submitted){
            if (!this.state.contact[0].contactKey || !this.state.contact[0].contactValue){
                return (
                    <div style={{ "color": "red" }}>Please enter at least one contact information</div>
                )
            }
        }
    }

    ValidateImage(){
        if (this.state.submitted){
            if (!this.state.image){
                return(
                    <div style={{ "color": "red" }}>Please provide a reference image link</div>
                )
            }
        }
    }
    renderSection() {

        let contentToRender = "";

        if (this.state.firstPage) {
            contentToRender =
                <div className="container">
                    <div className="progress my-2">
                        <div className="progress-bar bg-danger" role="progressbar" style={{ "width": "33%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <h1>Information about the artist</h1>
                    <div>
                        <label className="form-label">Name of tattoo artist: </label>
                        <input type="text"
                            className="form-control"
                            placeholder="artist name"
                            name="artistName"
                            value={this.state.artistName}
                            onChange={this.updateFormField} />
                        {this.ValidatArtistName()}
                    </div>

                    <div>
                        <label className="form-label">Gender: </label>

                        <input type="radio" className="form-check-input mx-2"
                            value="female" name="gender"
                            checked={this.state.gender == "female"} onChange={this.updateFormField} />
                        <label className="form-check-label">Female</label>

                        <input type="radio" className="form-check-input mx-2"
                            value="male" name="gender"
                            checked={this.state.gender == "male"} onChange={this.updateFormField} />
                        <label className="form-check-label">Male</label>

                        <input type="radio" className="form-check-input mx-2"
                            value="others" name="gender"
                            checked={this.state.gender == "others"} onChange={this.updateFormField} />
                        <label className="form-check-label">Others</label>
                    </div>

                    <div>
                        <label className="form-label">Year started tattooing: </label>
                        <input type="text" className="form-control"
                            placeholder="year started tattooing" name="yearStarted"
                            onChange={this.updateFormField} />
                            {this.ValidateYearStarted()}
                    </div>

                    <div>
                        <label className="form-label">Are you an apprentice? </label>

                        <input type="radio" className="form-check-input mx-2"
                            value="yes" name="apprentice"
                            onChange={this.updateFormField} checked={this.state.apprentice == "yes"} />
                        <label className="form-check-label">Yes</label>

                        <input type="radio" className="form-check-input mx-2"
                            value="no" name="apprentice"
                            onChange={this.updateFormField} checked={this.state.apprentice == "no"} />
                        <label className="form-check-label">No</label>
                    </div>

                    <div>
                        <label className="form-label">Please select your method(s) of tattooing:</label>

                        <input type="checkbox" className="form-check-input mx-2"
                            value="handpoke" name="method"
                            onChange={this.updateCheckboxes} checked={this.state.method.includes('handpoke')} />
                        <label className="form-check-label">Handpoke</label>

                        <input type="checkbox" className="form-check-input mx-2"
                            value="machine" name="method"
                            onChange={this.updateCheckboxes} checked={this.state.method.includes('machine')} />
                        <label className="form-check-label">Machine</label>

                        <input type="checkbox" className="form-check-input mx-2"
                            value="jagua" name="method"
                            onChange={this.updateCheckboxes} checked={this.state.method.includes('jagua')} />
                        <label className="form-check-label">Jagua</label>
                        {this.ValidateMethod()}
                    </div>

                    <div>
                        <label className="form-label">Is it temporary? </label>
                        <select class="form-select" aria-label="Default select example"
                            onChange={this.updateFormField} value={this.state.temporary} name="temporary">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
                        <StyleMultiSelect handleSelect={this.handleSelect} style={this.state.style} />
                        {this.ValidateStyle()}
                    </div>


                    <div>
                        <label className="form-label">Please select your ink(s):</label>
                        <input type="checkbox" className="form-check-input mx-2"
                            value="black" name="ink"
                            onChange={this.updateCheckboxes} checked={this.state.ink.includes('black')} />
                        <label className="form-check-label">Black</label>

                        <input type="checkbox" className="form-check-input mx-2"
                            value="colours" name="ink"
                            onChange={this.updateCheckboxes} checked={this.state.ink.includes('colours')} />
                        <label className="form-check-label">Colours</label>

                        <input type="checkbox" className="form-check-input mx-2"
                            value="jagua" name="ink"
                            onChange={this.updateCheckboxes} checked={this.state.ink.includes('jagua')} />
                        <label className="form-check-label">Jagua</label>

                        <input type="checkbox" className="form-check-input mx-2"
                            value="uv" name="ink"
                            onChange={this.updateCheckboxes} checked={this.state.ink.includes('uv')} />
                        <label className="form-check-label">UV</label>
                        {this.ValidateInk()}
                    </div>

                    <label className="form-label">Please enter the artist's contact details: </label>
                    <ContactFields handleAddClick={this.handleAddClick}
                        inputList={this.state.contact}
                        setInputList={this.updateData} />
                        {this.ValidateContact()}

                    <div>
                        <label className="form-label">Please provide an image link to the artist's reference artwork: </label>
                        <input type="text" className="form-control" placeholder="image link" name="image"
                            onChange={this.updateFormField} value={this.state.image} />
                            {this.ValidateImage()}
                    </div>

                    <div>
                        <button className="btn btn-primary" onClick={() => {
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
                <div className="progress my-2">
                    <div className="progress-bar bg-danger" role="progressbar" style={{ "width": "66%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h1>Information about the studio</h1>
                <div>
                    <label className="form-label">Name of studio: </label>
                    <input type="text" className="form-control"
                        placeholder="studio name" name="studioName"
                        value={this.state.studioName}
                        onChange={this.updateFormField} />
                </div>

                <div>
                    <label className="form-label">Is it a private studio? </label>
                    <input type="radio" className="form-check-input mx-2"
                        value="yes" name="private"
                        onChange={this.updateFormField} checked={this.state.private == "yes"} />
                    <label className="form-check-label">Yes</label>

                    <input type="radio" className="form-check-input mx-2"
                        value="no" name="private"
                        onChange={this.updateFormField} checked={this.state.private == "no"} />
                    <label className="form-check-label">No</label>
                </div>

                <div>
                    <label className="form-label">Are bookings required? </label>
                    <input type="radio" className="form-check-input mx-2"
                        value="yes" name="bookingsRequired"
                        onChange={this.updateFormField} checked={this.state.bookingsRequired == "yes"} />
                    <label className="form-check-label">Yes</label>

                    <input type="radio" className="form-check-input mx-2"
                        value="no" name="bookingsRequired"
                        onChange={this.updateFormField} checked={this.state.bookingsRequired == "no"} />
                    <label className="form-check-label">No</label>
                </div>

                <div>
                    <h6>Address</h6>

                    <label className="form-label">Street: (please enter "nil" if not applicable)</label>
                    <input type="text" className="form-control" placeholder="street" name="street"
                        value={this.state.street} onChange={this.updateFormField} />

                    <label className="form-label">Unit: (please enter "nil" if not applicable)</label>
                    <input type="text" className="form-control" placeholder="unit" name="unit"
                        value={this.state.unit} onChange={this.updateFormField} />

                    <label className="form-label">Postal Code: (please enter "000000" if not applicable)</label>
                    <input type="text" className="form-control" placeholder="postal code" name="postal"
                        value={this.state.postal} onChange={this.updateFormField} />
                </div>

                <div>
                    <label className="form-label">Does your studio offer any other services? (please enter nil if no): </label>
                    <input type="text" className="form-control" placeholder="e.g. piercings" name="otherServices"
                        value={this.state.otherServices} onChange={this.updateFormField} />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={() => {
                        this.setState({
                            firstPage: true,
                            secondPage: false,
                            thirdPage: false
                        })
                    }}>previous</button>
                    <button className="btn btn-primary" onClick={() => {
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
                    <div className="progress my-2">
                        <div className="progress-bar bg-danger" role="progressbar" style={{ "width": "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <h1>your information</h1>
                    <label className="form-label">Your name: </label>
                    <input type="text" className="form-control" placeholder="e.g. John Doe" name="ownerName"
                        value={this.state.ownerName} onChange={this.updateFormField} />

                    <label className="form-label">Your email: </label>
                    <input type="text" className="form-control" placeholder="e.g. johndoe@email.com" name="ownerEmail"
                        value={this.state.ownerEmail} onChange={this.updateFormField} />

                    <div>
                        <button className="btn btn-primary" onClick={() => {
                            this.setState({
                                firstPage: false,
                                secondPage: true,
                                thirdPage: false
                            })
                        }}>previous</button>
                        {this.AutoHideToast()}
                    </div>
                </div>
        }
        return contentToRender
    }

    render() {

        return (
            <React.Fragment>
                {this.renderSection()}
            </React.Fragment>

        )
    }
}