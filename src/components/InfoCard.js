import React from 'react'
import { infoCardDetails } from '../utils/constants'
import InfoSubCard from './InfoSubCard'

const InfoCard = () => {

  return (
    <div className='bg-white p-3 my-3'>
        <span className='font-medium text-lg'>Information</span>
        <hr className='my-2'></hr>
        <div className=''>
            {infoCardDetails.map(item => <InfoSubCard name={item.name} value={item.value}/>)}
        </div>
    </div>
  )
}

export default InfoCard