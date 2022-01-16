import React from 'react'

const TransporterAc = ({name}) => {
  return (
        <div class = "container">
          <div class="row">
              <div class="col-md-4" style ={{marginTop:'10px'}}>
                  <div className="card shadow mb-4 mx-auto text-center" style={{ width: '10rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1', alignContent:'center' }}>
                    <h5 class="card-title"> {name}  </h5>
                    <h6 class="card-subtitle mb-2 text-muted"> Client </h6>
                  </div>

                </div>
              <div class="col-md-4" style ={{ alignContent: 'center', marginTop: '5%'}}>
                col 1,2 pentru Recomandari
              </div>
              <div class="row" style ={{ alignContent: 'center', marginTop: '5%'}}> 
              
                <div class = "col-md-4" >
                  <div className="card" style ={{backgroundColor: '#57abd1', padding: '15px'}}>
                  <h5 class="card-title" style ={{marginBottom:'20px'}}> Inregistrare cerere </h5>
                      <form class="row g-3">
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="1" placeholder="Data plecarii"/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="1" placeholder="Data maxima a plecarii"/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="2"  placeholder="Locul plecarii" />
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="3" placeholder="Data destinatiei"/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="3" placeholder="Data maxima a destinatiei"/>
                        </div>
                        <div class="col-md-4">
                          <input type="text" class="form-control" id="4" placeholder="Locul destinatiei"/>
                        </div>
                        <div class="col-md-12">
                          <input type="text" class="form-control" id="14" placeholder="Produs"/>                
                          </div>
                        <div class="col-md-6">
                          <input type="text" class="form-control" id="5" placeholder="Volum (m3)"/>
                        </div>
                        <div class="col-md-6">
                          <input type="text" class="form-control" id="6" placeholder="Greutate (tone)"/>
                        </div>
                        <div class="col-12">
                          <button type="submit" class="btn btn-primary" style ={{backgroundColor:"#031d44", borderColor:"#031d44"}}>Trimite oferta</button>
                        </div>
                      </form>
                  </div>
                  </div>
                
                <div class="col-md-4">
                  
                    col 2,2 pentru lista cu toate ofertele
                </div>
                </div>
            </div>
        </div>
  )
}

export default TransporterAc
