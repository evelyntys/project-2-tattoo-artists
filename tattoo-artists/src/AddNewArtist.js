import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactFields from './ContactFields';
import Select from 'react-select';
import {useState} from 'react';
import StyleMultiSelect from './StyleMultiSelect';


export default class AddNewArtist extends React.Component {

    state = {
        artistName: "",
        gender: "others",
        yearStarted: "",
        apprentice: "no",
        methods: [],
        temporary: "no",
        style: [],
        ink: [],
        contactKey: "",
        contactValue: "",
        contact: [{contactKey: "", contactValue: ""}],
        image1: "",
        image2: "",
        image3: "",
        ownerName: "",
        ownerEmail: "",
        studioName: "",
        private: "no",
        bookingsRequired: "no",
        street: "",
        unit: "",
        postal: "",
        otherServices: [],
    }

    handleSelect = (data) => {
        this.setState({
            style: data
        })
    }

    handleAddClick = () => {
        this.setState({
            contact: [...this.state.contact,{contactKey: "", contactValue:""}]
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

    // handleChange(event){
    //     let value = Array.from(
    //         event.target.selectedOptions,
    //         (option) => option.value
    //     );
    //     this.setState({
    //         optionSelected: value
    //     })
    // }

    // updateMulti = (e) => {
    //     let selected = [];
    //     for (let i=0; i<options.length; i++){
    //         if (options[i].selected){
    //             selected.push(options[i].value)
    //         }
    //     }
    //     this.setState({
    //         testSelect: selected
    //     })
    // }


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

                        {/* <div>
                            <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
                            
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
                        </div> */}

                        <div>
                        <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
                        <StyleMultiSelect handleSelect={this.handleSelect} testSelect={this.state.testSelect}/>
                        {/* <StyleMultiSelect updateMulti={this.updateMulti} things={this.state.testSelect} /> */}
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
                        </div>

                        {/* <div>
                            <label className="form-label">Please enter the artist's contact details: </label>
                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" name="contactKey" placeholder="platform e.g. instagram" />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" name="contactValue" placeholder="your contact" />
                                </div>
                            </div>
                        </div> */}

                        <label className="form-label">Please enter the artist's contact details: </label>
                        <ContactFields handleAddClick={this.handleAddClick}
                        inputList = {this.state.contact}
                        setInputList={this.updateData} />



                        {/* push to images array after submission */}
                        <div>
                            <label className="form-label">Please provide link to the artist's reference artwork (up to 3): </label>
                            <input type="text" className="form-control" placeholder="image link" name="image1"
                                onChange={this.updateFormField} value={this.state.image1} />
                            <input type="text" className="form-control" placeholder="image link" name="image2"
                                onChange={this.updateFormField} value={this.state.image2} />
                            <input type="text" className="form-control" placeholder="image link" name="image3"
                                onChange={this.updateFormField} value={this.state.image3} />
                        </div>

                        <div>
                            <label className="form-label">Your name: </label>
                            <input type="text" className="form-control" placeholder="e.g. John Doe" name="ownerName"
                                value={this.state.ownerName} onChange={this.updateFormField} />

                            <label className="form-label">Your email: </label>
                            <input type="text" className="form-control" placeholder="e.g. johndoe@email.com" name="ownerEmail"
                                value={this.state.ownerEmail} onChange={this.updateFormField} />
                        </div>
                    </div>

                    <div className="container">
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

                        <button className="btn btn-primary mt-2">Add new artist</button>
                    </div>


                </div>
            </React.Fragment>

        )
    }
}