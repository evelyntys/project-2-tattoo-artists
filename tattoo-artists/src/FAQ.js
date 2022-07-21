import React from 'react';
import { Accordion } from 'react-bootstrap';

export default class AboutUs extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="header-banner">
                    <img className="header-image" src={require('./images/faq-header.jpg')} />
                    <div className="overlay d-flex align-items-center justify-content-center">
                        <h1>FAQs</h1>
                    </div>
                </div>
                <div className="container mt-4 mb-4">
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>What is the minimum age requirement to get a tattoo?</Accordion.Header>
                            <Accordion.Body>
                                Although there are no laws stating the minimum age requirement for getting a tattoo in Singapore,
                                most tattoo artists and/or studios do have a minimum age requirement of
                                <span className="bold-text"> 18 years old</span> for their clients. <br />
                                <br/>
                                For those <span className="bold-text"> below 18 </span>
                                seeking to get a tattoo, they would require the
                                <span className="bold-text"> presence of a legal parent/guardian</span> and/or
                                <span className="bold-text"> a letter of consent from their legal parent/guardian.</span>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>What are jagua tattoos?</Accordion.Header>
                            <Accordion.Body>
                                Jagua tattoo uses jagua ink, which is an <span className="bold-text">organic fruit based dye</span> made from
                                the Jagua fruit that works like henna. <br />
                                However, it stains like the colour of a real tattoo
                                and usually lasts on the skin for <span className="bold-text">10-14 days. </span><br />
                                You basically get the thrill of tattoos without the commitment and the pain! <br />
                                <br />
                                <span className="disclaimer">*Please note that if you are allergic to tropical fruits, especially berries,
                                    you might be allergic to jagua ink as well.</span>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Is there anything to note before a tattoo session?</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li>Dress in comfortable loose clothing that you wouldn't mind getting dirty as accidental smudging might occur<br />
                                        <span className="disclaimer">*Might be best to avoid white clothing!</span>
                                    </li>
                                    <li>Do not drink the day before appointment as it may thin your blood</li>
                                    <li>Have a meal and hydrate well before your appointment</li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Are there any differences between machine and handpoke tattoos?</Accordion.Header>
                            <Accordion.Body>
                                Handpoked tattoos are similar to machine tattoos, but instead of using an electric tattoo machine,
                                the <span className="bold-text">needle is moved purely with the artist's hands.</span> <br />
                                <br />
                                Handpoke tattoos are also known to be <span className="bold-text"> less painful </span>
                                and <span className="bold-text">heal better </span> as there is
                                <span className="bold-text"> less trauma to the skin </span>
                                due to a gentler and slower process.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>What is the aftercare process for a tattoo like?</Accordion.Header>
                            <Accordion.Body>
                                <span className="disclaimer">*Please note that the following 
                                may apply ONLY to permanent tattoos and not jagua tattoos</span><br/>
                                <br/>
                                The tattoo(s) will be wrapped with a clear bandage after the session, 
                                and it should be kept on for about <span className="bold-text"> 2-3 days. </span><br/>
                                However, if the bandage starts peeling, feel free to peel it off completely.<br/>
                                <span className='disclaimer'>*Some fluid and ink may appear under the bandage as it heals but
                                rest assured that it is part of the healing process.</span><br/>
                                <span className="bold-text">Avoid strenous exercise and swimming for the next 2 weeks
                                and avoid alcohol immediately after the tattoo.</span> <br/>
                                Once the bandage has been removed, apply a thin layer of unscented moistuizer to the area, 
                                and moisturize it whenever it feels dry. <br/>
                                It takes about <span className="bold-text"> one month </span> for a tattoo to be fully healed.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </React.Fragment>
        )
    }
}