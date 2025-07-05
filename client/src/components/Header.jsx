import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
        <div className=''>
            <p>Best text to image generator</p>
            <img src={assets.star_icon} alt="" />
        </div>
    </div>
  )
}

export default Header