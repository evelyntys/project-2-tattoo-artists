import Select from 'react-select';
import React from 'react';

export default function StyleMultiSelect(props) {

    const options = [

        { value: "surrealism", label: "Surrealism" },
        { value: "traditional-americana", label: "Traditional Americana" },
        { value: "traditional-japanese", label: "Traditional Japanese" },
        { value: "blackwork", label: "Blackwork" },
        { value: "minimalist", label: "Minimalist" },
        { value: "water-colour", label: "Water colour" },
        { value: "pet/animals", label: "Pet/Animals" },
        { value: "floral", label: "Floral" }

    ]

    return (
        <Select
            isMulti
            name="style"
            options={options}
            value={props.style}
            onChange={props.handleSelect}
            className={props.border}
            classNamePrefix="select"
            theme={(theme) => ({
                ...theme,
                colors: {
                ...theme.colors,
                  primary25: '#e6e6e6',
                  primary: '#e6e6e6',
                },
              })} />
    )
}
