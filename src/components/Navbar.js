import React from 'react'

const Navbar = ({title}) => {
  return (
    <div className='p-2 flex justify-between'>
        <i class="bi bi-arrow-left-circle"></i>
        <span>{title}</span>
    </div>
  )
}

export default Navbar