module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  ROLES: {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    USER: "user",
  },

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};
