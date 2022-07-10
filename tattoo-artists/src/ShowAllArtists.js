import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

export default class ShowAllArtists extends React.Component {
    url = "https://8888-evelyntys-project2restf-q3ufqgdmigx.ws-us53.gitpod.io/";

    state = {
        data: [],
        show: false,
        email: "",
        showOne: false,
        artistToShow: {}
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
            artistToShow: artist
        })
    }

    ShowOneOrAll() {
        if (this.state.showOne) {
            return (
                <React.Fragment>
                    <h1>hi! i am just one artist</h1>
                    <div className="container">
                        <h2>{this.state.artistToShow.name}</h2>
                        <h4>artist id: {this.state.artistToShow._id}</h4>
                        <p>gender: {this.state.artistToShow.gender}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary">edit</button>
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
                email: this.state.email
            })
            console.log(response.data)
        }
        catch (e) {
            alert(404)
            console.log(e)
            console.log(id)
            console.log(this.url + `tattoo-artist/${id}`)
            console.log(this.state.email)
        }

    }


    ConfirmDelete(artist) {

        const handleClose = () => this.setState({
            show: false
        });
        const handleShow = () => this.setState({
            show: true
        });

        return (
            <React.Fragment>
                <Button variant="danger" onClick={handleShow}>
                    Delete
                </Button>

                <Modal
                    show={this.state.show}
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
                            <input type="text" className="form-control" name="email" placeholder="email" value={this.state.email} onChange={this.updateFormField} />
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