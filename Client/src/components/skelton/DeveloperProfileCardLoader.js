import { Skeleton } from '@mui/material'
import React from 'react'

const DeveloperProfileCardLoader = () => {
  return (
    <div className='flex flex-col items-center gap-1'>
        <Skeleton variant="circular" width={60} height={60} />
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="rounded" width={170} height={35} />
    </div>
  )
}

export default DeveloperProfileCardLoader