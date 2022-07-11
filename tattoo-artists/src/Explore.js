import React from 'react';
import axios from 'axios';

export default class Explore extends React.Component {
    state = {
        showFilters: true,
        gender: "others",
        apprentice: "no",
        temporary: "no",
        style: []
    }

    renderFilters() {
        if (this.state.showFilters) {
            return (
                <div style={{ "border": "1px solid gray", "border-radius": "0.6px" }} className="mt-2">
                    <div className="container">
                        <div>
                            <label className="form-label me-2">Gender:</label>

                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" name="gender"
                                    value="female" onChange={this.updateFormFields}
                                    checked={this.state.gender === "female"} />
                                <label className="form-check-label">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" name="gender"
                                    value="male" onChange={this.updateFormFields}
                                    checked={this.state.gender === "male"} />
                                <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" name="gender"
                                    value="others" onChange={this.updateFormFields}
                                    checked={this.state.gender === "others"} />
                                <label className="form-check-label">Others</label>
                            </div>
                        </div>
                        {/* years of exp, methods, style, ink, private, bookings required, other services */}

                        <div>
                            <label className="form-label me-2">Apprentice:</label>

                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" name="apprentice"
                                    value="yes" onChange={this.updateFormFields}
                                    checked={this.state.apprentice === "yes"} />
                                <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" name="apprentice"
                                    value="no" onChange={this.updateFormFields}
                                    checked={this.state.apprentice === "no"} />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>

                        <div>
                            <label className="form-label me-2">Temporary:</label>

                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" name="temporary"
                                    value="yes" onChange={this.updateFormFields}
                                    checked={this.state.temporary === "yes"} />
                                <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" name="temporary"
                                    value="no" onChange={this.updateFormFields}
                                    checked={this.state.temporary === "no"} />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>

                        <div>
                            <label className="form-label me-2">Style(s):</label>

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

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>search for an artist: </h1>
                    <div class="row">
                        <div class="col-8">
                            <input type="text" className="form-control" placeholder="search for anything..." />
                        </div>
                        <div class="col-2">
                            <button className="btn btn-primary"><i class="bi bi-search"></i></button>
                        </div>
                        <div class="col-2">
                            <button className="btn btn-primary" onClick={() => { this.setState({ showFilters: !this.state.showFilters }) }}><i class="bi bi-funnel-fill"></i></button>
                        </div>
                    </div>
                    {this.renderFilters()}
                </div>
            </React.Fragment>
        )
    }
}