import React from 'react';

export default function ShowAllArtists(props) {
    return (
        <div className="container d-flex flex-row flex-wrap justify-content-evenly">
            {props.data.map(e => (
                <React.Fragment key={"all" + e._id}>
                    <div className="card mx-2 my-2" style={{ "width": "18rem" }}>
                        <h4 className="card-title text-center">{props.findInstagram(e.contact)}</h4>
                        <img src={e.image} style={{ "height": "180px", "width": "auto", "objectFit": "cover" }}
                            className="card-img-top" alt="..." />
                        <div className="card-body">
                            <div className="card-text">
                                <h5 className="text-center card-name"> {e.name} </h5>
                                <p className="text-center card-gender-all"> {e.gender} </p>
                                <p className="text-center card-year-all"> tattooing since {e.yearStarted}</p>
                                <div className="text-center">
                                    <div className="card-box-title-all">Method(s)</div>
                                    <div>{e.method.map(a => (
                                        <span className="span-body-all" key={a}><i className="bi bi-dot"></i>{a} </span>
                                    ))}
                                    </div>
                                    <div className="card-box-title-all">Style(s)</div>
                                    <div>{e.style.map(a => (
                                        <div className="span-body-all" key={a}>
                                            <i className="bi bi-dot"></i>{props.styleKeys[a]['label'].toLowerCase()}</div>
                                    ))}
                                    </div>
                                    <div className="card-box-title-all">Ink(s)</div>
                                    <div>
                                        {e.ink.map(a => (
                                            <span className="span-body-all" key={a}><i className="bi bi-dot"></i>{a} </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn w-100 card-btn" onClick={() => { props.showOneArtist(e) }}>View</button>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}