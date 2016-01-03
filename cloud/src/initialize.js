Parse.Cloud.define('initialize', (request, {success, error}) => {
  const { user } = request
  const Record = Parse.Object.extend('Record')
  const recordQuery = new Parse.Query(Record)
  recordQuery.equalTo('user', user)
  recordQuery.include('user')
  recordQuery.find().then(records => success({
    records,
    user: records[0]
      ? records[0].attributes.user
      : user
  }), error)
})
