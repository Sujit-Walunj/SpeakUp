import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,active,linkto}) => {
  return (
    <Link to={linkto} >
        <div className={`text-center  shadow-lg shadow-slate-700  px-6 py-3 rounded-lg font-bold text-slate-800 hover:bg-blue-400 bg-blue-200
         transition-all duration-75
        `}>
            {children}
        </div>
    </Link>
    
  )
}

export default Button