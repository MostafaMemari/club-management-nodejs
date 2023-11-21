const Joi = require("joi");
const { PhoneNumberPatern, DatePatern } = require("../helpers/constans");

const userRegisterSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().error(new Error("یوزرنیم وارد شده معتبر نمی باشد")),
  password: Joi.string().required(),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({ "any.only": "پسورد وارد شده معتبر نمی باشد" }),
  email: Joi.string().email().error(new Error("ایمیل وارد شده معتبر نمی باشد")),
}).options({ stripUnknown: true });

const studentAndCoachSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).error(new Error("نام وارد شده معتبر نمی باشد")),
  lastName: Joi.string().min(2).max(50).error(new Error("نام خانوادگی وارد شده معتبر نمی باشد")),
  nationalID: Joi.string().length(10).error(new Error("کد ملی وارد شده معتبر نمی باشد")),
  role: Joi.string().valid("Student", "Coach").error(new Error("نقش وارد شده معتبر نمی باشد")),
  gender: Joi.string().valid("مرد", "زن").error(new Error("جنسب وارد شده اشتباه می باشد")),
  mobile: Joi.string().regex(PhoneNumberPatern).error(new Error("شماره موبایل وارد شده معتبر نمی باشد")),
  fatherName: Joi.string().min(2).max(50).error(new Error("نام پدر وارد شده معتبر نمی باشد")),
  address: Joi.string().min(3).max(150).error(new Error("آدرس وارد شده معتبر نمی باشد")),
  phone: Joi.string().min(9).max(12).error(new Error("شماره وارد شده معتبر نمی باشد")),
  imageUrl: Joi.string().error(new Error("تصویر ثبت شده معتبر نمی باشد")),
  memberShipValidity: Joi.number().min(1370).max(1450).error(new Error("اعتبار عضویت وارد شده معتبر نمی باشد")),
  registerDateIR: Joi.string().regex(DatePatern).error(new Error("تاریخ ثبت نام معتبر نمی باشد")),
  birthDayIR: Joi.string().regex(DatePatern).error(new Error("تاریخ تولد معتبر نمی باشد")),
  sportsInsuranceIR: Joi.string().regex(DatePatern).error(new Error("تاریخ بیمه ورزشی معتبر نمی باشد")),
  beltDateIR: Joi.string().regex(DatePatern).error(new Error("تاریخ اخذ کمربند معتبر نمی باشد")),

  coachID: Joi.string().hex().length(24).error(new Error("شناسه مربی معتبر نمی باشد")),
  clubID: Joi.string().hex().length(24).error(new Error("شناسه رده باشگاه معتبر نمی باشد")),
  beltID: Joi.string().hex().length(24).error(new Error("شناسه کمربند معتبر نمی باشد")),
  createdBy: Joi.string().hex().length(24).error(new Error("شناسه ثبت کننده معتبر نمی باشد")),
}).options({ stripUnknown: true });

module.exports = {
  userRegisterSchema,
  studentAndCoachSchema,
};
