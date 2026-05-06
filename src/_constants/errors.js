const errors = {
  e400: {
    status: 400,
    code: 'BAD REQUEST',
  },
  e404: {
    status: 404,
    code: 'NOT FOUND',
  },
  e500: {
    status: 500,
    code: 'INTERNAL SERVER ERROR',
  },
};

module.exports = errors;
