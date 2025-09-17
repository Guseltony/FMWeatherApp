import React from 'react'

export const Search = () => {
  return (
    <div className='flex items-center gap-12 md:gap-16 w-[343px] md:w-[720px] lg:w-[656px] h-[124px] md:h-[56px] flex-col md:flex-row'>
      <div className='px-24 py-16 flex items-center gap-16 bg-neutral-800 rounded-12 w-[100%] h-[100%]'>
        <img src="/src/assets/images/icon-search.svg" alt="" />
        <input type="text" name="" id="" placeholder='Search for a place...' className='text-preset-5b font-medium border-0 outline-0' />
      </div>
      <button type="submit" className='px-24 py-16 bg-blue-500 text-preset-5 font-medium rounded-12 cursor-pointer w-[100%] md:w-fit'>Search</button>
    </div>
  )
}
