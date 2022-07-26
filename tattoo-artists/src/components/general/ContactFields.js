import React from 'react';

export default function ContactFields(props) {

    let handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...props.inputList];
        list[index][name] = value;
        props.setInputList(list);
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
                    <React.Fragment key={i}>
                        <div className="row my-2">
                            <div className="col col-md-5">
                                <input type="text"
                                    className={props.class}
                                    name="contactKey"
                                    value={x.contactKey}
                                    placeholder="platform e.g. instagram"
                                    onChange={e => handleInputChange(e, i)} />
                            </div>

                            <div className="col col-md-5">
                                <input type="text"
                                    className={props.class}
                                    name="contactValue"
                                    value={x.contactValue}
                                    placeholder="platform e.g. @todayi.poke"
                                    onChange={e => handleInputChange(e, i)} />
                            </div>

                            <div className="col-3 col-md-2">
                                {props.inputList.length !== 1 && <button
                                    className="btn delete-button me-1 me-md-2"
                                    onClick={() => handleRemoveClick(i)}>-</button>}
                                {props.inputList.length - 1 === i && <button className="btn black-button" onClick={props.handleAddClick}>+</button>}
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    )
}