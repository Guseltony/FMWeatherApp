import React from 'react'

export const CurrentCard = ({title, dataDetails}) => {
  return (
    <div className='px-20 py-20 bg-neutral-800 border-neutral-600 flex gap-24 flex-col rounded-12 '>
      <p className='text-preset-6'>{ title}</p>
      <p className='text-preset-3'>{ dataDetails}</p>
    </div>
  )
}
