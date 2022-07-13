import Select from 'react-select';
import {React, useState} from 'react';

// original
// export default function StyleMultiSelect() {
//     const [selectedOptions, setSelectedOptions] = useState();
//     const options = [

//         { value: "surrealism", label: "Surrealism" },
//         { value: "traditional-americana", label: "Traditional Americana" },
//         { value: "traditional-japanese", label: "Traditional Japanese" },
//         { value: "blackwork", label: "Blackwork" },
//         { value: "minimalist", label: "Minimalist" },
//         { value: "water-colour", label: "Water colour" },
//         { value: "pet/animals", label: "Pet/Animals" },
//         { value: "floral", label: "Floral" }
    
//     ]

//     async function handleSelect(data){
//         setSelectedOptions(data);
//         console.log(data)
//     }

//     return(
//         <Select
//             isMulti
//             name="style"
//             options={options}
//             value={selectedOptions}
//             onChange={handleSelect}
//             className="basic-multi-select"
//             classNamePrefix="select" />
//         )
// }

export default function StyleMultiSelect (props) {
    
    // const [selectedOptions, setSelectedOptions] = useState();
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

    return(
        <Select
            isMulti
            name="style"
            options={options}
            value={props.style}
            onChange={props.handleSelect}
            className="basic-multi-select"
            classNamePrefix="select" />
        )
}
