exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ? 
                      'mongodb://localhost/b-ballapi':
                         'mongodb://localhost/b-ballapi');
exports.PORT = process.env.PORT || 8080;