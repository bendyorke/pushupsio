const isRelation = key => {
  return /^_[A-Z]/.test(key)
}

/**
 * @param {Parse.Model} Model
 * @param Object        params
 * @return {Parse.Object}
 *
 * findOrCreate(Record, { day: Date.Object, _User: id })
 * => Parse.Object(id, attributes)
 */
const findOrCreate = (Model, params) => {
  const query = new Parse.Query(Model)

  /**
   * If a relation is passed in, handle it accordingly.
   * A relation is any key starting with _[A-Z]
   */
  const attributes = Object.keys(params).reduce((memo, key) => {
    if (isRelation(key)) {
      let modelName = key.slice(1)
      let fieldName = modelName.toLowerCase()
      let Relation = Parse.Object.extend(modelName)
      let relation = new Relation()
      relation.id = params[key]

      return {
        ...memo,
        [fieldName]: relation,
      }
    } else {
      return {
        ...memo,
        [key]: params[key],
      }
    }
  }, {})

  Object.keys(attributes).forEach(key => {
    query.equalTo(key, attributes[key])
  })

  const promise = new Parse.Promise()

  query.first()
    .then(data => {
      if (data) return promise.resolve(data)

      const instance = new Model()
      instance.set(attributes)
      instance.save().then(
        data => promise.resolve(data),
        error => promise.reject(error)
      )
    }).fail(error => promise.reject(error))

  return promise
}

/**
 * Parse.Cloud.run('findOrCreate', { model: 'Record',
 *   $where: { day: Date.Object, _User: id, count: 0 },
 * })
 */
Parse.Cloud.define('findOrCreate', (request, response) => {
  const { model: modelName, $where } = request.params

  const Model = Parse.Object.extend(modelName)

  findOrCreate(Model, where).then(response.success, response.error)
})

/**
 * Parse.Cloud.run('updateOrCreate', { model: 'Record',
 *   $where: { day: Date.Object, _User: id },
 *   $update: { count: 100000000000000000000000 },
 * })
 */
Parse.Cloud.define('updateOrCreate', (request, response) => {
  const { model: modelName, $where, $update } = request.params

  const Model = Parse.Object.extend(modelName)

  findOrCreate(Model, $where)
    .then(instance => {
      instance.set($update)
      instance.save(response)
    }).fail(response.error)
})
