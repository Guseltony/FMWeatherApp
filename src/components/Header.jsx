import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between'>
      {/* logo */}
      <div>
        <img src='/src/assets/images/logo.svg' alt="Weather Now" className='w-[137.9px] md:w-full'/>
      </div>

      {/* units */}
      <div className='px-10 py-8 md:px-16 md:py-12 bg-neutral-800 rounded-8'>
        <div className='flex items-center gap-6 md:gap-10'>
          <img src="/src/assets/images/icon-units.svg" alt="" />
          <p className='text-preset-7 font-medium text-neutral-0 capitalize'>units</p>
          <img src='/src/assets/images/icon-dropdown.svg' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header