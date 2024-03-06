import React from 'react'

const SSCards = ({img,index,setImagesPreview,imagesPreview}) => {
  const removeHandler = () => {
    setImagesPreview(imagesPreview.splice(index,1))
    console.log(imagesPreview);
  }
  return (
    <div className='border-2 rounded-md p-1 h-24 relative'>
        <img className='h-full w-full' src={img} alt='icon' />
        { <button type='button' onClick={removeHandler} className='absolute top-0 right-0 bg-slate-50 h-7 w-7 rounded-full' >
            <i className="bi bi-x text-xl"></i>
        </button> }
    </div>
  )
}

export default SSCards