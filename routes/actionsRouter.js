const express = require('express')
const actions = require('../data/helpers/actionModel')
const router = express.Router()

router.get('/', (req, res) => {
    actions.get()
        .then(actionsArray => {
            res.status(200).json(actionsArray)
        })
        .catch(err => next(err))
})

router.post('/', (req, res) => {
    let body = req.body
    actions.insert(body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => next(err))
})

router.put('/:id', (req, res) => {
    let id = req.params.id
    let body = req.body

    actions.update(id, body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => next(err))
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    actions.remove(id)
        .then(deleted => {
            if (deleted === 0) {
                res.status(404).json({ message: 'action not found'})
            }
            res.status(200).json({ message: 'action deleted'})
        })
        .catch(err => next(err))
})

module.exports = router