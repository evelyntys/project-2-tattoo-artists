import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './App.css';
import AddNewArtist from './pages/AddNewArtist';
import Explore from './pages/Explore';
import FAQ from './pages/FAQ';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './pages/Home';

//pass in the view-all state to show artists

class App extends React.Component {
  url = "https://etys-tattoo-artists.herokuapp.com/"

  state = {
    active: "home",
  }

  styleKeys = {
    "surrealism": { value: "surrealism", label: "Surrealism" },
    "traditional-americana": { value: "traditional-americana", label: "Traditional Americana" },
    "traditional-japanese": { value: "traditional-japanese", label: "Traditional Japanese" },
    "blackwork": { value: "blackwork", label: "Blackwork" },
    "minimalist": { value: "minimalist", label: "Minimalist" },
    "water-colour": { value: "water-colour", label: "Water colour" },
    "pet/animals": { value: "pet/animals", label: "Pet/Animals" },
    "floral": { value: "floral", label: "Floral" }
  }

  generalRadio = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Any", value: "any" }
  ]

  methodsCheckbox = [
    { label: "Handpoke", value: "handpoke" },
    { label: "Machine", value: "machine" },
    { label: "Jagua", value: "jagua" }
  ]

  inkCheckbox = [
    { label: "Black", value: "black" },
    { label: "Colours", value: "colours" },
    { label: "UV", value: "uv" },
    { label: "Jagua", value: "jagua" }
  ]

  genderRadio = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" }
  ]

  changeActive = (page) => {
    this.setState({
      active: page
    })
  }

  changePages() {
    if (this.state.active === "add-new") {
      return <AddNewArtist ChangePages={this.changeActive}
        url={this.url} generalRadio={this.generalRadio} methodsCheckbox={this.methodsCheckbox}
        inkCheckbox={this.inkCheckbox} genderRadio={this.genderRadio} />
    }
    else if (this.state.active === "home") {
      return <Home ChangePages={this.changeActive} />
    }
    else if (this.state.active === "faq") {
      return <FAQ />
    }
    else if (this.state.active === "explore") {
      return <Explore ChangePages={this.changeActive} renderAll={this.state.showOne}
        styleKeys={this.styleKeys} generalRadio={this.generalRadio} methodsCheckbox={this.methodsCheckbox}
        inkCheckbox={this.inkCheckbox} genderRadio={this.genderRadio}
        url={this.url} />
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.active !=="home"? <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand className="logo navbar-logo" onClick={() => this.changeActive("home")}>
              <img src={require('./images/tattoo.png')} width="40px" className="me-2" alt="logo of website" />TATTOOFINDWHO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className="mx-auto navbar-nav" value='about-us' onClick={() => { this.changeActive("faq") }} >FAQs</Nav.Link>
                <Nav.Link className="mx-auto navbar-nav" value='explore' onClick={() => { this.changeActive("explore") }}>Explore</Nav.Link>
                <Nav.Link className="mx-auto navbar-nav" value='add-new' onClick={() => { this.changeActive("add-new") }} >Add new</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar> : null}
        {this.changePages()}
      </React.Fragment>
    );
  }
}


export default App;
