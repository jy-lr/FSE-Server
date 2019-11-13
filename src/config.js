module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://vmegxwnkkopupy:5acf1a9d17ae1b0b7dad1c79c2812924c36d7bcb691caeeaef695087f77f9c12@ec2-174-129-253-45.compute-1.amazonaws.com:5432/d4ac8md1vbsppv',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
  }