module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DATABASE_URL || 'postgresql://fse_admin@localhost/fse_Server',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
  }