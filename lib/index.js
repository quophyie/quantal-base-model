'use strict'

const CommonErrors = require('quantal-errors')

/**
 * Creates base model based on bookshelf-modelbase plugin see https://github.com/bsiddiqui/bookshelf-modelbase for more info
 * @param {Object} bookshelf - An initialised instance of bookshelf
 * @param {Object} params - The params that are passed to bookshelf
 * @param {Object} [validations] - An object of Joi validations
 * @returns {*}
 * @constructor
 */
const BaseModel = (bookshelf, params, validations) => {
  if (!bookshelf) {
    throw new CommonErrors.IllegalArgumentError('An initialised instance of bookshelf is required')
  }
  const ModelBase = require('bookshelf-modelbase')(bookshelf, params)
  bookshelf.plugin(require('bookshelf-modelbase').pluggable)

  const baseModel = ModelBase.extend({
      // validation is passed to Joi.object(), so use a raw object
    validate: validations
  },
    {
      /**
       * Returns a single instance of a model
       * @param filter - the filter to pass fetch
       * @param options {Object} - the options to pass to model.fetch
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @returns {Promise}
       */
      findOne (filter, options, bConvertResultToJson = true) {
        return bookshelf.Model.prototype.constructor.findOne.apply(this, arguments)
          .then(model => {
            if (!bConvertResultToJson) return model
            if (!model) return null
            return model.toJSON()
          })
          .catch(bookshelf.NotFoundError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.EmptyError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(err => Promise.reject(CommonErrors.utils.bookshelfToApp(err)))
      },

      /**
       * Naive add - create and save a model based on data
       * @param {Object} data
       * @param {Object} options (optional)
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Model)} single Model
       */
      create (data, options, bConvertResultToJson = true) {
        return bookshelf.Model.prototype.constructor.create.apply(this, arguments)
          .then(model => {
            if (!bConvertResultToJson) return model
            if (!model) return null
            return model.toJSON()
          })
          .catch(bookshelf.NotFoundError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.EmptyError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(err => Promise.reject(CommonErrors.utils.bookshelfToApp(err)))
      },

      /**
       * Naive destroy
       * @param {Object} options - The bookshelf destroy options
       * @param options.id {Number|String} - The id of the model to be deleted
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Model)} empty Model
       */
      destroy (options, bConvertResultToJson = true) {
        return bookshelf.Model.prototype.constructor.destroy.apply(this, arguments)
          .then(model => {
            if (!bConvertResultToJson) return model
            if (!model) return null
            return model.toJSON()
          })
          .catch(bookshelf.NotFoundError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.NoRowsDeletedError, () => Promise.reject(new CommonErrors.NoRowsDeletedError('NoRowsDeletedError')))
          .catch(err => Promise.reject(CommonErrors.utils.bookshelfToApp(err)))
      },

      /**
       * Naive findAll - fetches all data for `this`
       * @param {Object} filter - The filter/ query that will be applied to the find all query
       * @param {Object} [options] - The bookshelf destroy options
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Collection)} Bookshelf Collection of all Models
       */
      findAll (filter, options, bConvertResultToJson = true) {
        return bookshelf.Model.prototype.constructor.findAll.apply(this, arguments)
          .then(model => {
            if (!bConvertResultToJson) return model
            if (!model) return null
            return model.toJSON()
          })
          .catch(bookshelf.NotFoundError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.EmptyError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(err => Promise.reject(CommonErrors.utils.bookshelfToApp(err)))
      },

      /**
       * Naive findWhere - fetches all data for `this`. This method is an alias for findAll
       * @param {Object} filter - The filter/ query that will be applied to the find all query
       * @param {Object} options (optional)
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Collection)} Bookshelf Collection of all Models
       */
      findWhere (filter, options, bConvertResultToJson = true) {
        return this.findAll(filter, options, bConvertResultToJson)
      },

      /**
       * Find a model based on it's ID
       * @param {String | Number} id The model's ID
       * @param {Object} [options] Options used of model.fetch
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Model)}
       */
      findById (id, options, bConvertResultToJson = true) {
        return bookshelf.Model.prototype.constructor.findById.apply(this, arguments)
          .then(model => {
            if (!bConvertResultToJson) return model
            if (!model) return null
            return model.toJSON()
          })
          .catch(bookshelf.NotFoundError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.EmptyError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(err => Promise.reject(CommonErrors.utils.bookshelfToApp(err)))
      },

      /**
       * Find or create - try and find the model, create one if not found
       * @param {Object} data - The data to use to find a model. If The model does not exist, this data will be persisted
       * @param {Object} options - The options thar are passed to fetch and create
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Model)} single Model
       */
      findOrCreate (data, options, bConvertResultToJson = true) {
        return bookshelf.Model.prototype.constructor.findOrCreate.apply(this, arguments)
          .then(model => {
            if (!bConvertResultToJson) return model
            if (!model) return null
            return model.toJSON()
          })
          .catch(bookshelf.NotFoundError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.EmptyError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(err => Promise.reject(CommonErrors.utils.bookshelfToApp(err)))
      },

      /**
       * Naive update - update a model based on data
       * @param {Object} data - The data to be used to update a model
       * @param {Object} options - The options to pass to save
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Model)} edited Model
       */
      update (data, options, bConvertResultToJson = true) {
        return bookshelf.Model.prototype.constructor.update.apply(this, arguments)
          .then(model => {
            if (!bConvertResultToJson) return model
            if (!model) return null
            return model.toJSON()
          })
          .catch(bookshelf.NotFoundError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.EmptyError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.NoRowsUpdatedError, () => Promise.reject(new CommonErrors.NoRowsUpdatedError('NoRowsUpdatedError')))
          .catch(err => Promise.reject(CommonErrors.utils.bookshelfToApp(err)))
      },

      /**
       * Upsert - select a model based on data and update if found, insert if not found
       * @param {Object} selectData - Data for select
       * @param {Object} updateData -  Data for update
       * @param {Object} [options] options - for model.save
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Model)} edited Model
       */
      upsert (selectData, updateData, options, bConvertResultToJson = true) {
        return bookshelf.Model.prototype.constructor.upsert.apply(this, arguments)
          .then(model => {
            if (!bConvertResultToJson) return model
            if (!model) return null
            return model.toJSON()
          })
          .catch(bookshelf.NotFoundError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.EmptyError, () => Promise.reject(new CommonErrors.NotFoundError('NotFoundError')))
          .catch(bookshelf.NoRowsUpdatedError, () => Promise.reject(new CommonErrors.NoRowsUpdatedError('NoRowsUpdatedError')))
          .catch(err => Promise.reject(CommonErrors.utils.bookshelfToApp(err)))
      }
    })
  return baseModel
}

module.exports = BaseModel
