import React from 'react';
import StyleMultiSelect from './StyleMultiSelect';

export default function RenderFilters(props){
    let filters = ""
        if (props.showFiltersState) {
            filters =
                <div style={{ "border": "1px solid gray", "borderRadius": "0.6px" }} className="mt-2">
                    <div className="container">
                        <h4>filters: </h4>
                        {/* GENDER FILTER */}
                        <div>
                            <label className="form-label">Gender: </label>
                            <select className="form-select" aria-label="select gender"
                                onChange={props.updateFormField} value={props.gender} name="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                                <option value="any">Any</option>
                            </select>
                        </div>

                        {/* YEARS OF EXPERIENCE FILTER */}
                        <div>
                            <div>
                                <label className="form-label me-2">Years of experience:</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="yearsOfExperience"
                                    value={0} onChange={props.updateFormField}
                                    checked={props.yearsOfExperience === "0"} />
                                newly started this year</label>
                            </div>

                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="yearsOfExperience"
                                    value={1} onChange={props.updateFormField}
                                    checked={props.yearsOfExperience === "1"} />
                                at least 1 year</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="yearsOfExperience"
                                    value={3} onChange={props.updateFormField}
                                    checked={props.yearsOfExperience === "3"} />
                                at least 3 years</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="yearsOfExperience"
                                    value={5} onChange={props.updateFormField}
                                    checked={props.yearsOfExperience === "5"} />
                                at least 5 years</label>
                            </div>
                        </div>

                        {/* APPRENTICE FILTER */}
                        <div>
                            <div><label className="form-label me-2">Apprentice:</label></div>
                            {props.generalRadio.map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="apprentice"
                                        value={each.value} onChange={props.updateFormField}
                                        checked={props.apprentice === (each.value)} />
                                    {each.label}</label>
                                </div>
                            ))}

                        </div>

                        {/* TEMPORARY FILTER */}

                        <div>
                            <div>
                                <label className="form-label">Temporary:</label>
                            </div>
                            {props.generalRadio.map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="temporary"
                                        value={each.value} onChange={props.updateFormField}
                                        checked={props.temporary === (each.value)} />
                                    {each.label}</label>
                                </div>
                            ))}

                        </div>

                        {/* METHOD FILTER */}
                        <div>
                            <div>
                                <label className="form-label me-2">Method(s):</label>
                            </div>
                            {props.methodsCheckbox.map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input"
                                        value={each.value} name="method"
                                        onChange={props.updateCheckboxes} checked={props.method.includes(each.value)} />
                                    {each.label}</label>
                                </div>
                            ))}

                        </div>

                        {/* STYLE FILTER */}
                        <div>
                            <label className="form-label me-2">Style(s):</label>
                            <StyleMultiSelect style={props.style} handleSelect={props.handleSelectFilter} />
                        </div>

                        {/* INK FILTER */}
                        <div>
                            <div>
                                <label className="form-label">Ink(s):</label>
                            </div>
                            {props.inkCheckbox.map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input"
                                        value={each.value} name="ink"
                                        onChange={props.updateCheckboxes} checked={props.ink.includes(each.value)} />
                                    {each.label}</label>
                                </div>
                            ))}
                        </div>

                        {/* private */}
                        <div>
                            <label className="form-label">Private studio: </label>
                            <select className="form-select" aria-label="Default select example"
                                onChange={props.updateFormField} value={props.private} name="private">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="any">Any</option>
                            </select>
                        </div>

                        <div>
                            <label className="form-label">Bookings required: </label>
                            <select className="form-select" aria-label="Default select example"
                                onChange={props.updateFormField} value={props.bookingsRequired} name="bookingsRequired">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="any">Any</option>
                            </select>
                        </div>

                    </div>
                    <button className="btn black-button w-100 mt-2" onClick={props.showFilters}><i className="bi bi-caret-up-fill"></i></button>
                </div>
        }

        return (
            <React.Fragment>
                <h3 className="mt-4">search for artist(s): </h3>
                <div className="row">
                    <div className="col-6 col-md-12 d-md-flex">
                        <input type="text" className="form-control me-md-1" placeholder="search for artist name, ig or studio..." name="search" onChange={props.updateFormField} value={props.search} />
                        <button className="btn black-button d-none d-md-block" onClick={props.clickSearch}><i className="bi bi-search"></i></button>
                    </div>
                    <div className="col-6 col-md-12 d-md-flex my-md-1">
                        <button className="btn black-button mx-1 d-md-none" onClick={props.clickSearch}><i className="bi bi-search"></i></button>
                        <button className="btn black-button mx-1 d-none d-md-block"
                            onClick={props.ResetSearch}>
                            Reset
                        </button>
                        <button className="btn black-button mx-1"
                            onClick={props.showFilters}>
                            <i className="bi bi-funnel-fill"></i>
                        </button>
                        <button className="btn black-button mx-1 d-md-none"
                            onClick={props.ResetSearch}>
                            <i className="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                </div>
                {filters}
            </React.Fragment>
        )
}