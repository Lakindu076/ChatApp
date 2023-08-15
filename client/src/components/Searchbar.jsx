import React from 'react'
import {FaSearch} from 'react-icons/fa'

const Searchbar = (props) => {
  if(props?.hidden)return null
  return (
    <div className={`${props?.classes} flex justify-between items-center bg-myGray3 px-3 py-2 rounded-lg`}>
        <input {...props} className="bg-myGray3 pl-2 no-outline" />
        <div>
        <FaSearch className="text-gray-500" />
        </div>
    </div>
  )
}

export default Searchbar