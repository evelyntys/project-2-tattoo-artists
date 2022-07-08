import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container, Form } from 'react-bootstrap';
import './App.css';
import AddNewArtist from './AddNewArtist';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#basic-navbar-nav"><img src={require('./tattoo.png')} width="40px" className="me-2" />TATTOOFINDWHO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className="mx-auto" href="#about-us">About Us / FAQ</Nav.Link>
                <Nav.Link className="mx-auto" href="#view-all">View all</Nav.Link>
                <Nav.Link className="mx-auto" href="#explore">Explore</Nav.Link>
                <Nav.Link className="mx-auto" href="#add-new">Add new</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div height="200px" width="100vw">
          <div height="100%" width="100%">
            <img width="100%" src="https://drive.google.com/uc?id=12PQFEtg6EJ7kSUiO8MWeHwYQ0O74b8hd" style={{ "objectFit": "cover" }} />
          </div>
        </div>

        <AddNewArtist />
      </React.Fragment>
    );
  }
}




// otherServices
// :
// Array


export default App;
