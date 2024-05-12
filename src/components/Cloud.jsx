import React from 'react'

const Cloud = () => {
  return (
    <div className='obj bg-light text-dark p-1 rounded' style={{
      marginTop: `${(Math.floor(Math.random() * window.innerHeight) / 2) / 2}px`
    }}>
      Cloud
    </div>
  )
}

export default Cloud