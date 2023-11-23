const Joi = require("joi");
const { MongoIDPattern } = require("../helpers/constans");
const createError = require("http-errors");

const roleSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان نقش صحیح نمیباشد")),
  description: Joi.string().min(3).max(100).error(createError.BadRequest("توضیحات نقش صحیح نمیباشد")),
  permissions: Joi.array().items(Joi.string().pattern(MongoIDPattern)).error(createError.BadRequest("دسترسی های ارسال شده صحیح نمیباشد")),
});
const permissionSchema = Joi.object({
  name: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان سطح دسترسی صحیح نمیباشد")),
  description: Joi.string().min(3).max(100).error(createError.BadRequest("توضیحات سطح دسترسی صحیح نمیباشد")),
});

module.exports = { roleSchema, permissionSchema };
