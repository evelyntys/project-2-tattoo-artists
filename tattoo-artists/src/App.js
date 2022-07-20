import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './App.css';
import AddNewArtist from './AddNewArtist';
import Explore from './Explore';
import FAQ from './FAQ';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Home';

//pass in the view-all state to show artists

class App extends React.Component {
  state = {
    active: "home",
    showOne: "false"
  }

  changeActive = (page) => {
    this.setState({
      active: page,
      showOne: "false"
    })
  }

  changePages() {
    if (this.state.active === "add-new") {
      return <AddNewArtist ChangePages={this.changeActive} />
    }
    else if (this.state.active === "home") {
      return <Home ChangePages={this.changeActive} />
    }
    else if (this.state.active === "faq") {
      return <FAQ />
    }
    else if (this.state.active === "explore") {
      return <Explore ChangePages={this.changeActive} renderAll = {this.state.showOne} />
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand className="logo" onClick={() => this.changeActive("home")}>
              <img src={require('./tattoo.png')} width="40px" className="me-2" alt="logo of website" />TATTOOFINDWHO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className="mx-auto" value='about-us' onClick={() => { this.changeActive("faq") }} >About Us / FAQ</Nav.Link>
                {/* <Nav.Link className="mx-auto" value='view-all' onClick={() => { this.changeActive("view-all") }} >View all</Nav.Link> */}
                <Nav.Link className="mx-auto" value='explore' onClick={() => { this.changeActive("explore") }}>Explore</Nav.Link>
                <Nav.Link className="mx-auto" value='add-new' onClick={() => { this.changeActive("add-new") }} >Add new</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {this.changePages()}
      </React.Fragment>
    );
  }
}


export default App;
