import React from 'react'
import { NavLink } from 'react-router-dom'

function Pnf() {
  return (
    <div className="container">
        <div className="row">
            <div className='col-md-12 text-center'>
                <h3 className='display-3 text-danger'>Page Not Found</h3>
                
                <NavLink to={`/`} className="btn btn-link">Return Home</NavLink>
            </div>
        </div>
    </div>
  )
}
//return link to home

export default Pnf