const express = require('express')
const app = express()
const bundles = {
  "JPiiqF69y6gBwRLvcJAhympE23USkPNTxPIr84GI": "pushups.js",
  "iYHw28DmfKV2v7JYAAdrl8ViR7cSMWXDvHvK0i8E": "dev-pushups.js",
}

app.set('view engine', 'ejs')

app.get('*', function(req, res) {
  const bundle = bundles[Parse.applicationId]
  res.render('cloud/index.ejs', {bundle})
})

app.listen()
