import React from 'react'
import {format} from 'react-string-format'

class TransporterRequests extends React.Component{

    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        fetch(
            'http://localhost:8080/getTransporters')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
            });
        })
    }

    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded)
            return(
                <div>
                    <h1> Pleses wait some time.... </h1>
                </div>);
   
        return (
            
            <div className = "accordion accordion-flush" id = "accordionFlushExample">
                <h1> Transporter Requests </h1>  {
                    items.map((item) => ( 
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.t_id)} aria-expanded="false" aria-controls="flush-collapseOne">
                                {item.dep_date}
                            </button>
                            </h2>
                            <div id={item.t_id} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                            <div class="accordion-body">{item.arival_place}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }

}

export default TransporterRequests
