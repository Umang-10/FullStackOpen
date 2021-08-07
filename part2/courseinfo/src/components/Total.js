import React from 'react'

const Total = ({parts}) => {
    const total = parts.reduce((s,p) => {
      return p.exercises + s
    }, 0)
  
   return (
      <div>
        <strong>Total No. of Exercises {total}</strong>
      </div>
    )
  }

export default Total;