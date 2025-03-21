import React from 'react'
import { Link } from 'react-router-dom'
export const GroupCard = ({name,description,path}) => {

  const handleClick = ()=>{

  }


  return (

    <div>
        <Link to={path}>

            <div className='
            max-w-[280px] 
            max-h-[280px]
            min-w-[280px] 
            min-h-[280px]
            m-5
            p-5
            rounded-lg
            bg-blue-300 relative'>
              
                <p className='text-4xl font-serif font-semibold mb-2'>
                    {name}</p>
                <div className='bg-slate-500 h-[1px]'>

                </div>
                <p className='text-slate-800 mt-2'>
                    {description}
                </p>
                <button className= ' rounded-lg bg-slate-800 text-white p-2 mt-5 absolute bottom-3 left-28'
                >
                  <Link to={path+'/group-details'}>
                  Details
                  </Link>

                  
                </button>

            </div>

        </Link>

    </div>
  )
}
