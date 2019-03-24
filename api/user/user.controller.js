const logger = require('winston');
const { getUsers } = require('./user.service');

exports.list = async (req, res) => {

  // get data from query string
  const { limit, search, order, from } = req.query;
  let { sort } = req.query;

  // define regex
  const regexSearch = new RegExp(/^[\w \d@!#$%&'*+\/=?^_`{|}~.-]+$/);
  const regexLimit = new RegExp(/^[1-9][0-9]*$/);
  const regexFrom = new RegExp(/^(0|[1-9]\d*)$/);

  //set default order param
  let orderParam = 1;


  // validate search param if exist
  if (search && !regexSearch.test(search)) return res.status(400).send({ 'error': `${search} is invalid search parameter!` })

  // validate order param if exist
  if (order && order.match(/desc/i)) {
    orderParam = -1
  } else if (order && !order.match(/asc/i)) {
    return res.status(400).send({ 'error': `${order} is invalid order parameter!` })
  }

  //validate from param
  if (from && !regexFrom.test(from)) return res.stats(400).send(`${from} is invalid from parameter!`);

  //validate limit param
  if (limit && !regexLimit.test(limit)) return res.stats(400).send(`${limit} is invalid limit parameter!`);


  // validate sort column name if exist
  if (sort && sort.match(/name/i)) {
    sort = { 'name': orderParam }
  } else if (sort && sort.match(/email/i)) {
    sort = { 'email': orderParam }
  } else if (sort) {
    return res.status(400).send({ 'error': `${sort} is invalid column parameter for sorting!` })
  }

  try {
    const users = await getUsers(search, sort, limit, from);
    return res.json({ users })
  } catch (e) {
    logger.error(e)
    return res.stats(500).send({ 'error': 'Internal server error!' })
  }
}