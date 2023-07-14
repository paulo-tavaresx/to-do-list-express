const express = require('express')

const router = express.Router()

const Checklist = require('../models/checklist')

router.get('/', async (req, res) => {
  try {
    const checklists = await Checklist.find({})

    res.status(200).render('checklists/index', { checklists: checklists })
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir as Listas' })
  }
})

router.get('/new', async (req, res) => {
  try {
    const checklist = new Checklist()
    res.status(200).render('checklists/new', { checklist: checklist })
  } catch (error) {
    res
      .status(500)
      .render('pages/error', { error: 'Erro ao carregar um formulário' })
  }
})

router.post('/', async (req, res) => {
  const { name } = req.body.checklist
  const checklist = new Checklist({ name })

  try {
    await checklist.save()
    res.redirect('/checklists')
  } catch (error) {
    res
      .status(422)
      .render('checklists/new', { checklists: { ...checklist, error } })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const checklist = await Checklist.findById(id)

    res.status(200).render('checklists/show', { checklist: checklist })
  } catch (error) {
    res.status(200).render('pages/error', { error: 'Erro ao exibir as Listas' })
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
