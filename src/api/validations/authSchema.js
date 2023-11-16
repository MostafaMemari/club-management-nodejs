const Joi = require("joi");

const userRegisterSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().error(new Error("یوزرنیم وارد شده صحیح نمی باشد")),
  password: Joi.string().required(),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({ "any.only": "پسورد وارد شده معتبر نمی باشد" }),
  email: Joi.string().email().error(new Error("ایمیل وارد شده صحیح نمی باشد")),
}).options({ stripUnknown: true });

const studentRegisterSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).error(new Error("نام وارد شده صحیح نمی باشد")),
  lastName: Joi.string().min(2).max(50).error(new Error("نام خانوادگی وارد شده صحیح نمی باشد")),
  nationalID: Joi.string().length(10).error(new Error("کد ملی وارد شده صحیح نمی باشد")),
  role: Joi.string().valid("Student", "Coach").error(new Error("نقش وارد شده صحیح نمی باشد")),
  gender: Joi.string().valid("مرد", "زن").error(new Error("جنسب وارد شده اشتباه می باشد")),
  mobile: Joi.string()
    .regex(/^(098|0098|98|\+98|0)?9(0[0-5]|[1 3]\d|2[0-3]|9[0-9]|41)\d{7}$/)
    .error(new Error("شماره موبایل وارد شده معتبر نمی باشد")),
  fatherName: Joi.string().min(2).max(50).error(new Error("نام پدر وارد شده صحیح نمی باشد")),
  address: Joi.string().min(3).max(150).error(new Error("آدرس وارد شده صحیح نمی باشد")),
  phone: Joi.string().min(9).max(12).error(new Error("شماره وارد شده صحیح نمی باشد")),
  imageUrl: Joi.string().error(new Error("تصویر ثبت شده معتبر نمی باشد")),
  memberShipValidity: Joi.number().min(1370).max(1450).error(new Error("اعتبار عضویت وارد شده صحیح نمی باشد")),
  registerDateIR: Joi.string()
    .regex(/^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/)
    .error(new Error("تاریخ ثبت نام معتبر نمی باشد")),
  birthDayIR: Joi.string()
    .regex(/^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/)
    .error(new Error("تاریخ تولد معتبر نمی باشد")),

  coachID: Joi.string().hex().length(24).error(new Error("شناسه مربی معتبر نمی باشد")),
  clubID: Joi.string().hex().length(24).error(new Error("شناسه رده باشگاه معتبر نمی باشد")),
  beltID: Joi.string().hex().length(24).error(new Error("شناسه کمربند معتبر نمی باشد")),
  createdBy: Joi.string().hex().length(24).error(new Error("شناسه ثبت کننده معتبر نمی باشد")),
}).options({ stripUnknown: true });

module.exports = {
  userRegisterSchema,
  studentRegisterSchema,
};
