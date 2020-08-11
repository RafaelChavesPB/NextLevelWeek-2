const Database = require('./database/db')
const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')


function pageLanding(req, res) {
    return res.render('index.html')
}

async function pageStudy(req, res) {
    const filters = req.query
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render('study.html', { subjects, weekdays, filters })
    }

    const timeInMinutes = convertHoursToMinutes(filters.time)
    const query = (`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON classes.proffy_id = proffys.id
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeInMinutes}
            AND class_schedule.time_to <= ${timeInMinutes}
        )
        AND classes.subject ='${filters.subject}';
    `)
    try {
        const db = await Database
        const proffys = await db.all(query)
        return res.render('study.html', {proffys, subjects, weekdays, filters })
    } catch (error) {
        console.log(error)
    }

}

function pageGiveClasses(req, res) {
    const data = req.body
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return res.redirect('/study')
    }
    return res.render('give-classes.html', { subjects, weekdays })
}

function saveClasses(req,res){
    
}
module.exports = { pageLanding, pageStudy, pageGiveClasses, saveClasses }