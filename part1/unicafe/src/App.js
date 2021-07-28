import React, {useState} from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if ((good + neutral + bad) === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <h4>No Feedback Given</h4>
      </div>
    )
  } else {
  return (
    <div>
      <h1>Statistics</h1>
      <Statistic text="Good " value={good}/>
      <Statistic text="Neutral " value={neutral}/>
      <Statistic text="Bad " value={bad}/>
      <Statistic text="All " value={good + neutral + bad}/>
      <Statistic text="Average " value={((good + neutral + bad)/3).toFixed(1)}/>
      <Statistic text="Positive(%)" value={(((good)/(good+neutral+bad))*100).toFixed(1)}/>
    </div>
  )}
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text={"Good"}/>
      <Button handleClick={handleNeutral} text={"Neutral"}/>
      <Button handleClick={handleBad} text={"Bad"}/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
