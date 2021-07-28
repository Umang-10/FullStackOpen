import React, {useState} from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const handleClick = () => setSelected(parseInt(Math.random()*anecdotes.length))

  const [selected, setSelected] = useState(0)
  
  const [votes, setVotes] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
  

  const handleVotes = () => {
    let votes_copy = [...votes]
    votes_copy[selected] += 1;
    setVotes(votes_copy)
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <h3>{anecdotes[selected]}</h3><br/>
      <Button handleClick={handleVotes} text='Vote'/>
      <Button handleClick={handleClick} text="Next Anecdote"/>
      <h1>Anecdote with most votes</h1>
      <h3>{anecdotes[votes.indexOf(Math.max(...votes))]}</h3>
    </div>
  );
}

export default App;
