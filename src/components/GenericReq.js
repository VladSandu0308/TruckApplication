import React from 'react'
import ClientsRequests from '../Requests'
import TransporterRequests from './TransporterRequests'

const GenericReq = ({ role }) => {
  if (role === 'Client') {
    return( <ClientsRequests />)
  }

  if (role === 'Transporter') {
    return( <TransporterRequests />)
  }

  return (
    <div>
      
    </div>
  )
}

export default GenericReq
