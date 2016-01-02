Parse.Cloud.beforeSave('Record', (request, {success, error}) => {
  const record = request.object
  if (record && record.id) return success()

  const query = new Parse.Query('Record')
  query.equalTo('user', record.get('user'))
  query.equalTo('date', record.get('date'))
  query.first({
    success: _record => {
      if (_record) {
        /**
         * You can't actually modify the ID of the request in a
         * beforeSave handler.  You also can return anything besides
         * an error unless you return an error.  So for now,
         * the only solution is to  return response.error('success')...
         *
         *
         *
         * Seriously
         */
        dirtySuccess = () => error('success')
        _record.set('count', record.get('count'))
        _record.save({success: dirtySuccess, error})
      } else {
        return success()
      }
    },
    error: error
  })
})
