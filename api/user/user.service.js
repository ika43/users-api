const User = require('./user.model');

exports.getUsers = async (search = "", sort = { created: -1 }, limit, from = 0) => {

  let query;

  if (limit) {
    query = [
      {
        $project: {
          name: { $concat: ["$firstname", " ", "$lastname"] },
          email: 1,
          created: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$createdAt" } },
          address: 1,
          phone: 1
        }
      },
      {
        $match: {
          $or: [
            { 'name': { '$regex': search, '$options': 'i' } },
            { 'email': { '$regex': search, '$options': 'i' } }]
        }
      },
      {
        $sort: sort
      },
      {
        $skip: +from
      },
      {
        $limit: +limit
      }
    ]
  } else {
    query = [
      {
        $project: {
          name: { $concat: ["$firstname", " ", "$lastname"] },
          email: 1,
          created: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$createdAt" } },
        }
      },
      {
        $match: {
          $or: [
            { 'name': { '$regex': search, '$options': 'i' } },
            { 'email': { '$regex': search, '$options': 'i' } }]
        }
      },
      {
        $sort: sort
      }
    ]
  }

  const users = await User.aggregate(query);
  return users;
}