import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AddNewArtist extends React.Component {
    state = {
        artistName: "",
        gender: "others",
        yearStarted: "",
        apprentice: "no",
        methods: [],
        temporary: "no",
        styles: [],
        inks: [],
        contact: {},
        images: [],
        ownerName: "",
        ownerEmail: "",
        studioName: "",
        private: "no",
        bookingsRequired: "no",
        street: "",
        unit: "",
        postal: "",
        otherServices: []
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateCheckboxes = (e) => {
        if (this.state[e.target.name].includes(e.target.value)){
            let indexToRemove = this.state[e.target.name].indexOf(e.target.value);

            let cloned = [...this.state[e.target.name].slice(0, indexToRemove),
            ...this.state[e.target.name].slice(indexToRemove+1)]
            this.setState({
                [e.target.name]: cloned
            })
        }
        else{
            let cloned = [...this.state[e.target.name], e.target.value]
            this.setState({
                [e.target.name]: cloned
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="container">
                        <h1>Information about the artist</h1>
                        <div>
                            <label className="form-label">Name of tattoo artist: </label>
                            <input type="text"
                                className="form-control"
                                placeholder="artist name"
                                name="artistName"
                                value={this.state.artistName}
                                onChange={this.updateFormField} />
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
                            value="handpoke" name="methods"
                            onChange={this.updateCheckboxes} checked={this.state.methods.includes('handpoke')} />
                            <label className="form-check-label">Handpoke</label>

                            <input type="checkbox" className="form-check-input mx-2" 
                            value="machine" name="methods"
                            onChange={this.updateCheckboxes} checked={this.state.methods.includes('machine')} />
                            <label className="form-check-label">Machine</label>

                            <input type="checkbox" className="form-check-input mx-2" 
                            value="jagua" name="methods"
                            onChange={this.updateCheckboxes} checked={this.state.methods.includes('jagua')} />
                            <label className="form-check-label">Jagua</label>
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
                            {/* to put multiselect */}
                            <select class="form-select" aria-label="Default select example" multiple>
                                <option value="surrealism">Surrealism</option>
                                <option value="traditional-americana">Traditional Americana</option>
                                <option value="traditional-japanese">Traditional Japanese</option>
                                <option value="blackwork">Blackwork</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="water-colour">Water Colour</option>
                                <option value="pet/animals">Pet/Animals</option>
                                <option value="floral">Floral</option>
                            </select>
                        </div>


                        <div>
                            <label className="form-label">Please select your ink(s):</label>
                            <input type="checkbox" className="form-check-input mx-2" 
                            value="black" name="inks"
                            onChange={this.updateCheckboxes} checked={this.state.inks.includes('black')} />
                            <label className="form-check-label">Black</label>

                            <input type="checkbox" className="form-check-input mx-2" 
                            value="colours" name="inks"
                            onChange={this.updateCheckboxes} checked={this.state.inks.includes('colours')} />
                            <label className="form-check-label">Colours</label>

                            <input type="checkbox" className="form-check-input mx-2" 
                            value="jagua" name="inks"
                            onChange={this.updateCheckboxes} checked={this.state.inks.includes('jagua')} />
                            <label className="form-check-label">Jagua</label>

                            <input type="checkbox" className="form-check-input mx-2" 
                            value="uv" name="inks"
                            onChange={this.updateCheckboxes} checked={this.state.inks.includes('uv')} />
                            <label className="form-check-label">UV</label>
                        </div>

                        <div>
                            <label className="form-label">Please enter your contact details: </label>
                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" name="contactKey" placeholder="platform e.g. instagram" />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" name="contactValue" placeholder="your contact" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Please provide links to your reference artwork (up to 3): </label>
                            <input type="text" className="form-control" placeholder="image link" name="images" />
                            <input type="text" className="form-control" placeholder="image link" name="images" />
                            <input type="text" className="form-control" placeholder="image link" name="images" />
                        </div>

                        <div>
                            <label className="form-label">Your name: </label>
                            <input type="text" className="form-control" placeholder="e.g. John Doe" name="ownerName" />
                            <label className="form-label">Your email: </label>
                            <input type="text" className="form-control" placeholder="e.g. johndoe@email.com" name="ownerEmail" />
                        </div>
                    </div>

                    <div className="container">
                        <h1>Information about the studio</h1>
                        <div>
                            <label className="form-label">Name of studio: </label>
                            <input type="text" className="form-control" placeholder="studio name" name="studio-name" />
                        </div>

                        <div>
                            <label className="form-label">Is it a private studio? </label>
                            <input type="radio" className="form-check-input mx-2" value="yes" name="private" /><label className="form-check-label">Yes</label>
                            <input type="radio" className="form-check-input mx-2" value="no" name="private" checked /><label className="form-check-label">No</label>
                        </div>

                        <div>
                            <label className="form-label">Are bookings required? </label>
                            <input type="radio" className="form-check-input mx-2" value="yes" name="bookingsRequired" /><label className="form-check-label">Yes</label>
                            <input type="radio" className="form-check-input mx-2" value="no" name="bookingsRequired" checked /><label className="form-check-label">No</label>
                        </div>

                        <div>
                            <h6>Address</h6>
                            <label className="form-label">Street: (please enter "nil" if not applicable)</label>
                            <input type="text" className="form-control" placeholder="street" name="street" />
                            <label className="form-label">Unit: (please enter "nil" if not applicable)</label>
                            <input type="text" className="form-control" placeholder="unit" name="unit" />
                            <label className="form-label">Postal Code: (please enter "000000" if not applicable)</label>
                            <input type="text" className="form-control" placeholder="postal code" name="postal" />
                        </div>

                        <div>
                            <label className="form-label">Does your studio offer any other services? (please enter nil if no): </label>
                            <input type="text" className="form-control" placeholder="e.g. piercings" name="otherServices" />
                        </div>

                        <button className="btn btn-primary mt-2">Add new artist</button>
                    </div>


                </div>
            </React.Fragment>

        )
    }
}