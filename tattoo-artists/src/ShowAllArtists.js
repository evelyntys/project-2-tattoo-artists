import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
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
        contactKey: "",
        contactValue: "",
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
        showValidateEmail: false
    }

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
            contactKey: "",
            contactValue: "",
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
            style: data
        })
    }

    handleAddClick = () => {
        this.setState({
            modifiedContact: [...this.state.contact, { contactKey: "", contactValue: "" }]
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

    addData = async () => {
        this.setState({
            submitted: true
        })
        try {
            let response = await axios.post(this.url + "add-new-artist", {
                name: this.state.artistName,
                gender: this.state.gender,
                yearStarted: this.state.yearStarted,
                apprentice: this.state.apprentice,
                modifiedMethod: this.state.modifiedMethod,
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
        }
        catch (e) {
            alert('error adding')
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
                    <React.Fragment>
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
                                            <StyleMultiSelect handleSelect={this.handleSelect} testSelect={this.state.modifiedStyle} />
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

                                        {/* <label className="form-label">Please enter the artist's contact details: </label>
                                        <ContactFields handleAddClick={this.handleAddClick}
                                            inputList={this.state.modifiedContact}
                                            setInputList={this.updateData} /> */}

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

                                        <button className="btn btn-primary mt-2" onClick={this.addData}>Update artist</button>
                                    </div>


                                </div>
                            </React.Fragment>

                        </div>
                    </React.Fragment>
                )
            }
        }
        else {
            return (
                <React.Fragment>
                    {this.state.data.map(e => (
                        <React.Fragment key={e._id}>
                            <div className="card" style={{ "width": "auto" }}>
                                <img src="..." class="card-img-top" alt="..." />
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
                                            <span class="badge rounded-pill bg-secondary">{a}</span>
                                        ))}<br />
                                        Ink: {e.ink.map(a => (
                                            <span class="badge rounded-pill bg-secondary" key={a}>{a}</span>
                                        ))}<br />
                                        {Object.keys(e.contact).map((key) => {
                                            <span>{key}: {e.contact[key]}</span>
                                        })}

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
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </React.Fragment>
            )
        }
    }

    processDelete = async (id) => {
        try {
            let response = await axios.delete(this.url + `tattoo-artist/${id}`, {
                email: this.state.confirmDeleteEmail
            })
            console.log(response.data)
        }
        catch (e) {
            alert(404)
            console.log(e)
            console.log(id)
            console.log(this.url + `tattoo-artist/${id}`)
            console.log(this.state.confirmDeleteEmail)
        }

    }

    GoToEdit(inputEmail, ownerEmail){
        if (inputEmail === ownerEmail){
            this.setState({
                editMode: true,
            })
        }
        else{
            this.setState({
                showValidateEmail:true
            })
        }
    }

    ConfirmEdit(){

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
                    {this.state.showValidateEmail ? <div style={{"color": "red"}}> sorry, it seems that you are not the owner of this document</div>
                    :""}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {this.GoToEdit(this.state.confirmEditEmail, this.state.artistToShow.owner.email)}}>Confirm identity</Button>
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
                        <Button variant="primary" onClick={() => { this.processDelete(artist._id) }}>Confirm delete</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.ShowOneOrAll()}
            </React.Fragment>
        )
    }
}