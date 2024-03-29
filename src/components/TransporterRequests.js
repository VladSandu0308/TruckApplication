import React from 'react'
import { Link } from 'react-router-dom';
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
                    items: json.sort((a, b) => { return a.full_price - b.full_price || a.empty_price - b.empty_price}),
                    DataisLoaded: true
            })
        })
    }

    handleAccept(username) {
    
        console.log("Room name: " + username);
        
    }

    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded)
            return(
                <div>
                    <h1> Pleses wait some time.... </h1>
                </div>);
        
        console.log("Name:" + this.props.name);
   
        return (
            <div>
                <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
                    <h5 class="card-title" style ={{marginBottom:'20px'}}> Transporters' Recommendations </h5>
                    <div className = "accordion accordion-flush" id = "accordionFlushExample">
                    {
                            items.slice(0,2).map((item) => ( 
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.t_id)} aria-expanded="false" aria-controls="flush-collapseOne">
                                    {item.username }: {item.dep_place} - {item.arival_place} 
                                    </button>
                                    </h2>
                                    <div id={item.t_id} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                    <p> Transportator: {item.username} </p>
                                    <p> Email: {item.email} </p>
                                    <p> Telefon: {item.phone} </p>
                                    <p> Data plecarii: {item.dep_date} </p>
                                    <p> Locul plecarii: {item.dep_place} </p>
                                    <p> Data sosirii:  {item.arival_date} </p>
                                    <p> Destinatie:  {item.arival_place} </p> 
                                    <p> Tip camion: {item.truck_type} </p>
                                    <p> Volum (m3): {item.volume} </p>
                                    <p> Greutate (tone): {item.weight} </p>
                                    <p> Lungime: {item.length} </p>
                                    <p> Latime: {item.width} </p>
                                    <p> Inaltime: {item.height} </p>
                                    <p> Pret/km preluare: {item.empty_price} </p>
                                    <p> Pret/km livrare: {item.full_price} </p>
                                    <p> Observatii: {item.obs}</p>
                                    <Link to={format('/review/{0}', item.t_id)} state={{ 
                                            client: this.props.name, 
                                            transporter: item.username,
                                            dep_place: item.dep_place,
                                            arival_place: item.arival_place,
                                            pay_deadline: item.arival_date,
                                            myself: "Client",
                                            id: item.t_id,
                                            empty_price: item.empty_price,
                                            full_price: item.full_price,
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
                            <h5 class="card-title" style ={{marginBottom:'20px'}}> Transporters' Offers </h5>
                            <div className = "accordion accordion-flush" id = "accordionFlushExample">
                                {
                                    items.slice(2).map((item) => ( 
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="flush-headingOne">
                                            <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.t_id)} aria-expanded="false" aria-controls="flush-collapseOne">
                                            {item.username }: {item.dep_place} - {item.arival_place} 
                                            </button>
                                            </h2>
                                            <div id={item.t_id} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                            <div class="accordion-body">
                                            <p> Transportator: {item.username} </p>
                                            <p> Email: {item.email} </p>
                                            <p> Telefon: {item.phone} </p>
                                            <p> Data plecarii: {item.dep_date} </p>
                                            <p> Locul plecarii: {item.dep_place} </p>
                                            <p> Data sosirii:  {item.arival_date} </p>
                                            <p> Destinatie:  {item.arival_place} </p> 
                                            <p> Tip camion: {item.truck_type} </p>
                                            <p> Volum (m3): {item.volume} </p>
                                            <p> Greutate (tone): {item.weight} </p>
                                            <p> Lungime: {item.length} </p>
                                            <p> Latime: {item.width} </p>
                                            <p> Inaltime: {item.height} </p>
                                            <p> Pret/km preluare: {item.empty_price} </p>
                                            <p> Pret/km livrare: {item.full_price} </p>
                                            <p> Observatii: {item.obs}</p>
                                            <Link to={format('/review/{0}', item.t_id)} state={{ 
                                                    client: this.props.name, 
                                                    transporter: item.username,
                                                    dep_place: item.dep_place,
                                                    arival_place: item.arival_place,
                                                    pay_deadline: item.arival_date,
                                                    myself: "Client",
                                                    id: item.t_id,
                                                    empty_price: item.empty_price,
                                                    full_price: item.full_price,
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

export default TransporterRequests
