module.exports = {
    port: process.env.PORT || 8000,
    db: {
        uri: process.env.MONGO_DB_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'Project Secret',
        expiry: '30d',
        algorithm: 'HS256',
    },
};
