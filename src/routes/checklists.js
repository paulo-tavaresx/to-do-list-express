const express = require('express')

const router = express.Router()

const Checklist = require('../models/checklist')

router.get('/', async (req, res) => {
  try {
    const checklist = await Checklist.find({})

    res.status(200).json(checklist)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/', async (req, res) => {
  const { name } = req.body

  try {
    const checklist = await Checklist.create({ name })
    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const checklist = await Checklist.findById(id)

    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const checklist = await Checklist.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    )

    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const checklist = await Checklist.findByIdAndRemove(id)

    res.status(200).json(checklist)
  } catch (error) {
    res.status(422).json(error)
  }
})

module.exports = router
