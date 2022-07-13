import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import './App.css';
import AddNewArtist from './AddNewArtist';
import ShowAllArtists from './ShowAllArtists';
import AboutUs from './AboutUs';
import Explore from './Explore';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


class App extends React.Component {
  state = {
    active: "home"
  }

  changeActive(page) {
    this.setState({
      active: page
    })
  }

  changePages() {
    if (this.state.active === "add-new") {
      return <AddNewArtist />
    }
    else if (this.state.active === "view-all") {
      return <ShowAllArtists />
    }
    else if (this.state.active === "about-us") {
      return <AboutUs />
    }
    else if (this.state.active === "explore") {
      return <Explore />
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#basic-navbar-nav"><img src={require('./tattoo.png')} width="40px" className="me-2" />TATTOOFINDWHO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className="mx-auto" value='about-us' onClick={() => { this.changeActive("about-us") }} >About Us / FAQ</Nav.Link>
                <Nav.Link className="mx-auto" value='view-all' onClick={() => { this.changeActive("view-all") }} >View all</Nav.Link>
                <Nav.Link className="mx-auto" value='explore' onClick={() => { this.changeActive("explore") }}>Explore</Nav.Link>
                <Nav.Link className="mx-auto" value='add-new' onClick={() => { this.changeActive("add-new") }} >Add new</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div style={{"max-height":"300px", "width":"100vw", "position": "relative"}}>
        <img src="https://drive.google.com/uc?id=12PQFEtg6EJ7kSUiO8MWeHwYQ0O74b8hd" style={{ "objectFit": "cover", 'width': "100%", 'max-height': '300px' }} />
        {/* <div style={{ "color": "white", "backgroundColor": "black", 'width': "100%", "position": "absolute", "bottom": "0"}}>
          TATTOOFINDWHO
          </div> */}
        </div>

        {this.changePages()}
      </React.Fragment>
    );
  }
}


export default App;
