import React from 'react'

const Navbar = ({title}) => {
  return (
    <div className='p-3 flex justify-between bg-gray-50 shadow-md fixed top-0 w-full'>
        <i className="bi bi-arrow-left-circle text-2xl text-gray-400"></i>
        <span className='text-lg font-medium'>{title}</span>
        <div></div>
    </div>
  )
}

export default Navbar