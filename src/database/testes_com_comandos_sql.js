const Database = require('./db.js')
const createProffy = require('./createProffy.js')


Database.then(async (db) => {
    // Inserir dados
    
    proffyValue =  {
        name: "Lucas da Hora Ramos", 
        avatar: "https://avatars2.githubusercontent.com/u/66744211?s=460u=cbf8587883b51ed49dc80f957894a916fa2b1900&v=4",
        whatsapp: "00000000000",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }
    
    classValue = {
        subject: "Química",
        cost: "20",
        // proffy_id vai vir pelo DB
    }

    classScheduleValues = [
        // class_id vai vir pelo DB
        {
            weekday: 0,
            time_from: 720, 
            time_to: 1220
        },
        {
            weekday: 3,
            time_from: 720, 
            time_to: 1220
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // consultar as classes de um determinado professor e trazer os dados do mesmo
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffy_id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o horário do time_to (18h) precisa ser maior que o horário solicitado
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "820"
        AND class_schedule.time_to > "820";
    `)

    // console.log(selectClassesSchedules)
})