import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactFields from '../components/general/ContactFields';
import StyleMultiSelect from '../components/general/StyleMultiSelect';
import axios from 'axios';
import ValidateFields from '../components/general/Validation';


export default class AddNewArtist extends React.Component {
    // GENERAL VARIABLES
    url = this.props.url;
    generalRadio = this.props.generalRadio;
    methodsCheckbox = this.props.methodsCheckbox;
    inkCheckbox = this.props.inkCheckbox;
    genderRadio = this.props.genderRadio;

    // STATE
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
        validateFirstPage: false
    }

    // GENERAL FIELDS UPDATE
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

    // UPDATE MULTI=SELECT
    handleSelect = (data) => {
        this.setState({
            style: data
        })
    }

    // UPDATE CONTACT FIELDS
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

    // VALIDATION
    ValidationChecker(field, state) {
        let content = true
        if (field.includes("name") && (!state || state.length < 2)) {
            content = false
        }

        if (field.includes("year") && (!state || isNaN(parseInt(state)))) {
            content = false
        }

        if (field.includes("general-checkbox") && state.length === 0) {
            content = false
        }

        if (field.includes("style") && (state.length === 0 || state === null || state.length > 3)) {
            content = false
        }

        if (field.includes('contact')) {
            if (!state[0].contactKey || !state[0].contactValue) {
                content = false
            }
            let instagram = state.find((element) => {
                return element.contactKey === 'instagram';
            })
            if (instagram) {
                if (!instagram.contactValue.includes('@'))
                    content = false
                else {
                    content = true
                }
            }
            else {
                content += false
            }

        }

        if (field.includes("general") && state.length === 0) {
            content = false
        }

        if (field.includes("unit") && (!state || !state.includes('#') || !state.includes('-'))) {
            content = false
        }

        if (field.includes("postal") && (!state || state.length !== 6 || isNaN(parseInt(state)))) {
            content = false
        }

        if (field.includes("email") && (!state || !state.includes('@') || !state.includes('.com'))) {
            content = false
        }

        return (
            content
        )
    }

    validateFirstPage = () => {
        this.setState({
            submitted: true
        })
        let validation =
            (this.ValidationChecker("artist name", this.state.artistName)) &&
            (this.ValidationChecker("year", this.state.yearStarted)) &&
            (this.ValidationChecker("general-checkbox", this.state.method)) &&
            (this.ValidationChecker("general-checkbox", this.state.ink)) &&
            (this.ValidationChecker("style", this.state.style)) &&
            (this.ValidationChecker("contact", this.state.contact)) &&
            (this.ValidationChecker("general", this.state.image))
        // console.log(validation)
        if (validation) {
            this.setState({
                firstPage: false,
                secondPage: true,
                submitted: false
            })
        }
    }

    validateSecondPage = () => {
        this.setState({
            submitted: true
        })
        let validation =
            (this.ValidationChecker("general", this.state.studioName)) &&
            (this.ValidationChecker("street", this.state.street)) &&
            (this.ValidationChecker("unit", this.state.unit)) &&
            (this.ValidationChecker("postal", this.state.postal)) &&
            (this.ValidationChecker("general", this.state.otherServices))
        console.log(validation)

        if (validation) {
            this.setState({
                firstPage: false,
                secondPage: false,
                thirdPage: true,
                submitted: false
            })
        }
    }

    // ERROR BORDERS FOR CONTACT FIELDS AND MULTI-SELECT RESPECTIVELY
    contactBorder() {
        if (this.state.submitted && !this.ValidationChecker('contact', this.state.contact)) {
            return "form-control error-border"
        }
        else {
            return "form-control"
        }
    }

    multiSelectBorder() {
        if (this.state.submitted & !this.ValidationChecker("style", this.state.style)) {
            return "basic-multi-select error-border"

        }
        else {
            return "basic-multi-select"
        }
    }

    // ADD PAGE TO RENDER
    renderSection() {

        let contentToRender = "";

        if (this.state.firstPage) {
            contentToRender =
                <div className="container">
                    <div className="container ps-0 my-4">
                        <div className="progress">
                            <div className="progress-bar" style={{ "width": "100%", "backgroundColor": "black" }}>
                                <span class="progress-icon" style={{ "color": "white", "backgroundColor": "black" }}>1</span>
                                <span class="progress-icon2" style={{ "color": "black", "backgroundColor": "white" }}>2</span>
                                <span class="progress-icon3" style={{ "color": "black", "backgroundColor": "white" }}>3</span>
                                <div class="progress-value"></div>
                            </div>
                        </div>
                    </div>
                    <h1>Information about the artist</h1>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label className="form-label">Name of tattoo artist: </label>
                            <input type="text"
                                className={"form-control" +
                                    (this.state.submitted &&
                                        (!this.state.artistName || this.state.artistName.length < 2)
                                        ? " error-border" : "")}
                                placeholder="artist name"
                                name="artistName"
                                value={this.state.artistName}
                                onChange={this.updateFormField} />
                            {this.state.submitted ? <ValidateFields field="artist name" state={this.state.artistName} /> : null}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Year started tattooing: </label>
                            <input type="text" className={"form-control" +
                                (this.state.submitted &&
                                    (!this.state.yearStarted || isNaN(parseInt(this.state.yearStarted))
                                    ) ? " error-border" : "")}
                                placeholder="year started tattooing" name="yearStarted" value={this.state.yearStarted}
                                onChange={this.updateFormField} />
                            {this.state.submitted ? <ValidateFields field="year" state={this.state.yearStarted} /> : null}
                        </div>

                        <div className="col-12 col-md-6 mt-md-2">
                            <label className="form-label form-check-inline">Gender: </label>
                            {this.props.genderRadio.map(each => (
                                <div className="form-check form-check-inline" key={'add-gender ' + each.value}>
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input"
                                            value={each.value} name="gender"
                                            checked={this.state.gender === each.value} onChange={this.updateFormField} />
                                        {each.label}</label>
                                </div>

                            ))}
                        </div>

                        <div className="col-12 col-md-6 mt-md-2">
                            <label className="form-label form-check-inline">Are you an apprentice? </label>
                            {this.props.generalRadio.slice(0, 2).map(each => (
                                <div className="form-check form-check-inline" key={'add-apprentice ' + each.value}>
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input"
                                            value={each.value} name="apprentice"
                                            onChange={this.updateFormField} checked={this.state.apprentice === each.value} />
                                        {each.label}</label>
                                </div>
                            ))}
                        </div>


                        <div className="col-12 col-md-6">
                            <label className="form-label">Please select your method(s) of tattooing: </label>
                            <div>
                                {this.props.methodsCheckbox.map(each => (
                                    <div className="form-check form-check-inline" key={'add-methods ' + each.value}>
                                        <label className="form-check-label">
                                            <input type="checkbox" className={"form-check-input" +
                                                (this.state.submitted && this.state.method.length === 0 ?
                                                    " error-border" : "")}
                                                value={each.value} name="method"
                                                onChange={this.updateCheckboxes} checked={this.state.method.includes(each.value)} />
                                            {each.label}</label>
                                    </div>
                                ))}
                                {this.state.submitted ? <ValidateFields field="general-checkbox" state={this.state.method} message={"method"} /> : null}
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Is it temporary? </label>
                            <select className={"form-select"} aria-label="select temporary"
                                onChange={this.updateFormField} value={this.state.temporary} name="temporary">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-6">
                            <div>
                                <label className="form-label">Please select your ink(s):</label>
                            </div>
                            {this.props.inkCheckbox.map(each => (
                                <div className="form-check form-check-inline" key={'add-ink ' + each.value}>
                                    <label className="form-check-label">
                                        <input type="checkbox" className={"form-check-input" +
                                            (this.state.submitted && this.state.ink.length === 0 ?
                                                " error-border" : "")}
                                            value={each.value} name="ink"
                                            onChange={this.updateCheckboxes} checked={this.state.ink.includes(each.value)} />
                                        {each.label}</label>
                                </div>
                            ))}
                            {this.state.submitted ? <ValidateFields field="general-checkbox" state={this.state.ink} message={"ink"} /> : null}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
                            <StyleMultiSelect handleSelect={this.handleSelect} style={this.state.style} border={this.multiSelectBorder()} />
                            {this.state.submitted ? <ValidateFields field="style" state={this.state.style} /> : null}
                        </div>

                        <label className="form-label">Please enter the artist's contact details: </label>
                        <ContactFields handleAddClick={this.handleAddClick}
                            inputList={this.state.contact}
                            setInputList={this.updateData} class={this.contactBorder()} />
                        {this.state.submitted ? <ValidateFields field="contact" state={this.state.contact} /> : null}

                        <div>
                            <label className="form-label">Please provide an image link to the artist's reference artwork: </label>
                            <input type="text" className={"form-control"
                                + (this.state.submitted && !this.state.image ? " error-border" : "")}
                                placeholder="image link" name="image"
                                onChange={this.updateFormField} value={this.state.image} />
                            {this.state.submitted ? <ValidateFields field="general" state={this.state.image} message={"a reference image link"} /> : null}
                        </div>
                    </div>

                    <div className="d-flex flex-end">
                        <button className="btn delete-button ms-auto my-2" onClick={this.validateFirstPage}>Next</button>
                    </div>
                </div>

        }

        else if (this.state.secondPage) {
            contentToRender = <div className="container">
                <div className="container ps-0 my-4">
                    <div className="progress">
                        <div className="progress-bar" style={{ "width": "100%", "backgroundColor": "black" }}>
                            <span class="progress-icon" style={{ "color": "white", "backgroundColor": "black" }}>1</span>
                            <span class="progress-icon2" style={{ "color": "white", "backgroundColor": "black" }}>2</span>
                            <span class="progress-icon3" style={{ "color": "black", "backgroundColor": "white" }}>3</span>
                            <div class="progress-value"></div>
                        </div>
                    </div>
                </div>
                <h1>Information about the studio</h1>
                <div className="row">
                    <div className="col-12">
                        <label className="form-label">Name of studio: </label>
                        <input type="text" className={"form-control" +
                            (this.state.submitted && !this.state.studioName
                                ? " error-border" : "")}
                            placeholder="studio name" name="studioName"
                            value={this.state.studioName}
                            onChange={this.updateFormField} />
                        {this.state.submitted ? <ValidateFields field="general" state={this.state.studioName} message={"the studio name"} /> : null}
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label form-check-inline">Is it a private studio? </label>
                        {this.props.generalRadio.slice(0, 2).map(each => (
                            <div className="form-check form-check-inline" key={"add-private " + each.value}>
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input"
                                        value={each.value} name="private"
                                        onChange={this.updateFormField} checked={this.state.private === each.value} />
                                    {each.label}</label>
                            </div>
                        ))}
                    </div>

                    <div className="col-12 col-md-6">

                        <label className="form-label form-check-inline">Are bookings required? </label>
                        {this.props.generalRadio.slice(0, 2).map(each => (
                            <div className="form-check form-check-inline" key={"add-bookings" + each.value}>
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input"
                                        value={each.value} name="bookingsRequired"
                                        onChange={this.updateFormField} checked={this.state.bookingsRequired === each.value} />
                                    {each.label}</label>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <h6>Address</h6>

                        <div className="col-12">
                            <label className="form-label">Street: (please enter "nil" if not applicable)</label>
                            <input type="text" className={"form-control" +
                                (this.state.submitted && !this.state.street ? " error-border" : "")}
                                placeholder="street" name="street"
                                value={this.state.street} onChange={this.updateFormField} />
                            {this.state.submitted ? <ValidateFields field="general" state={this.state.street} message={"the street"} /> : null}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Unit: (please enter "#00-00" if not applicable)</label>
                            <input type="text" className={"form-control" +
                                (this.state.submitted &&
                                    (!this.state.unit || !this.state.unit.includes('#')
                                        || !this.state.unit.includes('-')) ? " error-border" : "")}
                                placeholder="unit" name="unit"
                                value={this.state.unit} onChange={this.updateFormField} />
                            {this.state.submitted ? <ValidateFields field={"unit"} state={this.state.unit} /> : null}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Postal Code: (please enter "000000" if not applicable)</label>
                            <input type="text" className={"form-control" +
                                (this.state.submitted &&
                                    (!this.state.postal || this.state.postal.length !== 6
                                        || isNaN(parseInt(this.state.postal))) ? " error-border" : "")}
                                placeholder="postal code" name="postal"
                                value={this.state.postal} onChange={this.updateFormField} />
                            {this.state.submitted ? <ValidateFields field={"postal"} state={this.state.postal} /> : null}
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Does your studio offer any other services? (please enter nil if no, and separate with a ',' if more than 1): </label>
                        <input type="text" className={"form-control" +
                            (this.state.submitted && this.state.otherServices.length === 0 ? " error-border" : "")}
                            placeholder="e.g. piercings" name="otherServices"
                            value={this.state.otherServices} onChange={this.updateFormField} />
                        {this.state.submitted ? <ValidateFields field="general" state={this.state.otherServices} message={"the services available"} /> : null}
                    </div>
                </div>
                <div className="d-flex flex-end">
                    <button className="btn black-button my-2 ms-auto" onClick={() => {
                        this.setState({
                            firstPage: true,
                            secondPage: false,
                            thirdPage: false
                        })
                    }}>Previous</button>
                    <button className="btn delete-button my-2 mx-1" onClick={this.validateSecondPage}>Next</button>
                </div>
            </div>
        }
        else if (this.state.thirdPage) {
            contentToRender =
                <div className="container">
                    <div className="container ps-0 my-4">
                        <div className="progress">
                            <div className="progress-bar" style={{ "width": "100%", "backgroundColor": "black" }}>
                                <span class="progress-icon" style={{ "color": "white", "backgroundColor": "black" }}>1</span>
                                <span class="progress-icon2" style={{ "color": "white", "backgroundColor": "black" }}>2</span>
                                <span class="progress-icon3" style={{ "color": "white", "backgroundColor": "black" }}>3</span>
                                <div class="progress-value"></div>
                            </div>
                        </div>
                    </div>
                    <h1>your information</h1>
                    <label className="form-label">Your name: </label>
                    <input type="text" className={"form-control" +
                        (this.state.submitted &&
                            (!this.state.ownerName || this.state.ownerName.length < 2)
                            ? " error-border" : "")} placeholder="e.g. John Doe" name="ownerName"
                        value={this.state.ownerName} onChange={this.updateFormField} />
                    {this.state.submitted ? <ValidateFields field="name" state={this.state.ownerName} /> : null}

                    <label className="form-label">Your email: </label>
                    <input type="text" className={"form-control" +
                        (this.state.submitted &&
                            (!this.state.ownerEmail || !this.state.ownerEmail.includes('@')
                                || !this.state.ownerEmail.includes('.com')) ? " error-border" : "")}
                        placeholder="e.g. johndoe@email.com" name="ownerEmail"
                        value={this.state.ownerEmail} onChange={this.updateFormField} />
                    {this.state.submitted ? <ValidateFields field="email" state={this.state.ownerEmail} /> : null}

                    <div className="d-flex flex-end">
                        <button className="btn black-button my-2 ms-auto" onClick={() => {
                            this.setState({
                                firstPage: false,
                                secondPage: true,
                                thirdPage: false
                            })
                        }}>Previous</button>
                        <button className="btn delete-button my-2 mx-1" onClick={this.addData}>Add new artist</button>
                    </div>
                </div>

        }
        return contentToRender
    }

    // ADD DATA
    addData = async () => {
        this.setState({
            submitted: true
        })
        let validation =
            (this.ValidationChecker("name", this.state.ownerName)) &&
            (this.ValidationChecker("email", this.state.ownerEmail))
        if (validation) {
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
                { this.props.ChangePages('explore') }
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="header-banner">
                    <img className="header-image" src={require('../images/add-new.jpg')} alt="female artist tattooing a client" />
                    <div className="overlay d-flex align-items-center justify-content-center">
                        <h1>Add new artist</h1>
                    </div>
                </div>
                {this.renderSection()}
            </React.Fragment>

        )
    }
}