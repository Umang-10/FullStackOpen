import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
    return (
      <div>
        <Header course={course[0]}/>
        <Content course={course[0].parts}/>
        <Total parts={course[0].parts}/>
        <Header course={course[1]}/>
        <Content course={course[1].parts}/>
        <Total parts={course[1].parts}/>
      </div>
    )
}

export default Course;