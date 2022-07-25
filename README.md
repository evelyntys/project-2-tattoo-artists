# TATTOOFINDWHO

## Project Summary
This website aims to serve as a source of reference for users interested in getting a tattoo or just discovering tattoo artists in Singapore.

This website could also serve as a platform for newer tattoo artists to be visible to potential customers.

The main target audience intended would be:
* Individuals above 18 looking for a tattoo artist to get a tattoo
* Tattoo artists interested in growing their customer base

### <b>Organisation's Goals</b>
* As there are various tattoo artists available with different methods and styles as well as inks used, we aim to compile a centralised list of tattoo artists available in Singapore.

### <b>User's Goals</b>
* Users should be able to easily obtain information about the various artists in Singapore, such as their contact information as well as their portfolio. They should also be able to view the reviews left behind by previous clients to help them make an informed decision on something that will be on their body permanently.

## The Five Planes of UI/UX
### <b>1. Strategy</b>
#### Organisation
* Objective: To provide information about the available tattoo artists in the database

#### Users: Potential clients and tattoo artists
* Objective: To discover the various tattoo artists in Singapore and view their portfolio of works
* Needs:
    * To search about the tattoo artists, and the various methods and/or styles
    * Tattoos artist to create their own listing and potentially gain a greater customer base/following
    * To be able to leave reviews and view reviews left by other people
* Pain points:
    * Need to find out about the tattoo artists offering the method(s) and style(s) of tattoo they are interested in
    * Need to find out about whether bookings are required beforehand

 User Stories    | Acceptance Criteria(s)    
 -------------   | ---------------------      
As someone interested in getting a tattoo, I am concerned about whether the tattoo artist offers my style(s) and/or method(s) and/or ink(s) of interest, and if bookings are required beforehand.| <ul><li>Listings to be searchable by styles, methods, ink, and if bookings are required prior</li></ul>
As someone planning to get a tattoo on a possibly intimate area, I would be concerned about whether the studio offers a private space, about the gender of the tattoo artist, and also to read available reviews | <ul><li>Listings to be searchable by the tattoo artist's gender and whether the studio is private</li><li>Each tattoo artist to have a review section for users to freely view and add reviews</li></ul>
As a tattoo artist looking to gain exposure and potentially increase my customer base, I would want to be able to showcase my works and be easily contactable if there are potential interested clients. | <ul><li>A create form to allow users to add their contact information and reference image link</li></ul>

### <b> 2. Scope</b>

<b>Content</b>

Content from the website is largely dependent on contribution the general public. Contributions will be stored in a database, hence a backend server is required for communication between React and MongoDB. An Express server has been set up and deployed to Heroku, and API endpoints are accessible via the base [link](link).

<b>Functional Requirements</b>
<ul><li>Search filters to include: artist name, artist's instagram handle, studio name, gender, years of experience, whether they are an apprentice, whether they offer temporary or permanent tattoos methods, inks, styles, whether bookings are required, whether the studio is private</li><li>Create new tattoo artist listing</li><li>Edit and delete for each tattoo artist listing</li><li>Reviews for each tattoo artist listing</li><li>Each listing and review will be tagged to a specific owner, and the same email has to be provided before modifications/deletions can occur</li></ul>

<b>Non-functional Requirements</b>
<ul><li>Mobile responsiveness: the site's functionality should still remain on mobile version and their experience should still be optimized</li><li>Loading gif to indicate that the site is still retrieivng data from the restful API</li></ul>

### <b> 3. Structure</b>
A structure of the website initially developed during brainstorming has been attached [here](link) for reference.

### <b> 4. Skeleton</b>
An initial wireframe of the site layout has been attached [here](link) for reference.

### <b> 5. Surface</b>
* The main colours used in this website include black, white and dark red to create a sleek and consistent look with a mature theme.
* Fonts used in this website include:
    * Raleway for general body text
    * Poiret One for headings 

## Testing
Details for the test cases can be found [here](link).

## Technologies Used
<b>Backend</b>
* MongoDB was used as the database to create a restful API
* Express
* NodeJS
* cors
* dotenv 

<b>Frontend</b>
* React
* Axios
* Bootstrap
* React Bootstrap

## Credits