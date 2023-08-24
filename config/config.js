module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  ROLES: {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    USER: "user",
  },
};
