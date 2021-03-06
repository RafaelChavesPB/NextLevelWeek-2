const subjects = [
    "Artes", 
    "Biologia", 
    "Ciências", 
    "Educação física", 
    "Física", 
    "Geografia", 
    "História", 
    "Matématica", 
    "Português", 
    "Química"
]

const weekdays = [
    "Domingo", 
    "Segunda", 
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta", 
    "Sábado"
]


function getSubject(subjectNumber) {
    const position = + subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(time){
    const [hours,minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}
module.exports = {subjects, weekdays, getSubject, convertHoursToMinutes}