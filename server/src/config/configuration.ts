export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    secret: process.env.SECRET,
    secretExpire: process.env.EXPIR_IN,
})
