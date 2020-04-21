const express = require('express')
const app = express()
app.set('secret', 'helloworld')
app.use(require('cors')()) // cors要放在路由上面
app.use(express.json())
app.use('/upload', express.static(__dirname + '/upload'))
require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(5000, () => {
  console.log('服务器运行在5000端口。')
})