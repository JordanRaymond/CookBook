// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
module.exports = {
    secret: 'aFreakingSecret',

    development: {
        username: "postgres",
        password: 1234,
        database: "cookBook",
        host: "127.0.0.1",
        port: 5432,
        dialect: "postgres"
      },
      test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "postgres"
      },
      production: {
        username: "just4lol",
        password: "JordPostgre1011",
        database: "postgres",
        host: "jordanpostgre.c8vllrkg6hej.us-east-2.rds.amazonaws.com",
        dialect: "postgres"
    }
}