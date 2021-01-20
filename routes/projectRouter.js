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

router.get('/:id', (req, res) => {
    projects.get(req.params.id)
        .then(project => {
            if (!project) {
                return res.status(404).json({ message: 'project not found'})
            }
            res.status(200).json(project)
        })
        .catch(err => next(err))
})

router.get('/', (req, res) => {
    projects.getProjectActions(req.params.id)
        .then(actions => {
            if (!actions) {
                res.status(404).json({ message: 'project actions not found'})
            }
            res.status(200).json(actions)
        })
        .catch(err => next(err))
})

router.post('/', (req, res) => {
    projects.insert(req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => next(err))
})

router.put('/:id', (req, res) => {
    let id = req.params.id
    let project = req.body

    projects.update(id, project)
        .then(project => {
            if (project === null) {
                res.status(404).json({ message: 'project not found'})
            }
            res.status(200).json(project)
        })
        .catch(err => next(err))
})

router.delete('/:id', (req, res) => {
    projects.remove(req.params.id)
        .then(deleted => {
            if (deleted === 0) {
                res.status(404).json({ message: 'project not found'})
            }
            res.status(200).json({ message: 'project deleted'})
        })
        .catch(err => next(err))
})

module.exports = router