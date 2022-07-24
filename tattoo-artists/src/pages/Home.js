import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="header-banner">
                    <img className="header-image" src="https://drive.google.com/uc?id=12PQFEtg6EJ7kSUiO8MWeHwYQ0O74b8hd" alt="female artist tattooing a client" />
                    <div className="overlay d-flex align-items-center justify-content-center">
                        <h1>TATTOOFINDWHO</h1>
                    </div>
                </div>
                {/* <div style={{ "maxHeight": "300px", "width": "100vw", "position": "relative" }}>
          <img src="https://drive.google.com/uc?id=12PQFEtg6EJ7kSUiO8MWeHwYQ0O74b8hd" style={{ "objectFit": "cover", 'width': "100%", 'maxHeight': '300px' }} alt="gif of tattoo process" /> */}
                {/* <div style={{ "color": "white", "backgroundColor": "black", 'width': "100%", "position": "absolute", "bottom": "0"}}>
          TATTOOFINDWHO
          </div> */}
                {/* </div> */}
                <div className="container">
                    <div className="row">
                        <div className="container p-0 col-12 col-md-4 faq">
                            <div className='nav-btn d-flex justify-content-center align-items-center'>
                                <h1 className="home-nav" onClick={() => { this.props.ChangePages('faq') }}>FAQs</h1>
                            </div>
                        </div>

                        <div className="container p-0 col-12 col-md-4 explore">
                            <div className='nav-btn d-flex justify-content-center align-items-center'>
                                <h1 className="home-nav" onClick={() => { this.props.ChangePages('explore') }}>Explore</h1>
                            </div>
                        </div>

                        <div className="container p-0 col-12 col-md-4 add-new">
                            <div className='nav-btn d-flex justify-content-center align-items-center'>
                                <h1 className="home-nav" onClick={() => { this.props.ChangePages('add-new') }}>Add new artist</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}