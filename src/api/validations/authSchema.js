const Joi = require("joi");

const userRegisterSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().error(new Error("یوزرنیم وارد شده صحیح نمی باشد")),
  password: Joi.string().required(),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({ "any.only": "پسورد وارد شده معتبر نمی باشد" }),
  email: Joi.string().email().error(new Error("ایمیل وارد شده صحیح نمی باشد")),
}).options({ stripUnknown: true });

module.exports = {
  userRegisterSchema,
};
