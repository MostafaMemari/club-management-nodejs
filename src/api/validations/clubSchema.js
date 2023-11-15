const Joi = require("joi");

const clubSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().error(new Error("نام وارد شده صحیح نمی باشد")),
  gender: Joi.string().valid("آقایان", "بانوان").required().error(new Error("جنسیت وارد شده صحیح نمی باشد")),
  address: Joi.string().min(3).max(100).error(new Error("آدرس وارد شده صحیح نمی باشد")),
  phone: Joi.string().min(9).max(12).error(new Error("شماره وارد شده صحیح نمی باشد")),
  sportID: Joi.string().hex().length(24).error(new Error("رشته ورزشی مورد نظر یافت نشد")),
}).options({ stripUnknown: true });

const sportSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().error(new Error("رشته ورزش وارد شده معتبر نمی باشد")),
  type: Joi.string().min(2).max(50).error(new Error("نوع رشته ورزشی وارد شده معتبر نمی باشد")),
  description: Joi.string().min(10).max(100).error(new Error("توضیحات وارد شده معتبر نمی باشد")),
}).options({ stripUnknown: true });

const ageGroupSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().error(new Error("رده سنی وارد شده معتبر نمی باشد")),
  description: Joi.string().min(10).max(100).error(new Error("توضیحات وارد شده معتبر نمی باشد")),
  fromDateIR: Joi.string().required().error(new Error("تاریخ شروع رده سنی معتبر نمی باشد")),
  toDateIR: Joi.string().required().error(new Error("تاریخ پایان رده سنی معتبر نمی باشد")),
}).options({ stripUnknown: true });

module.exports = {
  clubSchema,
  sportSchema,
  ageGroupSchema,
};

// .regex(/^(098|0098|98|\+98|0)?9(0[0-5]|[1 3]\d|2[0-3]|9[0-9]|41)\d{7}$/)
