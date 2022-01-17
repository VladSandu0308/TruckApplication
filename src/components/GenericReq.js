import React from 'react'
import ClientsRequests from '../Requests'
import TransporterRequests from './TransporterRequests'

const GenericReq = ({ role }) => {
  if (role === 'Client') {
    return( <TransporterRequests />)
  }

  if (role === 'Transporter') {
    return( <ClientsRequests />)
  }

  return (
    <div>
      
    </div>
  )
}

export default GenericReq
