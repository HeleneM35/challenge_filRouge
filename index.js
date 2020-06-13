const express = require('express')
const app = express()
const connection = require('./conf')
const port = 3000


app.use(express.json())
app.use(express.urlencoded({
        extended: true
}));

// route 1
app.get('/painters', (req, res) => {
    connection.query(`SELECT * FROM painter`, (err, results) => {
        if (err) {
            res.send(`Erreur durant l'affichage des peintres`)
        } else {
            res.send(results)
        }
    })
})

//route 2
app.get('/painters/:lastname', (req, res) => {
    const painterLastname = req.params.lastname
    connection.query(`SELECT lastname, firstname FROM painter WHERE lastname= ?`, painterLastname, (err, results) => {
        if (err) {
            res.send(`Erreur durant l'affichage du peintre`)
        } else {
            res.send(results)
        }
    })
});


// route 3
app.get('/painters/namesbyk', (req, res) => {
    connection.query(`SELECT * FROM painter WHERE lastname LIKE 'K%'`, (err, results) => {
        if (err) {
            res.send(`Erreur durant l'affichage des peintres dont le nom commence par K`)
        } else {
            res.send(results)
        }
    })
})

// route 4
app.get('/painters/gustav', (req, res) => {
    connection.query(`SELECT * FROM painter WHERE firstname LIKE '%gustav%'`, (err, results) => {
        if (err) {
            res.send(`Erreur durant l'affichage des peintres dont le prénom contient "gustav"`)
        } else {
            res.send(results)
        }
    })
})

// route 5
app.get('/painters/birthdate', (req, res) => {
    connection.query(`SELECT * FROM painter WHERE birth_date >= 1840`, (err, results) => {
        if (err) {
            res.send(`Erreur durant l'affichage des peintres nés après 1840`)
        } else {
            res.send(results)
        }
    })
})

// route 6
app.get('/painters/birthascendant', (req, res) => {
    connection.query(`SELECT * FROM painter ORDER BY birth_date ASC`, (err, results) => {
        if (err) {
            res.send(`Erreur durant l'affichage des peintres classés par année de naissance`)
        } else {
            res.send(results)
        }
    })
})

// route 7
app.get('/painters/deathdescendant', (req, res) => {
    connection.query(`SELECT * FROM painter ORDER BY death_date DESC`, (err, results) => {
        if (err) {
            res.send(`Erreur durant l'affichage des peintres classés par année de décès de la plus récente à la plus ancienne`)
        } else {
            res.send(results)
        }
    })
})

//route 8
app.post('/painters',(req,res) =>{
    const painterData = req.body
    connection.query(`INSERT INTO painter SET ?`, painterData, (err,results) =>{
        if (err) {
            res.send(`erreur durant l'ajout du peintre`)
        } else {
            res.send(`nouveau peintre ajouté avec succès`)
        }
    })
})

// route 9
app.put('/painters/:lastname', (req, res) => {
    const painterData = req.body
    const painterName = req.params.lastname
    connection.query(`UPDATE painter SET ? WHERE lastname=?`, [painterData, painterName], (err, results) => {
        if (err) {
            res.send('erreur lors de la modification des données')
        } else {
            res.send('modification effectuée')
        }
    })
})

// route 10
app.put('/painters/:lastname', (req, res) => {
    const painterData = req.body
    const painterName = req.params.lastname
    connection.query(`UPDATE painter SET ? WHERE isFrench=?`, [painterData, painterName], (err, results) => {
        if (err) {
            res.send('erreur lors de la modification des données')
        } else {
            res.send('modification effectuée')
        }
    })
})

// route 11
app.delete('/painters/:lastname', (req, res) => {
    const painterName = req.params.lastname
    connection.query(`DELETE FROM painter WHERE lastname=?`, painterName, (err, results) => {
        if (err) {
            res.send('erreur lors de la modification des données')
        } else {
            res.send('modification effectuée')
        }
    })
})

// route 12
app.delete('/painters/', (req, res) => {
    connection.query(`DELETE FROM painter WHERE isFrench=0`, (err, results) => {
        if (err) {
            res.send('erreur lors de la modification des données')
        } else {
            res.send('modification effectuée')
        }
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`evertything is alright on port ${port}`)
    }
})