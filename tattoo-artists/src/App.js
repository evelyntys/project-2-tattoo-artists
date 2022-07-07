import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container, Form } from 'react-bootstrap';
import './App.css';

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

        <Container>
          <Form>
            <Container>
              <Form.Label>Name: </Form.Label>
              <Form.Control type="text" placeholder="enter your name" />
            </Container>

            <Container>
              <Form.Label>Gender: </Form.Label>
              <div className="mb-3">
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  value="female"
                  id="female"
                />
                <Form.Check
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  id="male"
                  value="male"
                />
                <Form.Check
                  inline
                  label="Others"
                  name="gender"
                  type="radio"
                  id="others"
                  value="others"
                  checked
                />
              </div>
            </Container>

            <Container>
              <Form.Label>Year started: </Form.Label>
              <Form.Control type="text" placeholder="enter the year you started tattooing" />
            </Container>

            <Container>
              <Form.Label>Are you a tattoo apprentice? </Form.Label>
              <div className="mb-3">
                <Form.Check
                  inline
                  label="Yes"
                  name="apprentice"
                  type="radio"
                  value="yes"
                  id="yes"
                />
                <Form.Check
                  inline
                  label="No"
                  name="apprentice"
                  type="radio"
                  id="no"
                  value="no"
                  checked
                />
              </div>
            </Container>

            <Container>
              <Form.Label>Please select your methods of tattooing: </Form.Label>
              <div className="mb-3">
                <Form.Check
                  inline
                  label="Handpoke"
                  name="methods"
                  type="checkbox"
                  value="handpoke"
                  id="handpoke"
                />
                <Form.Check
                  inline
                  label="Machine"
                  name="methods"
                  type="checkbox"
                  id="machine"
                  value="machine"
                />
                <Form.Check
                  inline
                  label="Jagua"
                  name="methods"
                  type="checkbox"
                  id="jagua"
                  value="jagua"
                />
              </div>
            </Container>

            <Container>
              <Form.Label>Is it temporary?</Form.Label>
              <Form.Select aria-label="Default select example" name="temporary">
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Select>
            </Container>

          </Form>

        </Container>
      </React.Fragment>
    );
  }
}

export default App;
