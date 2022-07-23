import React from 'react';
import ValidateFields from './Validation';
import StyleMultiSelect from './StyleMultiSelect';
import ContactFields from './ContactFields';

export default function EditArtist(props) {
    return (
        <div className="container mt-2">
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
                                value={props.modifiedArtistName}
                                onChange={props.updateFormField} />
                            {props.submitted ? <ValidateFields field="artist name" state={props.modifiedArtistName} /> : null}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Year started tattooing: </label>
                            <input type="text" className="form-control"
                                placeholder="year started tattooing" name="modifiedYearStarted" value={props.modifiedYearStarted}
                                onChange={props.updateFormField} />
                            {props.submitted ? <ValidateFields field="year" state={props.modifiedYearStarted} /> : null}
                        </div>

                        <div className="col-12 col-md-6 mt-md-2">
                            <label className="form-label form-check-inline">Gender: </label>
                            {props.genderRadio.map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input"
                                            value={each.value} name="modifiedGender"
                                            checked={props.modifiedGender === (each.value)} onChange={props.updateFormField} />
                                        {each.label}</label>
                                </div>
                            ))}

                        </div>


                        <div className="col-12 col-md-6 mt-md-2">
                            <label className="form-label form-check-inline">Are you an apprentice? </label>
                            {props.generalRadio.slice(0, 2).map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input"
                                            value={each.value} name="modifiedApprentice"
                                            onChange={props.updateFormField} checked={props.modifiedApprentice === (each.value)} />
                                        {each.label}</label>
                                </div>
                            ))}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Please select your method(s) of tattooing:</label>
                            {props.methodsCheckbox.map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input"
                                            value={each.value} name="modifiedMethod"
                                            onChange={props.updateCheckboxes} checked={props.modifiedMethod.includes(each.value)} />
                                        {each.label}</label>
                                </div>
                            ))}

                        </div>
                        {props.submitted ? <ValidateFields field="general-checkbox" state={props.modifiedMethod} message={"method"} /> : null}

                        <div className="col-12 col-md-6">
                            <label className="form-label">Is it temporary? </label>
                            <select className="form-select" aria-label="Default select example"
                                onChange={props.updateFormField} value={props.modifiedTemporary} name="modifiedTemporary">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-6">
                            <div>
                                <label className="form-label">Please select your ink(s):</label>
                            </div>
                            {props.inkCheckbox.map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input"
                                            value={each.value} name="modifiedInk"
                                            onChange={props.updateCheckboxes} checked={props.modifiedInk.includes(each.value)} />
                                        {each.label}</label>
                                </div>
                            ))}
                            {props.submitted ? <ValidateFields field="general-checkbox" state={props.modifiedInk} message={"ink"} /> : null}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
                            <StyleMultiSelect handleSelect={props.handleSelectModified} style={props.modifiedStyle} />
                            {props.submitted ? <ValidateFields field="style" state={props.modifiedStyle} /> : null}
                        </div>

                        <label className="form-label">Please enter the artist's contact details: </label>
                        <ContactFields handleAddClick={props.handleAddClick}
                            inputList={props.modifiedContact}
                            setInputList={props.updateData} />
                        {props.submitted ? <ValidateFields field="contact" state={props.modifiedContact} /> : null}
                        <div>
                            <label className="form-label">Please provide an image link to the artist's reference artwork: </label>
                            <input type="text" className="form-control" placeholder="image link" name="modifiedImage"
                                onChange={props.updateFormField} value={props.modifiedImage} />
                            {props.submitted ? <ValidateFields field="general" state={props.modifiedImage} message={"a reference image link"} /> : null}
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
                                value={props.modifiedStudioName}
                                onChange={props.updateFormField} />
                            {props.submitted ? <ValidateFields field="general" state={props.modifiedStudioName} message={"the studio name"} /> : null}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label form-check-inline">Is it a private studio? </label>
                            {props.generalRadio.slice(0, 2).map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input"
                                            value={each.value} name="modifiedPrivate"
                                            onChange={props.updateFormField} checked={props.modifiedPrivate === (each.value)} />
                                        {each.label}</label>
                                </div>
                            ))}
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label form-check-inline">Are bookings required? </label>
                            {props.generalRadio.slice(0, 2).map(each => (
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input"
                                            value={each.value} name="modifiedBookingsRequired"
                                            onChange={props.updateFormField} checked={props.modifiedBookingsRequired === (each.value)} />
                                        {each.label}</label>
                                </div>
                            ))}
                        </div>

                        <div className="row">
                            <h6>Address</h6>

                            <div className="col-12">
                                <label className="form-label">Street: (please enter "nil" if not applicable)</label>
                                <input type="text" className="form-control" placeholder="street" name="modifiedStreet"
                                    value={props.modifiedStreet} onChange={props.updateFormField} />
                                {props.submitted ? <ValidateFields field="general" state={props.modifiedStreet} message={"the street"} /> : null}
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label">Unit: (please enter "nil" if not applicable)</label>
                                <input type="text" className="form-control" placeholder="unit" name="modifiedUnit"
                                    value={props.modifiedUnit} onChange={props.updateFormField} />
                                {props.submitted ? <ValidateFields field="unit" state={props.modifiedUnit} /> : null}
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label">Postal Code: (please enter "000000" if not applicable)</label>
                                <input type="text" className="form-control" placeholder="postal code" name="modifiedPostal"
                                    value={props.modifiedPostal} onChange={props.updateFormField} />
                                {props.submitted ? <ValidateFields field="postal" state={props.modifiedPostal} /> : null}
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Does your studio offer any other services? (please enter nil if no): </label>
                            <input type="text" className="form-control" placeholder="e.g. piercings" name="modifiedOtherServices"
                                value={props.modifiedOtherServices} onChange={props.updateFormField} />
                            {props.submitted ? <ValidateFields field="general" state={props.modifiedOtherServices} message={"the services available"} /> : null}
                        </div>
                    </div>

                    <button className="btn delete-button my-2 mx-1" onClick={props.updateArtist}>Update artist</button>
                    <button className="btn cancel-button my-2 mx-1" onClick={props.stopEdit}>Cancel</button>
                </div>


            </div>
        </div>
    )
}