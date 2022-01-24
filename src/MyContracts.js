import * as React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {format} from 'react-string-format'

class MyContracts extends React.Component{

    constructor(props) {
        super(props);
        this.props = props;
   
        this.state = {
            items: [],
            DataisLoaded: false,
            navigator: false
        };
    }

    componentDidMount() {
        fetch(
            'http://localhost:8080/getContracts')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
            });
        })
    }
    
    render() {
        const { DataisLoaded, items, navigator } = this.state;
        if (!DataisLoaded)
            return(
                <div>
                    <h1> Pleses wait some time.... </h1>
                </div>);
   
   return (
       <div>
           <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                <h5 class="card-title" style ={{marginBottom:'20px'}}> Your Contracts </h5>
                <div className = "accordion accordion-flush" id = "accordionFlushExample">
                    {
                        items.filter((item) => {return item.t_username === this.props.name || item.c_username === this.props.name || this.props.role === "Admin"}).map((item) => ( 
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.c_id)} aria-expanded="false" aria-controls="flush-collapseOne">
                                {item.dep_place} - {item.arival_place} 
                                </button>
                                </h2>
                                <div id={item.c_id} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                <p> Client: {item.c_username} </p>
                                <p> Email Client: {item.c_email} </p>
                                <p> Telefon Client: {item.c_phone} </p>
                                <p> Transportator: {item.t_username}</p>
                                <p> Email Transportator: {item.t_email}</p>
                                <p> Telefon Transportator: {item.t_phone}</p>
                                <p> Data plecarii: {item.dep_date} </p>
                                <p> Data sosirii:  {item.arival_date} </p>
                                <p> Locatie Plecare: {item.dep_place}</p>
                                <p> Locatie Preluare Colet: {item.int_place}</p>
                                <p> Destinatie:  {item.arival_place} </p> 
                                <p> Pret: {item.price}</p>
                                <div>
                                    {(item.finished && <p> Stare Transport: Completat</p>) || (!item.finished && <p> Stare Transport: In Tranzit</p>)}
                                </div>
                                <p> Observatii: {item.obs}</p>
                                </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                </div>
           
       </div>
    
);
    }

}

export default MyContracts;