import React from 'react';
import axios from 'axios';
import StyleMultiSelect from './StyleMultiSelect';

export default class Explore extends React.Component {
    url = "https://8888-evelyntys-project2restf-q3ufqgdmigx.ws-us53.gitpod.io/";

    state = {
        showFilters: true,
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
        results: []
    }

    renderFilters() {
        if (this.state.showFilters) {
            return (
                <div style={{ "border": "1px solid gray", "border-radius": "0.6px" }} className="mt-2">
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
                            <label className="form-label me-2">Method(s):</label>

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
                            {/* <StyleMultiSelect value={this.state.style} onChange={this.handleSelect}/> */}
                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value='{ value: "surrealism", label: "Surrealism" }' onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes('{ value: "surrealism", label: "Surrealism" }')} />
                                <label className="form-check-label">Surrealism</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value='{ value: "traditional-americana", label: "Traditional Americana" }' onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes('{ value: "traditional-americana", label: "Traditional Americana" }')} />
                                <label className="form-check-label">Traditional Americana</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value='{ value: "traditional-japanese", label: "Traditional Japanese" }' onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes('{ value: "traditional-japanese", label: "Traditional Japanese" }')} />
                                <label className="form-check-label">Traditional Japanese</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value='{ value: "blackwork", label: "Blackwork" }' onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes('{ value: "blackwork", label: "Blackwork" }')} />
                                <label className="form-check-label"> Blackwork</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value='{ value: "minimalist", label: "Minimalist" }' onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes('{ value: "minimalist", label: "Minimalist" }')} />
                                <label className="form-check-label"> Minimalist</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value=' { value: "water-colour", label: "Water colour" },' onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes(' { value: "water-colour", label: "Water colour" }')} />
                                <label className="form-check-label"> Water Colour</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value=' { value: "pet/animals", label: "Pet/Animals" }' onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes(' { value: "pet/animals", label: "Pet/Animals" }')} />
                                <label className="form-check-label"> Pet/Animals</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" name="style"
                                    value='        { value: "floral", label: "Floral" } ' onChange={this.updateCheckboxes}
                                    checked={this.state.style.includes('        { value: "floral", label: "Floral" }                                    ')} />
                                <label className="form-check-label"> Floral</label>
                            </div>

                        </div>

                        <div>
                            <label className="form-label me-2">Ink(s):</label>
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
                            <label className="form-label me-2">Bookings required: </label>

                            <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input"
                                value="yes" name="bookingsRequired"
                                onChange={this.updateCheckboxes} checked={this.state.otherServices.includes("yes")} />
                            <label className="form-check-label">Yes</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input"
                                value="no" name="bookingsRequired"
                                onChange={this.updateCheckboxes} checked={this.state.otherServices.includes("no")} />
                            <label className="form-check-label">No</label>
                            </div>
                        </div>

                    </div>
                    <button className="btn btn-light w-100" onClick={() => { this.setState({ showFilters: false }) }}><i class="bi bi-caret-up-fill"></i></button>
                </div>
            )
        }
        else {
            return (
                <div style={{ "border": "1px solid black" }}>
                    no filters yet
                </div>
            )
        }
    }

    updateFormFields = (e) => {
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

    handleSelect = (data) => {
        this.setState({
            style: data
        })
    }

    clickSearch = async () => {
        let response = await axios.get(this.url + 'show-artists?search=' + this.state.search);
        this.setState({
            results: response.data
        })
        console.log(response.data)
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>search for an artist: </h1>
                    <div class="row">
                        <div class="col-8">
                            <input type="text" className="form-control" placeholder="search for anything..." name="search" onChange={this.updateFormFields} value={this.state.search} />
                        </div>
                        <div class="col-4">
                            <button className="btn btn-primary me-1" onClick={this.clickSearch}><i class="bi bi-search"></i></button>
                            <button className="btn btn-primary ms-1" onClick={() => { this.setState({ showFilters: !this.state.showFilters }) }}><i class="bi bi-funnel-fill"></i></button>
                        </div>
                    </div>
                    {this.renderFilters()}
                    <div>
                        <h1>search results</h1>
                        <React.Fragment>
                    <div className="container d-flex flex-row flex-wrap justify-content-evenly">
                        {this.state.results.map(e => (
                            <React.Fragment key={e._id}>
                                <div className="card mx-2 my-2" style={{ "width": "20rem" }}>
                                    <img src={e.image} style={{ "height": "318px", "width": "318px", "objectFit": "cover" }} class="card-img-top" alt="..." />
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
                                        {/* {this.ReviewsModal(e)} */}
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </React.Fragment>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}