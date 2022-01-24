import * as React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {format} from 'react-string-format'

class ClientsRequests extends React.Component{

    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false,
            navigator: false
        };
    }

    componentDidMount() {
        fetch(
            'http://localhost:8080/getClients')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.sort((a, b) => { return b.budget - a.budget}),
                    DataisLoaded: true
            });
        })
    }

    handleAccept(client, int_place, arival_place, pay_deadline) {
    
        console.log("Room name: " + arival_place);
        
        return null;
    }
    
    render() {
        const { DataisLoaded, items, navigator } = this.state;
        if (!DataisLoaded)
            return(
                <div>
                    <h1> Pleses wait some time.... </h1>
                </div>);
        
        if (navigator) {
            return (
                <Navigate to={format('/review/{0}', this.state.user)} state={{"client": this.state.user}} />
            )
        }
   
   return (
       <div>
           <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                <h5 class="card-title" style ={{marginBottom:'20px'}}> Clients' Recommendations </h5>
                <div className = "accordion accordion-flush" id = "accordionFlushExample">
                    {
                        items.slice(0,2).map((item) => ( 
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.c_id)} aria-expanded="false" aria-controls="flush-collapseOne">
                                {item.username }: {item.dep_place} - {item.arival_place} 
                                </button>
                                </h2>
                                <div id={item.c_id} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                <p> Client: {item.username} </p>
                                <p> Email: {item.email} </p>
                                <p> Telefon: {item.phone} </p>
                                <p> Data plecarii: {item.dep_date} </p>
                                <p> Data maxima de plecare: {item.dep_max_date} </p>
                                <p> Data sosirii:  {item.arival_date} </p>
                                <p> Data maxima de sosire:  {item.arival_max_date} </p>
                                <p> Locatie Plecare: {item.dep_place}</p>
                                <p> Destinatie:  {item.arival_place} </p> 
                                <p> Tip produs: {item.product_type} </p>
                                <p> Volum (m3): {item.product_volume} </p>
                                <p> Greutate (tone): {item.product_weight} </p>
                                <p> Budget: {item.budget}</p>
                                <p> Observatii: {item.obs}</p>
                                <Link to={format('/review/{0}', item.c_id)} state={{ 
                                    transporter: this.props.name, 
                                    client: item.username,
                                    dep_place: item.dep_place,
                                    arival_place: item.arival_place,
                                    pay_deadline: item.arival_max_date,
                                    myself: "Transporter",
                                    id: item.c_id,
                                    dep_date: item.dep_date,
                                    arival_date: item.arival_date,
                                    obs: item.obs
                                    }} className="btn btn-info font-weight-bold">Accept Offer</Link>
                                </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                </div>
            {
                items.length > 2 ? (
                    <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                        <h5 class="card-title" style ={{marginBottom:'20px'}}> Clients' Requests </h5>
                        <div className = "accordion accordion-flush" id = "accordionFlushExample">
                            {
                                items.slice(2).map((item) => ( 
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.c_id)} aria-expanded="false" aria-controls="flush-collapseOne">
                                        {item.username }: {item.dep_place} - {item.arival_place} 
                                        </button>
                                        </h2>
                                        <div id={item.c_id} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                        <div class="accordion-body">
                                        <p> Client: {item.username} </p>
                                        <p> Email: {item.email} </p>
                                        <p> Telefon: {item.phone} </p>
                                        <p> Data plecarii: {item.dep_date} </p>
                                        <p> Data maxima de plecare: {item.dep_max_date} </p>
                                        <p> Data sosirii:  {item.arival_date} </p>
                                        <p> Data maxima de sosire:  {item.arival_max_date} </p>
                                        <p> Locatie Plecare: {item.dep_place}</p>
                                        <p> Destinatie:  {item.arival_place} </p> 
                                        <p> Tip produs: {item.product_type} </p>
                                        <p> Volum (m3): {item.product_volume} </p>
                                        <p> Greutate (tone): {item.product_weight} </p>
                                        <p> Budget: {item.budget}</p>
                                        <p> Observatii: {item.obs}</p>
                                        <Link to={format('/review/{0}', item.c_id)} state={{ 
                                            transporter: this.props.name, 
                                            client: item.username,
                                            dep_place: item.dep_place,
                                            arival_place: item.arival_place,
                                            pay_deadline: item.arival_max_date,
                                            myself: "Transporter",
                                            id: item.c_id,
                                            dep_date: item.dep_date,
                                            arival_date: item.arival_date,
                                            obs: item.obs
                                            }} className="btn btn-info font-weight-bold">Accept Offer</Link>
                                        </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        </div>
                ) : (
                    <></>
                )
            }
           
       </div>
    
);
    }

}

export default ClientsRequests;