import React from 'react';
import StyleMultiSelect from '../general/StyleMultiSelect';

export default function RenderFilters(props) {
    let filters = ""
    if (props.showFiltersState) {
        filters =
            <div style={{ "border": "1px solid gray", "borderRadius": "0.6px" }} className="my-2">
                <h4 className="text-center" style={{
                    "backgroundColor": "black",
                    "color": "white", "width": "100%"
                }}>FILTERS: </h4>
                <div className="container mb-2">
                    {/* GENDER FILTER */}
                    <div>
                        <label className="form-label bold-text">Gender: </label>
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
                            <label className="form-label bold-text">Years of experience:</label>
                            <select className="form-select" aria-label="select years of experience"
                                onChange={props.updateFormField} value={props.yearsOfExperience} name="yearsOfExperience">
                                <option value="0">Newly started this year</option>
                                <option value="1">At least 1 year</option>
                                <option value="3">At least 3 years</option>
                                <option value="5">At least 5 years</option>
                            </select>
                        </div>
                    </div>

                    {/* APPRENTICE FILTER */}
                    <div>
                        <div><label className="form-label bold-text">Apprentice:</label></div>
                        {props.generalRadio.map(each => (
                            <div className="form-check form-check-inline" key={"filter-apprentice " + each.value}>
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
                            <label className="form-label bold-text">Temporary:</label>
                        </div>
                        {props.generalRadio.map(each => (
                            <div className="form-check form-check-inline" key={"filter-temporary " + each.value}>
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
                            <label className="form-label bold-text">Method(s):</label>
                        </div>
                        {props.methodsCheckbox.map(each => (
                            <div className="form-check form-check-inline" key={"filter-methods " + each.value}>
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
                        <label className="form-label bold-text">Style(s):</label>
                        <StyleMultiSelect style={props.style} handleSelect={props.handleSelectFilter} />
                    </div>

                    {/* INK FILTER */}
                    <div>
                        <div>
                            <label className="form-label bold-text">Ink(s):</label>
                        </div>
                        {props.inkCheckbox.map(each => (
                            <div className="form-check form-check-inline" key={"filter-inks " + each.value}>
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
                        <label className="form-label bold-text">Private studio: </label>
                        <select className="form-select" aria-label="select private studio"
                            onChange={props.updateFormField} value={props.private} name="private">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="any">Any</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label bold-text">Bookings required: </label>
                        <select className="form-select" aria-label="select bookings required"
                            onChange={props.updateFormField} value={props.bookingsRequired} name="bookingsRequired">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="any">Any</option>
                        </select>
                    </div>

                </div>
                <button className="btn black-button w-100 mt-2" onClick={props.showFilters}>
                    <i className="bi bi-caret-up-fill"></i></button>
            </div>
    }

    return (
        <React.Fragment>
            <h3 className="mt-4">Search for artist(s): </h3>
            <div className="row">
                <div className="col-7 col-md-12 d-flex">
                    <input type="text" className="form-control me-md-1"
                        placeholder="search for artist name, ig or studio..." name="search"
                        onChange={props.updateFormField} value={props.search} />
                    <button className="btn black-button d-none d-md-block"
                        onClick={props.clickSearch}><i className="bi bi-search"></i></button>
                </div>
                <div className="col-5 col-md-12 d-flex my-md-2 filter-buttons">
                    <button className="btn black-button mx-1 d-md-none"
                        onClick={props.clickSearch}><i className="bi bi-search"></i></button>
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