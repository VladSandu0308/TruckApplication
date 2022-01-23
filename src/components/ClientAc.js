import React, {useState} from 'react'
import ClientsRequests from '../Requests'

async function register(credentials) {
  return fetch('http://localhost:8080/clientRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const TransporterAc = ({name}) => {
  const [dep_date, setDepdate] = useState();
  const [dep_max_date, setDepmaxdate] = useState();
  const [dep_place, setDepplace] = useState();
  const [arival_date, setArivaldate] = useState();
  const [arival_max_date, setArivalmaxdate] = useState();
  const [arival_place, setArivalplace] = useState();
  const [product_type, setProducttype] = useState();
  const [product_volume, setVolume] = useState();
  const [product_weight, setWeight] = useState();
  const [budget, setBudget] = useState();
  const [obs, setObs] = useState("");

  const [token, setToken] = useState(0);
  const user = name



  const handleSubmit = async e => {
    e.preventDefault();
        const retBody = await register({
          dep_date,
          dep_max_date,
          dep_place,
          arival_date,
          arival_max_date,
          arival_place,
          product_type,
          product_weight,
          product_volume,
          user,
          budget,
          obs

        });

        setToken(retBody);

}


  return (
        <div class = "container">
          <div class="row">
                  <div className="card shadow mb-1 mx-auto text-center" style={{ marginTop:'3px', width: '10rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1', alignContent:'center' }}>
                    <h5 class="card-title"> {name}  </h5>
                    <h6 class="card-subtitle mb-2 text-muted"> Client </h6>
                  </div>
              <div class="row" style ={{ alignContent: 'center', marginTop: '5%'}}> 
                  <div className="card mx-auto" style ={{backgroundColor: '#57abd1', padding: '15px', width: '40rem'}}>
                  <h5 class="card-title" style ={{marginBottom:'20px'}}> Inregistrare cerere </h5>
                      <form class="row g-3" onSubmit={handleSubmit}>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="1" placeholder="Data plecarii"  onChange={e => setDepdate(e.target.value)}/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="1" placeholder="Data maxima a plecarii"  onChange={e => setDepmaxdate(e.target.value)}/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="2"  placeholder="Locul plecarii"  onChange={e => setDepplace(e.target.value)} />
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="3" placeholder="Data destinatiei"  onChange={e => setArivaldate(e.target.value)}/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="3" placeholder="Data maxima a destinatiei"  onChange={e => setArivalmaxdate(e.target.value)}/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="4" placeholder="Locul destinatiei"  onChange={e => setArivalplace(e.target.value)}/>
                        </div>
                        <div class="col-md-12">
                        <select id="inputState" class="form-select" onChange={e => setProducttype(e.target.value)}>
                            <option selected>Tip Marfa..</option>
                            <option>Mobila</option>
                            <option>Animale</option>
                            <option>Alimente</option>
                            <option>Echipamente medicale</option>
                            <option>Autoturisme</option>
                            <option>Electronice</option>
                            <option>Utilaje</option>
                            <option>Materiale constructii</option>
                            <option>Piese auto</option>
                          </select>               
                          </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="5" placeholder="Volum (m3)"  onChange={e => setVolume(e.target.value)}/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="6" placeholder="Greutate (tone)"  onChange={e => setWeight(e.target.value)}/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="7" placeholder="Buget"  onChange={e => setBudget(e.target.value)}/>
                        </div>
                        <div class="col-md-12">
                          <input type="text" class="form-control" id="6" placeholder="Observatii"  onChange={e => setObs(e.target.value)}/>
                        </div>
                        <div class="col-12">
                          <button type="submit" class="btn btn-primary" style ={{backgroundColor:"#031d44", borderColor:"#031d44"}}>Trimite oferta</button>
                        </div>
                      </form>
                </div>
              </div>
              <div className='row'>

              </div>
            </div>
        </div>
  )
}

export default TransporterAc
