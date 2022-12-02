module.exports = {
  apps: [{
    name: "index",
    script: "./index.js",
    env: {
      MONGODB_URL: "mongodb+srv://Test:test123@certwi.p8uizxk.mongodb.net/?retryWrites=true&w=majority",
      JWT_SECRET: "242bd13d9e9800732cde0873e60f847b1bf0edf1324c2915a217f2f75ba2b0f5e9a105c4a1cfe6b9c002124c251af038ff7a95523d654cb2d363abd63f83ca1f",
      JWT_LIFETIME: "1d",
      AUTH_EMAIL: "splashtechreview@gmail.com",
      AUTH_PASS: "ntwlwfneklkhzone"
    },
  }]
}