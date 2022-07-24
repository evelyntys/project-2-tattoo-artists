import React from 'react';

export default function ValidateFields(props) {
    let content = ""
    if (props.field.includes("name") && (!props.state || props.state.length < 2)) {
        content = `Please ensure that the ${props.field} is at least 2 characters long`
    }

    if (props.field.includes("year") && (!props.state || isNaN(parseInt(props.state)))) {
        content = `Please ensure that you fill in a valid year`
    }

    if (props.field.includes("general-checkbox") && props.state.length === 0) {
        content = `Please ensure that you select at least one ${props.message}`
    }

    if (props.field.includes("style") && (props.state.length === 0 || props.state === null || props.state.length > 3)) {
        content = "Please ensure that you select at least one and at most 3 styles"
    }

    if (props.field.includes('contact')) {
        if (!props.state[0].contactKey || !props.state[0].contactValue) {
            content = "Please enter at least one contact information"; 
        }
        let instagram = props.state.find((element) => {
            return element.contactKey === 'instagram';
        })
        if (instagram) {
            if (!instagram.contactValue.includes('@'))
                content += " and include the '@' on your instagram handle"
            else {
                content += ""
            }
        }
        else {
            content += " and ensure that you include your instagram"
        }

        
    }

    if (props.field.includes("general") && props.state.length === 0){
        content = `Please provide ${props.message}`
    }

    if (props.field.includes("unit") && (!props.state || !props.state.includes('#') || !props.state.includes('-'))){
        content = "Please enter the unit number and ensure that it contains a '#' and '-'"
    }

    if (props.field.includes("postal") && (!props.state || props.state.length !==6 || isNaN(parseInt(props.state)))){
        content = "Please enter a valid postal code"
    }

    if (props.field.includes("email") && (!props.state || !props.state.includes('@') || !props.state.includes('.com'))){
        content = "Please enter a valid email"
    }

    return (
        <div className="error-message">
            {content}
        </div>
    )
}