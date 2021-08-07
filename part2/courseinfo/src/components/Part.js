import React from 'react'

const Part = ({course}) => {
    return (
      <div>
        {course.map((part) =>
          <p>{part.name} {part.exercises}</p>   
        )}
      </div>
    )
  }

export default Part;