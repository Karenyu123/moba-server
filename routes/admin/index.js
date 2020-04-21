module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const Admin = require('../../models/admin')
  const authMiddleWire = async (req, res, next) => {
    const token = (req.headers.authorition || '').split(' ')[1]
    assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, app.get('secret'))
    assert(id, 401, '请先登录')
    req.user = await Admin.findById(id)
    assert(req.user, 401, "请先登录");
    await next()
  }
  router.post('/',async (req, res) => {
    const model = await req.model.create(req.body)
    res.send(model)
  })
  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const model = await req.model.find().setOptions(queryOptions).limit(10)
    res.send(model)
  })
  router.get('/:id', async (req, res) => {
    const model = await req.model.findById(req.params.id)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    const model = await req.model.findByIdAndDelete(req.params.id)
    res.send({
      errno: 0
    })
  })

  app.use('/admin/api/rest/:resouce', authMiddleWire, async (req, res, next) => {
    const inflection = require('inflection')
    req.model = require(`../../models/${inflection.classify(
      req.params.resouce
    )}`); 
    await next()
  }, router)
  
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../upload'
  })
  app.post('/admin/api/upload', upload.single('file'),async (req, res) => {
    const file = req.file
    file.url = `http://localhost:5000/upload/${file.filename}`
    res.send(file)
  })
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await Admin.findOne({ username }).select('+password')
    if (!user) {
      res.status(422).send({
        errno: 1,
        message: '登录失败：用户不存在'
      })
      return
    }
    const isRight = require('bcryptjs').compareSync( password , user.password)
    if (!isRight) {
      res.status(422).send({
        errno: 1,
        message: '登录失败:用户名或密码错误'
      })
      return
    }
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({
      errno: 0,
      message: '登录成功',
      token
    })
  })
}