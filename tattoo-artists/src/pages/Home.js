import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="header-banner mb-2">
                    <img className="header-image" src="https://drive.google.com/uc?id=12PQFEtg6EJ7kSUiO8MWeHwYQ0O74b8hd" alt="tattoo artist tattooing a client" />
                    <div className="overlay d-flex align-items-center justify-content-center">
                    <img className="header-logo" src={require("../images/tattoo.png")} style={{"height": "70px"}} alt="logo"/> <h1> TATTOOFINDWHO</h1>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="container p-0 col-12 my-1 faq">
                            <div className='nav-btn d-flex justify-content-center align-items-center' onClick={() => { this.props.ChangePages('faq') }}>
                                <h1 className="home-nav">FAQs</h1>
                            </div>
                        </div>

                        <div className="container p-0 col-12 my-1 explore">
                            <div className='nav-btn d-flex justify-content-center align-items-center' onClick={() => { this.props.ChangePages('explore') }}>
                                <h1 className="home-nav">Explore</h1>
                            </div>
                        </div>

                        <div className="container p-0 col-12 my-1 add-new">
                            <div className='nav-btn d-flex justify-content-center align-items-center' onClick={() => { this.props.ChangePages('add-new') }}>
                                <h1 className="home-nav">Add new artist</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}