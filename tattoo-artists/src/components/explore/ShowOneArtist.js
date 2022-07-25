import React from 'react';
import { Accordion } from 'react-bootstrap';

export default function ShowOneArtist(props) {
    return (
        <div className="container">
            <div>
                <div>
                    <button className="btn"
                        onClick={props.showAll}><i className="bi bi-arrow-90deg-left"></i></button>
                </div>
                <div className="text-end">
                    {props.ConfirmEdit}
                    {props.ConfirmDelete}
                </div>
            </div>
            <div className="row">
                <div className="row">
                    <div className="d-none d-md-block col-12 col-md-4" style={{ "height": "100%" }}></div>
                    <div className="d-none d-md-block col-12 col-md-8">
                        <h1 className="text-center insta-title">{props.findInstagram(props.artistToShow.contact)}</h1>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <h1 className="text-center d-block d-md-none">{props.findInstagram(props.artistToShow.contact)}</h1>
                    <div className="single-artist-image" style={{ "width": "100%" }}>
                        <img src={props.artistToShow.image} className="card-img-top" style={{ "objectFit": "cover", "height": "100%" }} alt="artist's artwork" />
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    {/* <h1 className="text-center d-none d-md-block">{this.findInstagram(this.state.artistToShow.contact)}</h1> */}
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h4 className="ms-auto">Artist's Details</h4></Accordion.Header>
                            <Accordion.Body>
                                <div className="text-center card-box">
                                    <h4 className="artist-name">{props.artistToShow.name}</h4>
                                    <p>{props.artistToShow.gender}</p>
                                    <p>{props.artistToShow.yearsOfExperience} year(s) of experience</p>
                                    <p>{"currently " + (props.artistToShow.apprentice.includes('yes') ? `an apprentice` : `a tattoo artist`)}</p>
                                    <div className="row">
                                        <div className="col-12 col-md-3">
                                            <div className="card-box-title">Method(s)</div>
                                            {props.artistToShow.method.map(a => (
                                                <React.Fragment key={a}>
                                                    <span className="span-body text-md-start"><i className="bi bi-dot"></i>{a} </span>
                                                    {/* <ul className="d-none d-md-block">
                                                            <li className="text-start">{a}</li>
                                                            </ul> */}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        {/* Temporary? {e.temporary} */}
                                        <div className="col-12 col-md-6">
                                            <div className="card-box-title">Style(s)</div>
                                            {props.artistToShow.style.map(a => (
                                                <React.Fragment key={a}>
                                                    <span className="span-body text-md-start"> <i className="bi bi-dot"></i>{props.styleKeys[a]['label'].toLowerCase()}</span>
                                                    {/* <ul className="d-none d-md-block m-0 p-0">
                                                                <div className="row">
                                                                    <div className="col-4"></div>
                                                                    <div className="col-2">
                                                            <li className="text-start m-0 p-0">{this.styleKeys[a].toLowerCase()}</li>
                                                            </div>
                                                            </div>
                                                            </ul> */}
                                                </React.Fragment>
                                            ))}

                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card-box-title">Ink(s)</div>

                                            {props.artistToShow.ink.map(a => (
                                                <span className="span-body text-md-start" key={a}><i className="bi bi-dot"></i>{a} </span>
                                            ))}

                                        </div>
                                    </div>
                                    <div>
                                        <div className="card-box-title"><i className="bi bi-person-hearts"></i> Contact </div>
                                        <div className="card-box">
                                            {props.artistToShow.contact.map(a => (
                                                <div key={"contact" + a.contactKey}>
                                                    <b>{a.contactKey}</b>: {a.contactValue}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h4 className="ms-auto">Studio Details</h4></Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    <div className="card-box">
                                        <h4 className="artist-name">{props.artistToShow.studio.name}</h4>
                                        <h6 className="disclaimer">{props.artistToShow.studio.private.includes('no') ? "shared studio" : "private studio"} </h6>
                                        {props.artistToShow.studio.address.street}, {props.artistToShow.studio.address.unit}, {props.artistToShow.studio.address.postal} <br />
                                        <p className='bold-text'>{props.artistToShow.studio.bookingsRequired.includes('no') ? null : "bookings required"} </p>
                                        {props.artistToShow.studio.otherServices.includes("nil") ? null : 'services available: ' + props.artistToShow.studio.otherServices}
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>

            <div className="mt-2">
                {props.RenderReviews}
            </div>
        </div>
    )
}