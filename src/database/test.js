const Database = require('./db')
const createProffy = require('./createProffy')
Database.then(async (db) => {
    proffyValue = {
        name: 'Mayk brito',
        avatar: 'https://avatars2.githubusercontent.com/u/30943380?s=460&u=12e1f405753876bc1de4baf6a6804b14897947c7&v=4',
        whatsapp: '986581592',
        bio: 'instrutor de edu'
    }
    classValue = {
        subject: 'Química',
        cost: '20',
    }
    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1160
        },
    ]
    // criando o banco  de dados:
    // await createProffy(db, { proffyValue, classValue, classScheduleValues })

    // executar todos os db.runs das class_schedules:
    // await Promise.all(insertedAllClassScheduleValues)

    // fazer buscas na database:
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)
    // fazer uma busca a partir do prrofy_id:
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)
    // fazer uma busca por horario
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule 
        WHERE class_schedule.class_id = 1 
        AND class_schedule.weekday = "1"
        AND class_schedule.time_from <= "740"
        AND class_schedule.time_to > "740";
    `)
    console.log(selectClassesSchedules)
})