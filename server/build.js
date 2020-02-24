require('./config');

const user = global.USER?global.USER:'xiaoming';
const pwd = global.PWD?global.PWD:'xm123';
const db = global.DB?global.DB:'xiaomingdb';

global.DB_URL_BUILD = `mongodb://${user}:${pwd}@127.0.0.1:27017/${db}`;

process.env.NODE_ENV = 'production';

require('./index');
