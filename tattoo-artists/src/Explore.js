import React from 'react';
import axios from 'axios';
import { Modal, Accordion } from 'react-bootstrap';
import ContactFields from './ContactFields';
import StyleMultiSelect from './StyleMultiSelect';
import ValidateFields from './Validation';

export default class Explore extends React.Component {
    url = "https://8888-evelyntys-project2restf-q3ufqgdmigx.ws-us54.gitpod.io/";

    //have state for view-all (originally true) so that it will change to false whe nclick on artist
    //when click on view-all navbar, check if view-all is false => then change to true 
    styleKeys = {
        "surrealism": "Surrealism",
        "traditional-americana": "Traditional Americana",
        "traditional-japanese": "Traditional Japanese",
        "blackwork": "Blackwork",
        "minimalist": "Minimalist",
        "water-colour": "Water colour",
        "pet/animals": "Pet/Animals",
        "floral": "Floral"
    }

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
        gender: [],
        yearsOfExperience: [],
        apprentice: [],
        temporary: [],
        method: [],
        style: [],
        ink: [],
        private: [],
        bookingsRequired: [],
        otherServices: [],
        showAddReviewButton: true,
        submittedReview: false,
        submittedEditReview: false
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
            gender: [],
            apprentice: [],
            temporary: [],
            method: [],
            style: [],
            ink: [],
            private: [],
            bookingsRequired: [],
            otherServices: [],
            data: response.data
        })
    }

    renderFilters() {
        let filters = ""
        if (this.state.showFilters) {
            filters =
                <div style={{ "border": "1px solid gray", "borderRadius": "0.6px" }} className="mt-2">
                    <div className="container">
                        <div>

                            <label className="form-label me-2">Gender:</label>


                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="gender"
                                    value="female" onChange={this.updateCheckboxes}
                                    checked={this.state.gender.includes("female")} />
                                <label className="form-check-label">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="gender"
                                    value="male" onChange={this.updateCheckboxes}
                                    checked={this.state.gender.includes("male")} />
                                <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="gender"
                                    value="others" onChange={this.updateCheckboxes}
                                    checked={this.state.gender.includes("others")} />
                                <label className="form-check-label">Others</label>
                            </div>
                        </div>
                        {/* years of exp, ink, private, bookings required, other services */}

                        <div>
                            <div>
                                <label className="form-label me-2">Years of experience:</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="yearsOfExperience"
                                    value={1} onChange={this.updateCheckboxes}
                                    checked={this.state.yearsOfExperience.includes("1")} />
                                <label className="form-check-label">at least 1 year</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="yearsOfExperience"
                                    value={3} onChange={this.updateCheckboxes}
                                    checked={this.state.yearsOfExperience.includes("3")} />
                                <label className="form-check-label">at least 3 years</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="yearsOfExperience"
                                    value={5} onChange={this.updateCheckboxes}
                                    checked={this.state.yearsOfExperience.includes("5")} />
                                <label className="form-check-label">at least 5 years</label>
                            </div>
                        </div>

                        <div>

                            <label className="form-label me-2">Apprentice:</label>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="apprentice"
                                    value="yes" onChange={this.updateCheckboxes}
                                    checked={this.state.apprentice.includes("yes")} />
                                <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="apprentice"
                                    value="no" onChange={this.updateCheckboxes}
                                    checked={this.state.apprentice.includes("no")} />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>

                        <div>
                            <label className="form-label me-2">Temporary:</label>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="temporary"
                                    value="yes" onChange={this.updateCheckboxes}
                                    checked={this.state.temporary.includes("yes")} />
                                <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="temporary"
                                    value="no" onChange={this.updateCheckboxes}
                                    checked={this.state.temporary.includes("no")} />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>

                        <div>
                            <div>
                                <label className="form-label me-2">Method(s):</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="handpoke" name="method"
                                    onChange={this.updateCheckboxes} checked={this.state.method.includes('handpoke')} />
                                <label className="form-check-label">Handpoke</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="machine" name="method"
                                    onChange={this.updateCheckboxes} checked={this.state.method.includes('machine')} />
                                <label className="form-check-label">Machine</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="jagua" name="method"
                                    onChange={this.updateCheckboxes} checked={this.state.method.includes('jagua')} />
                                <label className="form-check-label">Jagua</label>
                            </div>
                        </div>

                        <div>
                            <label className="form-label me-2">Style(s):</label>
                            <StyleMultiSelect style={this.state.style} handleSelect={this.handleSelectFilter} />

                            {/* <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value='surrealism' onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes('surrealism')} />
                                <label className="form-check-label">Surrealism</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value="traditional-americana" onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes("traditional-americana")} />
                                <label className="form-check-label">Traditional Americana</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value="traditional-japanese" onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes("traditional-japanese")} />
                                <label className="form-check-label">Traditional Japanese</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value="blackwork" onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes("blackwork")} />
                                <label className="form-check-label"> Blackwork</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value="minimalist" onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes("minimalist")} />
                                <label className="form-check-label"> Minimalist</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value="water-colour" onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes("water-colour")} />
                                <label className="form-check-label"> Water Colour</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value="pet/animals" onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes("pet/animals")} />
                                <label className="form-check-label"> Pet/Animals</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value="floral" onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes("floral")} />
                                <label className="form-check-label"> Floral</label>
                            </div> */}

                        </div>

                        <div>
                            <div>
                                <label className="form-label">Ink(s):</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="black" name="ink"
                                    onChange={this.updateCheckboxes} checked={this.state.ink.includes('black')} />
                                <label className="form-check-label">Black</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="colours" name="ink"
                                    onChange={this.updateCheckboxes} checked={this.state.ink.includes('colours')} />
                                <label className="form-check-label">Colours</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="jagua" name="ink"
                                    onChange={this.updateCheckboxes} checked={this.state.ink.includes('jagua')} />
                                <label className="form-check-label">Jagua</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="uv" name="ink"
                                    onChange={this.updateCheckboxes} checked={this.state.ink.includes('uv')} />
                                <label className="form-check-label">UV</label>
                            </div>
                        </div>

                        {/* private */}

                        <div>
                            <label className="form-label me-2">Private Studio: </label>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="yes" name="private"
                                    onChange={this.updateCheckboxes} checked={this.state.private.includes("yes")} />
                                <label className="form-check-label">Yes</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="no" name="private"
                                    onChange={this.updateCheckboxes} checked={this.state.private.includes("no")} />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>

                        <div>
                            <label className="form-label me-2">Bookings required: </label>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="yes" name="bookingsRequired"
                                    onChange={this.updateCheckboxes} checked={this.state.bookingsRequired.includes("yes")} />
                                <label className="form-check-label">Yes</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="no" name="bookingsRequired"
                                    onChange={this.updateCheckboxes} checked={this.state.bookingsRequired.includes("no")} />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>

                        {/* other services */}

                        <div>
                            <label className="form-label me-2">Other services: </label>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="yes" name="otherServices"
                                    onChange={this.updateCheckboxes} checked={this.state.otherServices.includes("yes")} />
                                <label className="form-check-label">Yes</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input"
                                    value="no" name="otherServices"
                                    onChange={this.updateCheckboxes} checked={this.state.otherServices.includes("no")} />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>

                    </div>
                    <button className="btn black-button w-100" onClick={() => { this.setState({ showFilters: false }) }}><i className="bi bi-caret-up-fill"></i></button>
                </div>
        }
        // else {
        //     filters =
        //         <div style={{ "border": "1px solid black" }}>
        //             no filters yet
        //         </div>
        // }
        return (
            <React.Fragment>
                <h3>search for artist(s): </h3>
                <div className="row">
                    <div className="col-6 col-md-12 d-md-flex">
                        <input type="text" className="form-control me-md-1" placeholder="search for artist name, ig or studio..." name="search" onChange={this.updateFormField} value={this.state.search} />
                        <button className="btn black-button d-none d-md-block" onClick={this.clickSearch}><i className="bi bi-search"></i></button>
                    </div>
                    <div className="col-6 col-md-12 d-md-flex my-md-1">
                        <button className="btn black-button mx-1 d-md-none" onClick={this.clickSearch}><i className="bi bi-search"></i></button>
                        <button className="btn black-button mx-1 d-none d-md-block"
                            onClick={this.ResetSearch}>
                            Reset
                        </button>
                        <button className="btn black-button mx-1"
                            onClick={() => {
                                this.setState({
                                    showFilters: !this.state.showFilters
                                })
                            }}>
                            <i className="bi bi-funnel-fill"></i>
                        </button>
                        <button className="btn black-button mx-1 d-md-none"
                            onClick={this.ResetSearch}>
                            <i className="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                </div>
                {filters}
            </React.Fragment>
        )
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
        let multiSelectKeys = {
            "surrealism": { value: "surrealism", label: "Surrealism" },
            "traditional-americana": { value: "traditional-americana", label: "Traditional Americana" },
            "traditional-japanese": { value: "traditional-japanese", label: "Traditional Japanese" },
            "blackwork": { value: "blackwork", label: "Blackwork" },
            "minimalist": { value: "minimalist", label: "Minimalist" },
            "water-colour": { value: "water-colour", label: "Water colour" },
            "pet/animals": { value: "pet/animals", label: "Pet/Animals" },
            "floral": { value: "floral", label: "Floral" }
        }
        let updatedStyle = artist.style.map(style => multiSelectKeys[style]);
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
                        <div className="container">
                            <div>
                                <div>
                                    <button className="btn"
                                        onClick={() => {
                                            this.setState({
                                                showOne: false
                                            })
                                        }}><i className="bi bi-arrow-90deg-left"></i></button>
                                </div>
                                <div className="text-end">
                                    {this.ConfirmEdit()}
                                    {this.ConfirmDelete(this.state.artistToShow)}
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-12 col-md-4">
                            <h1 className="text-center d-block d-md-none">{this.findInstagram(this.state.artistToShow.contact)}</h1>
                            <div className="single-artist-image" style={{ "width": "100%"}}>
                                <img src={this.state.artistToShow.image} className="card-img-top" style={{ "objectFit": "cover", "height": "100%" }} alt="artist's artwork" />
                            </div>
                            </div>
                            <div className="col-12 col-md-8">
                            <h1 className="text-center d-none d-md-block">{this.findInstagram(this.state.artistToShow.contact)}</h1>
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header><h4>Artist's Details</h4></Accordion.Header>
                                    <Accordion.Body>
                                        <div className="text-center card-box">
                                            <p>{this.state.artistToShow.name}</p>
                                            <p>{this.state.artistToShow.gender}</p>
                                            <p>{this.state.artistToShow.yearsOfExperience} year(s) of experience</p>
                                            <p>{"currently " + (this.state.artistToShow.apprentice.includes('yes') ? `an apprentice` : `a tattoo artist`)}</p>
                                            <div className="text-center">
                                                <div className="card-box-title">Method(s)</div>
                                                <div>{this.state.artistToShow.method.map(a => (
                                                    <span className="span-body" key={a}><i className="bi bi-dot"></i>{a} </span>
                                                ))}
                                                </div>
                                                {/* Temporary? {e.temporary} */}
                                                <div className="card-box-title">Style(s)</div>
                                                <div>{this.state.artistToShow.style.map(a => (
                                                    <div className="span-body" key={a}> <i className="bi bi-dot"></i>{this.styleKeys[a].toLowerCase()}</div>
                                                ))}
                                                </div>
                                                <div className="card-box-title">Ink(s)</div>
                                                <div>
                                                    {this.state.artistToShow.ink.map(a => (
                                                        <span className="span-body" key={a}><i className="bi bi-dot"></i>{a} </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                    <div className="card-box-title"><i className="bi bi-person-hearts"></i> Contact </div>
                                                    <div className="card-box">
                                                    {this.state.artistToShow.contact.map(a => (
                                                        <div key={"contact" + a.contactKey}>
                                                            <b>{a.contactKey}</b>: {a.contactValue}</div>
                                                    ))}
                                                    </div>
                                                </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><h4>Studio Details</h4></Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="card-box">
                                                <p>{this.state.artistToShow.studio.name}</p>
                                                <p>{this.state.artistToShow.studio.private.includes('no') ? "shared studio" : "private studio"} </p>
                                                address: {this.state.artistToShow.studio.address.street}, {this.state.artistToShow.studio.address.unit}, {this.state.artistToShow.studio.address.postal} <br />
                                                <p>{this.state.artistToShow.studio.bookingsRequired.includes('no') ? null : "bookings required"} </p>
                                                {this.state.artistToShow.studio.otherServices.includes("nil") ? null : 'services available: ' + this.state.artistToShow.studio.otherServices}
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            </div>
                            </div>

                            <div className="mt-2">
                                {this.RenderReviews()}
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
            // showing one artist in edit mode
            else {
                return (
                    <React.Fragment>
                        <div className="container">
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
                                            {this.state.submitted? <ValidateFields field="artist name" state={this.state.artistName}/> : null}
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label">Year started tattooing: </label>
                                            <input type="text" className="form-control"
                                                placeholder="year started tattooing" name="modifiedYearStarted" value={this.state.modifiedYearStarted}
                                                onChange={this.updateFormField} />
                                            {this.state.submitted ? <ValidateFields field="year" state={this.state.yearStarted}/> : null}
                                        </div>

                                        <div className="col-12 col-md-6 mt-md-2">
                                            <label className="form-label form-check-inline">Gender: </label>

                                            <div className="form-check form-check-inline">
                                                <input type="radio" className="form-check-input"
                                                    value="female" name="modifiedGender"
                                                    checked={this.state.modifiedGender === "female"} onChange={this.updateFormField} />
                                                <label className="form-check-label">Female</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input type="radio" className="form-check-input"
                                                    value="male" name="modifiedGender"
                                                    checked={this.state.modifiedGender === "male"} onChange={this.updateFormField} />
                                                <label className="form-check-label">Male</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input type="radio" className="form-check-input"
                                                    value="others" name="modifiedGender"
                                                    checked={this.state.modifiedGender === "others"} onChange={this.updateFormField} />
                                                <label className="form-check-label">Others</label>
                                            </div>
                                        </div>


                                        <div className="col-12 col-md-6 mt-md-2">
                                            <label className="form-label form-check-inline">Are you an apprentice? </label>

                                            <div className="form-check form-check-inline">
                                                <input type="radio" className="form-check-input"
                                                    value="yes" name="modifiedApprentice"
                                                    onChange={this.updateFormField} checked={this.state.modifiedApprentice === "yes"} />
                                                <label className="form-check-label">Yes</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input type="radio" className="form-check-input"
                                                    value="no" name="modifiedApprentice"
                                                    onChange={this.updateFormField} checked={this.state.modifiedApprentice === "no"} />
                                                <label className="form-check-label">No</label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label">Please select your method(s) of tattooing:</label>

                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input"
                                                    value="handpoke" name="modifiedMethod"
                                                    onChange={this.updateCheckboxes} checked={this.state.modifiedMethod.includes('handpoke')} />
                                                <label className="form-check-label">Handpoke</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input"
                                                    value="machine" name="modifiedMethod"
                                                    onChange={this.updateCheckboxes} checked={this.state.modifiedMethod.includes('machine')} />
                                                <label className="form-check-label">Machine</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input"
                                                    value="jagua" name="modifiedMethod"
                                                    onChange={this.updateCheckboxes} checked={this.state.modifiedMethod.includes('jagua')} />
                                                <label className="form-check-label">Jagua</label>
                                            </div>
                                        </div>
                                        {this.state.submitted ? <ValidateFields field="general-checkbox" state={this.state.modifiedMethod} message={"method"}/> : null}

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

                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input"
                                                    value="black" name="modifiedInk"
                                                    onChange={this.updateCheckboxes} checked={this.state.modifiedInk.includes('black')} />
                                                <label className="form-check-label">Black</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input"
                                                    value="colours" name="modifiedInk"
                                                    onChange={this.updateCheckboxes} checked={this.state.modifiedInk.includes('colours')} />
                                                <label className="form-check-label">Colours</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input"
                                                    value="jagua" name="modifiedInk"
                                                    onChange={this.updateCheckboxes} checked={this.state.modifiedInk.includes('jagua')} />
                                                <label className="form-check-label">Jagua</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input"
                                                    value="uv" name="modifiedInk"
                                                    onChange={this.updateCheckboxes} checked={this.state.modifiedInk.includes('uv')} />
                                                <label className="form-check-label">UV</label>
                                            </div>
                                            {this.state.submitted ? <ValidateFields field="general-checkbox" state={this.state.modifiedInk} message={"ink"}/> : null}
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
                                            <StyleMultiSelect handleSelect={this.handleSelectModified} style={this.state.modifiedStyle} />
                                            {this.state.submitted ? <ValidateFields field="style" state={this.state.modifiedStyle}/> : null}
                                        </div>

                                        <label className="form-label">Please enter the artist's contact details: </label>
                                        <ContactFields handleAddClick={this.handleAddClick}
                                            inputList={this.state.modifiedContact}
                                            setInputList={this.updateData} />
                                        {this.state.submitted ? <ValidateFields field="contact" state={this.state.modifiedContact}/> : null}
                                        <div>
                                            <label className="form-label">Please provide an image link to the artist's reference artwork: </label>
                                            <input type="text" className="form-control" placeholder="image link" name="modifiedImage"
                                                onChange={this.updateFormField} value={this.state.modifiedImage} />
                                            {this.state.submitted ? <ValidateFields field="general" state={this.state.modifiedImage} message={"a reference image link"}/> : null}
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
                                            {this.state.submitted ? <ValidateFields field="general" state={this.state.modifiedStudioName} message={"the studio name"}/> : null}
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label form-check-inline">Is it a private studio? </label>

                                            <div className="form-check form-check-inline">
                                            <input type="radio" className="form-check-input"
                                                value="yes" name="modifiedPrivate"
                                                onChange={this.updateFormField} checked={this.state.modifiedPrivate === "yes"} />
                                            <label className="form-check-label">Yes</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                            <input type="radio" className="form-check-input"
                                                value="no" name="modifiedPrivate"
                                                onChange={this.updateFormField} checked={this.state.modifiedPrivate === "no"} />
                                            <label className="form-check-label">No</label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label className="form-label form-check-inline">Are bookings required? </label>

                                            <div className="form-check form-check-inline">
                                            <input type="radio" className="form-check-input"
                                                value="yes" name="modifiedBookingsRequired"
                                                onChange={this.updateFormField} checked={this.state.modifiedBookingsRequired === "yes"} />
                                            <label className="form-check-label">Yes</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                            <input type="radio" className="form-check-input"
                                                value="no" name="modifiedBookingsRequired"
                                                onChange={this.updateFormField} checked={this.state.modifiedBookingsRequired === "no"} />
                                            <label className="form-check-label">No</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <h6>Address</h6>

                                            <div className="col-12">
                                            <label className="form-label">Street: (please enter "nil" if not applicable)</label>
                                            <input type="text" className="form-control" placeholder="street" name="modifiedStreet"
                                                value={this.state.modifiedStreet} onChange={this.updateFormField} />
                                            {this.state.submitted ? <ValidateFields field="general" state={this.state.modifiedStreet} message={"the street"}/> : null}
                                            </div>

                                            <div className="col-12 col-md-6">
                                            <label className="form-label">Unit: (please enter "nil" if not applicable)</label>
                                            <input type="text" className="form-control" placeholder="unit" name="modifiedUnit"
                                                value={this.state.modifiedUnit} onChange={this.updateFormField} />
                                            {this.state.submitted ? <ValidateFields field="unit" state={this.state.modifiedUnit}/> : null}
                                            </div>

                                            <div className="col-12 col-md-6">
                                            <label className="form-label">Postal Code: (please enter "000000" if not applicable)</label>
                                            <input type="text" className="form-control" placeholder="postal code" name="modifiedPostal"
                                                value={this.state.modifiedPostal} onChange={this.updateFormField} />
                                            {this.state.submitted ? <ValidateFields field="postal" state={this.state.modifiedPostal}/> : null}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="form-label">Does your studio offer any other services? (please enter nil if no): </label>
                                            <input type="text" className="form-control" placeholder="e.g. piercings" name="modifiedOtherServices"
                                                value={this.state.modifiedOtherServices} onChange={this.updateFormField} />
                                            {this.state.submitted ? <ValidateFields field="general" state={this.state.modifiedOtherServices} message={"the services available"}/> : null}
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
                                                <h5 className="text-center"> {e.name} </h5>
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
                                                        <div className="span-body-all" key={a}> <i className="bi bi-dot"></i>{this.styleKeys[a].toLowerCase()}</div>
                                                    ))}
                                                    </div>
                                                    <div className="card-box-title-all">Ink(s)</div>
                                                    <div>
                                                        {e.ink.map(a => (
                                                            <span className="span-body-all" key={a}><i className="bi bi-dot"></i>{a} </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* <div>
                                                    <div className="card-box-title"><i className="bi bi-person-hearts"></i> Contact </div>
                                                    <div className="card-box">
                                                    {e.contact.map(a => (
                                                        <div key={"contact" + a.contactKey}>
                                                            <b>{a.contactKey}</b>: {a.contactValue}</div>
                                                    ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="card-box-title"><i className="bi bi-house-fill"></i> Studio </div>
                                                    <div className="card-box">
                                                    <p>{e.studio.name}</p>
                                                    <p>{e.studio.private.includes('no') ? "shared studio" : "private studio"} </p> */}
                                                {/* address: {e.studio.address.street}, {e.studio.address.unit}, {e.studio.address.postal} <br /> */}
                                                {/* <p>{e.studio.bookingsRequired.includes('no') ? null : "bookings required"} </p>
                                                   {e.studio.otherServices.includes("nil") ? null : 'services available: ' + e.studio.otherServices}
                                                   </div>
                                                </div> */}
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
                                                    <div className="my-1">
                                                        <button className="btn black-button mx-1" onClick={() => { this.validateEditEmail(this.state.reviewBeingEdited) }}>Confirm</button>
                                                        <button className="btn cancel-button mx-1" onClick={() => {
                                                            this.setState({
                                                                editReview: false
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
                            <button className="btn black-button mx-1" onClick={this.updateReview}>Edit</button>
                            <button className="btn cancel-button mx-1" onClick={() => {
                                this.setState({
                                    editReview: false,
                                    correctReviewEmail: false
                                })
                            }}>Cancel</button>
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
                        <button className="btn black-button" onClick={() => { this.GoToEdit(this.state.confirmEditEmail, this.state.artistToShow.owner.email) }}>Confirm identity</button>
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
                            {this.state.submittedReview ? <ValidateFields field="reviewer name" state={this.state.addReviewReviewer}/> : null}
                        </div>
                        <div className="col-6">
                            <label>Email: </label>
                            <input type="email" className="form-control" name="addReviewEmail" value={this.state.addReviewEmail} onChange={this.updateFormField} />
                            {this.state.submittedReview? <ValidateFields field="email" state={this.state.addReviewEmail}/> : null}
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
                        {this.state.submittedReview ? <ValidateFields field="general" state={this.state.addReviewComment} message={"the review"}/> : null}
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
                artistToShow: updatedResponse.data

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

    ValidateEmailReview() {
        if (this.state.submittedReview) {
            if (!this.state.addReviewEmail || !this.state.addReviewEmail.includes('@') || !this.state.addReviewEmail.includes('.com')) {
                return (
                    <div style={{ "color": "red" }}>Please enter a valid email</div>
                )
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        {!this.state.showOne ?
                            <div className="col-12 col-md-3">
                                {this.renderFilters()}
                            </div>
                            :
                            null
                        }
                        <div className={'col-12 ' + (this.state.showOne ? '' : 'col-md-9')}>
                            {!this.state.showOne ? <h3>Showing {this.state.data.length} result(s): </h3>
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