const express = require('express')
const projects = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/', (req, res) => {
    projects.get()
        .then(projectsArray => {
            res.status(200).json({projectsArray})
        })
        .catch(err => next(err))
})

module.exports = router