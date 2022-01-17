import React, { useState } from 'react';
import {format} from 'react-string-format'
import ChangeRole from './ChangeRole';

async function register(credentials) {
  return fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 
 



class AdminPanel extends React.Component{

    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    

    componentDidMount() {
        fetch(
            'http://localhost:8080/getUsers')
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
    <div className="card mx-auto" style ={{backgroundColor: '#c4d6b0', padding: '15px', width: '35rem', marginTop: '3rem'}}>
    <h5 class="card-title" style ={{marginBottom:'20px'}}> Admin Panel</h5>
    <div className = "accordion accordion-flush" id = "accordionFlushExample">
          {
            items.map((item) => ( 
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-toggle="collapse" data-target={format('#{0}', item.id)} aria-expanded="false" aria-controls="flush-collapseOne">
                      {item.name}
                    </button>
                    </h2>
                    <div id={item.id} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                    <div class="accordion-body">
                       <p> Email: {item.email} </p>
                       <p> Telefon: {item.phone} </p>
                       <p> Role: {item.role} </p>
                       <ChangeRole name={item.name}/>
                       
                    </div>
                    </div>
                </div>
            ))
        }
    </div>
</div>
);
    }

}

export default AdminPanel;