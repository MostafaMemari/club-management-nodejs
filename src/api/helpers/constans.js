module.exports = {
  MongoIDPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  DatePatern: /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/,
  PhoneNumberPatern: /^(098|0098|98|\+98|0)?9(0[0-5]|[1 3]\d|2[0-3]|9[0-9]|41)\d{7}$/,
  EXPIRES_IN: new Date().getTime() + 120000,
  ROLES: Object.freeze({
    SUPER_ADMIN: "SUPER_ADMIN",
    TEACHER: "TEACHER",
    STUDENT: "STUDENT",
  }),
  PERMISSIONS: Object.freeze({
    ALL: "all",
    SUPER_ADMIN: ["all"],
    ADMIN_CLUB: ["coach", "student", "club"],
    TEACHER: ["course", "blog"],
    STUDENT: ["profile"],
  }),
};
