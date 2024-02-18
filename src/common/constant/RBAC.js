module.exports = {
  ROLES: Object.freeze({
    SUPER_ADMIN: "SUPER_ADMIN",
    TEACHER: "TEACHER",
    STUDENT: "STUDENT",
  }),

  PERMISSIONS: Object.freeze({
    ALL: "all",
    SUPER_ADMIN: ["all"],
    ADMIN_CLUB: ["coach", "student", "club"],
    COACH: ["student", "club"],
    STUDENT: ["profile"],
  }),
};
