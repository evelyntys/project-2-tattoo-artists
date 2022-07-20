import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ "maxHeight": "300px", "width": "100vw", "position": "relative" }}>
          <img src="https://drive.google.com/uc?id=12PQFEtg6EJ7kSUiO8MWeHwYQ0O74b8hd" style={{ "objectFit": "cover", 'width': "100%", 'maxHeight': '300px' }} alt="gif of tattoo process" />
          {/* <div style={{ "color": "white", "backgroundColor": "black", 'width': "100%", "position": "absolute", "bottom": "0"}}>
          TATTOOFINDWHO
          </div> */}
        </div>
                <div className="container">
                    Interested in getting a tattoo?
                    <div className="row">
                        <div className="container col-12 col-md-4 explore" style={{ "border": "1px solid black", "height": "300px" }}>
                            <div className='nav-btn d-flex justify-content-center align-items-center' onClick={() => { this.props.ChangePages('explore') }}>Explore</div>
                        </div>

                        <div className="container col-12 col-md-4 faq" style={{ "border": "1px solid black", "height": "300px" }}>
                            <div className='nav-btn d-flex justify-content-center align-items-center' onClick={() => { this.props.ChangePages('faq') }}>FAQ</div>
                        </div>

                        <div className="container col-12 col-md-4 add-new" style={{ "border": "1px solid black", "height": "300px" }}>
                            <div className='nav-btn d-flex justify-content-center align-items-center' onClick={() => { this.props.ChangePages('add-new') }}>Add new artist</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}