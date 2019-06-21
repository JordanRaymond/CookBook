module.exports = {
    prod: {
        database: 'postgres',
        username: 'just4lol',
        password: 'JordPostgre1011',
        host: 'jordanpostgre.c8vllrkg6hej.us-east-2.rds.amazonaws.com',
        port: 5432,
        dialect: 'postgres'
    },
    dev: {
        database: 'cookBook',
        username: 'postgres',
        password: '1234',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    },
}