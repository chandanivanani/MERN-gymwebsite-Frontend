import React from 'react'
import {Link} from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import Logo from '../../images/MainLogo.png'
type Props = {}

const Footer = (props: Props) => {
  return (
    <>
      <footer>
        <div className='w-full max-w-screen-xl mx-auto pt-4 px-8 pb-4'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <Link to="/" className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
               <img src={Logo} alt="Flowbite Logo" className='h-8' />
            </Link>

            <ul className='flex flex-wrap items-center mb-2 text-sm font-medium text-white sm:mb-0'>
              <li>
                  <Link to="/about" className='hover:underline me-4 md:me-6'>About</Link>
              </li>
              <li>
                  <Link to="/" className='hover:underline me-4 md:me-6'>Privacy Policy</Link>
              </li>
              <li>
                  <Link to="/" className='hover:underline me-4 md:me-6'> Licensing</Link>
              </li>
              <li>
                <Link to="/contact" className='hover:underline'>Contact</Link>
              </li>
            </ul>
          </div>
            <hr className='my-2 border-gray-600 sm:mx-auto lg:my-4' />
            <div className='sm:flex sm:items-center sm:justify-between'>
              <span className='text-sm text-white sm:text-center'>© 2025 Flowbite™ All Rights Reserved.
              </span>
              <div className='flex text-white space-x-3 mt-4 sm:justify-center sm:mt-0'>
                <FacebookIcon className='h-5 w-5'/>
                <XIcon className='h-5 w-5'/>
                <InstagramIcon className='h-5 w-5'/>
                <YouTubeIcon className='h-5 w-5'/>
              </div>
            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
