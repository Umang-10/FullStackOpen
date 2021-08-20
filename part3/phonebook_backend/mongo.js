const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Enter Password!!')
    process.exit()
}

const password = process.argv[2]

const url = `mongodb+srv://umangkaushik:${password}@cluster0.tmtsa.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length < 4) {
    console.log('PhoneBook: ')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}else{
    person.save().then(result => {
        console.log(`Added ${process.argv[3]} ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}




