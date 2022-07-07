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

        <div className="container">
          <div className="container">
            <h1>Information about the artist</h1>
            <div>
              <label className="form-label">Name of tattoo artist: </label>
              <input type="text" className="form-control" placeholder="artist name" name="name" />
            </div>

            <div>
              <label className="form-label">Gender: </label>
              <input type="radio" className="form-check-input mx-2" value="female" name="gender" /><label className="form-check-label">Female</label>
              <input type="radio" className="form-check-input mx-2" value="male" name="gender" /><label className="form-check-label">Male</label>
              <input type="radio" className="form-check-input mx-2" value="others" name="gender" checked /><label className="form-check-label">Others</label>
            </div>

            <div>
              <label className="form-label">Year started tattooing: </label>
              <input type="text" className="form-control" placeholder="year you started tattooing" name="name" />
            </div>

            <div>
              <label className="form-label">Are you an apprentice? </label>
              <input type="radio" className="form-check-input mx-2" value="yes" name="apprentice" /><label className="form-check-label">Yes</label>
              <input type="radio" className="form-check-input mx-2" value="no" name="apprentice" checked /><label className="form-check-label">No</label>
            </div>

            <div>
              <label className="form-label">Please select your method(s) of tattooing:</label>
              <input type="checkbox" className="form-check-input mx-2" value="handpoke" name="methods" /><label className="form-check-label">Handpoke</label>
              <input type="checkbox" className="form-check-input mx-2" value="machine" name="methods" /><label className="form-check-label">Machine</label>
              <input type="checkbox" className="form-check-input mx-2" value="jagua" name="methods" /><label className="form-check-label">Jagua</label>
            </div>

            <div>
              <label className="form-label">Is it temporary? </label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Please select...</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div>
              <label className="form-label">Please select your style(s) of tattoo (up to 3): </label>
              {/* to put multiselect */}
              <select class="form-select" aria-label="Default select example" multiple>
                <option value="surrealism">Surrealism</option>
                <option value="traditional-americana">Traditional Americana</option>
                <option value="traditional-japanese">Traditional Japanese</option>
                <option value="blackwork">Blackwork</option>
                <option value="minimalist">Minimalist</option>
                <option value="water-colour">Water Colour</option>
                <option value="pet/animals">Pet/Animals</option>
                <option value="floral">Floral</option>
              </select>
            </div>


            <div>
              <label className="form-label">Please select your ink(s):</label>
              <input type="checkbox" className="form-check-input mx-2" value="black" name="methods" /><label className="form-check-label">Black</label>
              <input type="checkbox" className="form-check-input mx-2" value="colours" name="methods" /><label className="form-check-label">Colours</label>
              <input type="checkbox" className="form-check-input mx-2" value="jagua" name="methods" /><label className="form-check-label">Jagua</label>
              <input type="checkbox" className="form-check-input mx-2" value="uv" name="methods" /><label className="form-check-label">UV</label>
            </div>

            <div>
              <label className="form-label">Please enter your contact details: </label>
              <div className="row">
                <div className="col">
                  <input type="text" className="form-control" name="contactKey" placeholder="platform e.g. instagram" />
                </div>
                <div className="col">
                  <input type="text" className="form-control" name="contactValue" placeholder="your contact" />
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Please provide links to your reference artwork (up to 3): </label>
              <input type="text" className="form-control" placeholder="image link" name="images" />
              <input type="text" className="form-control" placeholder="image link" name="images" />
              <input type="text" className="form-control" placeholder="image link" name="images" />
            </div>

            <div>
              <label className="form-label">Your name: </label>
              <input type="text" className="form-control" placeholder="e.g. John Doe" name="ownerName" />
              <label className="form-label">Your email: </label>
              <input type="text" className="form-control" placeholder="e.g. johndoe@email.com" name="ownerEmail" />
            </div>
          </div>

          <div className="container">
            <h1>Information about the studio</h1>
            <div>
              <label className="form-label">Name of studio: </label>
              <input type="text" className="form-control" placeholder="studio name" name="studio-name" />
            </div>

            <div>
              <label className="form-label">Is it a private studio? </label>
              <input type="radio" className="form-check-input mx-2" value="yes" name="private" /><label className="form-check-label">Yes</label>
              <input type="radio" className="form-check-input mx-2" value="no" name="private" checked /><label className="form-check-label">No</label>
            </div>

            <div>
              <label className="form-label">Are bookings required? </label>
              <input type="radio" className="form-check-input mx-2" value="yes" name="bookingsRequired" /><label className="form-check-label">Yes</label>
              <input type="radio" className="form-check-input mx-2" value="no" name="bookingsRequired" checked /><label className="form-check-label">No</label>
            </div>

            <div>
              <h6>Address</h6>
              <label className="form-label">Street: (please enter "nil" if not applicable)</label>
              <input type="text" className="form-control" placeholder="street" name="street" />
              <label className="form-label">Unit: (please enter "nil" if not applicable)</label>
              <input type="text" className="form-control" placeholder="unit" name="unit" />
              <label className="form-label">Postal Code: (please enter "000000" if not applicable)</label>
              <input type="text" className="form-control" placeholder="postal code" name="postal" />
            </div>

            <div>
              <label className="form-label">Does your studio offer any other services? (please enter nil if no): </label>
              <input type="text" className="form-control" placeholder="e.g. piercings" name="otherServices" />
            </div>

            <button className="btn btn-primary mt-2">Add new artist</button>
          </div>

          
        </div>
      </React.Fragment>
    );
  }
}




// otherServices
// :
// Array


export default App;
