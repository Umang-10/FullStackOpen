import React from 'react'
import Part from './Part'

const Content = (props) => {

    return (
      <div>
        <Part course={props.course}/>
      </div>
    )
  }

export default Content;