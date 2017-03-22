'use strict'

const CommonErrors = require('quantal-errors')

/**
 * Creates base model based on bookshelf-modelbase plugin see https://github.com/bsiddiqui/bookshelf-modelbase for more info
 * @param {Object} bookshelf - An initialised instance of bookshelf
 * @param {Object} [validations] - An object of Joi validations
 * @returns {*}
 * @constructor
 */
const BaseModel = (bookshelf, validations) => {
  if (!bookshelf) {
    throw new CommonErrors.IllegalArgumentError('An initialised instance of bookshelf is required')
  }
  const ModelBase = require('bookshelf-modelbase')(bookshelf)
  bookshelf.plugin(require('bookshelf-modelbase').pluggable)

  const baseModel = ModelBase.extend({
      // validation is passed to Joi.object(), so use a raw object
    validate: validations
  },
    {
      /**
       * Returns a single instance of a model
       * @param data - the data to pass fetch
       * @param options {Object} - the options to pass to model.fetch
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @returns {Promise}
       */
      findOne (data, options, bConvertResultToJson = true) {
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
       * @param {Object} options
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
       * @param {Object} options (optional)
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Collection)} Bookshelf Collection of all Models
       */
      findAll (options, bConvertResultToJson = true) {
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
       * @param {Object} data
       * @param {Object} options
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
       * @param {Object} data
       * @param {Object} options
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
       * @param {Object} selectData Data for select
       * @param {Object} updateData Data for update
       * @param {Object} [options] Options for model.save
       * @param {Boolean} [bConvertResultToJson=true] - if true, result will be converted to JSON, otherwise Bookself model instance will be returned
       * @return {Promise(bookshelf.Model)} edited Model
       */
      upsert (selectData, options, bConvertResultToJson = true) {
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
