import React from 'react'
import ClientsRequests from '../Requests'
import TransporterRequests from './TransporterRequests'

const GenericReq = ({ role, name }) => {

  if (role === 'Client') {
    return( <TransporterRequests name={name}/>)
  }

  if (role === 'Transporter') {
    return( <ClientsRequests name={name}/>)
  }

  return (
    <div>
      
    </div>
  )
}

export default GenericReq
