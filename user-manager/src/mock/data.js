
let Mock  = require('mockjs');
let Random = Mock.Random;
module.exports = function() {
  let data = { list: [] }
  // Create 1000 datas
  for (let i = 0; i < 1000; i++) {
    data.list.push( { id: i, name: Random.cname(), link:Random.url() })
  }
  return data
}
