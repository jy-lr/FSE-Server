module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://fse_admin@localhost/fse_Server',
    TEST_DB_URL: 'postgresql://fse_admin@localhost/fse_Test',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
}
