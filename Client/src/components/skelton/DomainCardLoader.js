import { Skeleton } from '@mui/material'
import React from 'react'

const DomainCardLoader = () => {
  return (
    <div className="grid grid-cols-5 mt-2">
			<div className="flex flex-col justify-center items-center">
				<Skeleton variant="rounded"  width={65} height={65} sx={{borderRadius:3}}/>
			</div>
            <div className="flex flex-col justify-center items-center">
				<Skeleton variant="rounded"  width={65} height={65} sx={{borderRadius:3}}/>
			</div>
            <div className="flex flex-col justify-center items-center">
				<Skeleton variant="rounded"  width={65} height={65} sx={{borderRadius:3}}/>
			</div>
            <div className="flex flex-col justify-center items-center">
				<Skeleton variant="rounded"  width={65} height={65} sx={{borderRadius:3}}/>
			</div>
            <div className="flex flex-col justify-center items-center">
				<Skeleton variant="rounded"  width={65} height={65} sx={{borderRadius:3}}/>
			</div>
            
            
		</div>
  )
}

export default DomainCardLoader