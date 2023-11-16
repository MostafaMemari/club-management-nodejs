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
  fromDateIR: Joi.string()
    .regex(/^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/)
    .required()
    .error(new Error("تاریخ شروع رده سنی معتبر نمی باشد")),
  toDateIR: Joi.string()
    .regex(/^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/)
    .required()
    .error(new Error("تاریخ پایان رده سنی معتبر نمی باشد")),
}).options({ stripUnknown: true });

const ageGroupUpdateSchema = Joi.object({
  id: Joi.string().hex().length(24).error(new Error("شناسه وارد شده معتبر نمی باشد")),
  name: Joi.string().min(2).max(50).error(new Error("رده سنی وارد شده معتبر نمی باشد")),
  fromDateIR: Joi.string()
    .regex(/^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/)
    .error(new Error("تاریخ شروع رده سنی معتبر نمی باشد")),
  toDateIR: Joi.string()
    .regex(/^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/)
    .error(new Error("تاریخ پایان رده سنی معتبر نمی باشد")),
}).options({ stripUnknown: true });

const beltSchema = Joi.object({
  name: Joi.string().required().min(2).max(15).error(new Error("نام کمربند وارد شده معتبر نمی باشد")),
  duration: Joi.number().required().error(new Error("مدت زمان وارد شده معتبر نمی باشد")),
}).options({ stripUnknown: true });

const beltExamSchema = Joi.object({
  name: Joi.string().required().min(2).max(40).error(new Error("آزمون وارد شده معتبر نمی باشد")),
  description: Joi.string().min(10).max(100).error(new Error("توضیحات وارد شده معتبر نمی باشد")),
  eventPlace: Joi.string().min(2).max(50).error(new Error("محل برگزاری معتبر نمی باشد")),
  gender: Joi.string().valid("آقایان", "بانوان").required().error(new Error("جنسیت وارد شده صحیح نمی باشد")),
  // beltID: Joi.string().hex().length(24).error(new Error("شناسه وارد شده صحیح نمی باشد")),
  eventDateIR: Joi.string().required().error(new Error("تاریخ آزمون معتبر نمی باشد")),
  registerDateIR: Joi.string().required().error(new Error("تاریخ ثبت نام آزمون معتبر نمی باشد")),
}).options({ stripUnknown: true });

module.exports = {
  clubSchema,
  sportSchema,
  ageGroupSchema,
  ageGroupUpdateSchema,
  beltSchema,
  beltExamSchema,
};

// .regex(/^(098|0098|98|\+98|0)?9(0[0-5]|[1 3]\d|2[0-3]|9[0-9]|41)\d{7}$/)