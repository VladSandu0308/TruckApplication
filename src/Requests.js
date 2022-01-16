import * as React from 'react'

class Requests extends React.Component{

    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        fetch(
            'http://localhost:8080/getClients')
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
                <h1> Client Requests </h1>  {
                    items.map((item) => ( 
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                {item.dep_date}
                            </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                            <div class="accordion-body">{item.arival_place}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }

}

export default Requests;