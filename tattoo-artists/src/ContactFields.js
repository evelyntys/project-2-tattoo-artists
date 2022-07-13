// import React, { useState } from 'react';

// export default function ContactFields() {
//     const [inputList, setInputList] = useState([{ contactKey: "", contactValue: "" }]);

//     let handleInputChange = (e, index) => {
//         const { name, value } = e.target;
//         const list = [...inputList];
//         list[index][name] = value;
//         setInputList(list);
//         console.log(name, value)
//     }

//     let handleRemoveClick = index => {
//         const list = [...inputList];
//         list.splice(index, 1);
//         setInputList(list)
//     }

//    let handleAddClick = () => {
//         setInputList([...inputList, { contactKey: "", contactValue: "" }])
//     }

//     return (
//         <div className="contacts">
//             {inputList.map((x, i) => {
//                 return (
//                     <div className="box">
//                         <input name="contactKey"
//                             value={x.contactKey}
//                             placeholder="platform e.g. instagram"
//                             onChange={e => handleInputChange(e, i)} />

//                         <input className="ml10"
//                             name="contactValue"
//                             value={x.contactValue}
//                             placeholder="platform e.g. @todayi.poke"
//                             onChange={e => handleInputChange(e, i)} />

//                         <div className="btn-box">
//                             {inputList.length !== 1 && <button
//                                 className="mr10"
//                                 onClick={() => handleRemoveClick(i)}>Remove</button>}
//                             {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
//                         </div>
//                     </div>
//                 );
//             })}
//             <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
//         </div>
//     )
// }


import React, { useState } from 'react';

export default function ContactFields(props) {

    let handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...props.inputList];
        list[index][name] = value;
        props.setInputList(list);
        console.log(name, value)
    }

    let handleRemoveClick = index => {
        const list = [...props.inputList];
        list.splice(index, 1);
        props.setInputList(list)
    }

    return (
        <div className="contacts">
            {props.inputList.map((x, i) => {
                return (
                    <div className="row">
                        <div className="col">
                            <input type="text"
                                className="form-control"
                                name="contactKey"
                                value={x.contactKey}
                                placeholder="platform e.g. instagram"
                                onChange={e => handleInputChange(e, i)} />
                        </div>

                        <div className="col">
                            <input type="text"
                                className="form-control"
                                name="contactValue"
                                value={x.contactValue}
                                placeholder="platform e.g. @todayi.poke"
                                onChange={e => handleInputChange(e, i)} />
                        </div>

                        <div className="btn-box">
                            {props.inputList.length !== 1 && <button
                                className="btn btn-danger my-2"
                                onClick={() => handleRemoveClick(i)}>Remove</button>}
                            {props.inputList.length - 1 === i && <button className="btn btn-primary my-2" onClick={props.handleAddClick}>Add</button>}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}