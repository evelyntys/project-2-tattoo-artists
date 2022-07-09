import React from 'react';
import axios from 'axios';

export default class ShowAllArtists extends React.Component{
    url = "https://8888-evelyntys-project2restf-q3ufqgdmigx.ws-us53.gitpod.io/"
    state = {
        data: []
    }
    async componentDidMount(){
        let response = await axios.get(this.url + 'show-artists');
        this.setState({
            data: response.data
        })
        console.log(response.data)
        console.log(this.state.data)
    }
    render() {
        return(
            <React.Fragment>
                {this.state.data.map(e => (
                    <React.Fragment>
                        <div className="card">
                        <div className="card-title">{e.name}</div>
                        <div className="card-body">{e.gender}</div>
                        </div>
                    </React.Fragment>
                ))}
            </React.Fragment>
        )
    }
}