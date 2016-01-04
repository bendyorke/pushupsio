const express = require('express')
const app = express()
const environments = {
  "JPiiqF69y6gBwRLvcJAhympE23USkPNTxPIr84GI": "prod",
  "iYHw28DmfKV2v7JYAAdrl8ViR7cSMWXDvHvK0i8E": "dev",
}

app.set('view engine', 'ejs')

app.get('*', function(req, res) {
  const env = environments[Parse.applicationId]
  res.render('cloud/index.ejs', {env})
})

app.listen()
