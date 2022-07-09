import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';
import './App.css';
import AddNewArtist from './AddNewArtist';
import ShowAllArtists from './ShowAllArtists';

class App extends React.Component {
  state = {
    active: "home"
  }

  changeActive(page) {
    this.setState({
      active: page
    })
  }

  changePages(){
    if (this.state.active==="add-new"){
      return <AddNewArtist />
    }
    else if (this.state.active==="view-all"){
      return <ShowAllArtists/>
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
                <Nav.Link className="mx-auto" value ='about-us' onClick={() => {this.changeActive("about-us")}} >About Us / FAQ</Nav.Link>
                <Nav.Link className="mx-auto" value='view-all'  onClick={() => {this.changeActive("view-all")}} >View all</Nav.Link>
                <Nav.Link className="mx-auto" value='explore'  onClick={() => {this.changeActive("explore")}}>Explore</Nav.Link>
                <Nav.Link className="mx-auto" value='add-new'  onClick={() => {this.changeActive("add-new")}} >Add new</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div height="200px" width="100vw">
          <div height="100%" width="100%">
            <img width="100%" src="https://drive.google.com/uc?id=12PQFEtg6EJ7kSUiO8MWeHwYQ0O74b8hd" style={{ "objectFit": "cover" }} />
          </div>
          <div height="100%" width="100%" style={{"backgroundColor": "black"}}>

          </div>
        </div>

        {this.changePages()}
      </React.Fragment>
    );
  }
}


export default App;
