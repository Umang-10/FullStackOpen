import React, {useState,useHooks, useEffect} from 'react'
import axios from 'axios'
import dirService from './services/persons'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const Name = ({person, handleDelete}) => {
  return (
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={handleDelete}>Delete</button>
      </div>
  )
}

const Filter = ({handleChange}) => {
    return(
      <div>
        Filter shown with: <input onChange={handleChange}/>
      </div>
    )
}

const PersonForm = ({handleNameChange, handleNumberChange, addName}) => {
    return(
      <div>
        <form onSubmit={addName}>
          <div>
            Name: <input onChange={handleNameChange}/>
          </div>
          <div>
            Number: <input onChange={handleNumberChange}/>
          </div>
          <div>
            <button type='submit' >Add</button>
          </div>
        </form>
      </div>  
)}

const Persons = ({personToShow , setPersons, setErrorMessage}) => {
  const handleDeletion = (id) => {
    const person = personToShow.find(n => n.id === id)
    const deletedName = {...person}
    console.log(deletedName)

    if (window.confirm('Do You Really want to delete this name?')) {
      dirService.del(id, deletedName).then(returnedName => 
        setPersons(personToShow.map(name => name.id !== id))
      )
      .catch(error => {
        setErrorMessage(
          `Information about ${person.name} has already been removed from the server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setPersons(personToShow.filter(n => n.id !== id))
      })
    }
  }

 
  return (
    <div>
      {personToShow.map(person => 
      <Name person={person} handleDelete={() => handleDeletion(person.id)}/>  
  )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personMatch, setPersonMatch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    dirService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleMatchChange = (event) => {
    setPersonMatch(event.target.value)
  }

  

  const personToShow = personMatch
    ? persons.filter(person => person.name.toLowerCase() === personMatch.toLowerCase())
    : persons

  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    if (persons.map(name=> name.name).includes(nameObject.name)) {
      window.confirm(`${nameObject.name} is already in the PhoneBook, replace the old number with new one?`)
      const name = persons.find(n => n.name === nameObject.name)
      const changedName = {...name, number: nameObject.number}

      dirService
        .update(name.id, changedName).then(returnedName => {
          setPersons(persons.map(name => name.name !== nameObject.name ? name : returnedName))
        })
        setSuccessMessage(
          `Updated ${nameObject.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 4000)
    }
    // (persons.indexOf(nameObject.name) === -1)
    else{
      dirService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(nameObject))
          setNewName('')
        })
      setSuccessMessage(
        `Added ${nameObject.name}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter handleChange={handleMatchChange}/>
      <h2>Add a New</h2>
      <PersonForm 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons 
        personToShow={personToShow} 
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}  
      />
    </div>
  )
}

export default App;
