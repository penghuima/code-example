const{ Long, Client } = require("tablestore")

var client;

exports.initialize = (context, callback) => {
  client = new Client({
    accessKeyId: process.env.ACCESS_KEY,
    accessKeySecret: process.env.ACCESS_KEY_SECRET,
    endpoint: process.env.ENDPOINT,
    instancename: process.env.INSTANCE_NAME
  });
  callback(null, "succ")
};

exports.handler = (event, context, callback) => {
  // 本示例中表格存储表名为 fc_test, 主键包含两列 region 和 id
  var params = {
    tableName: "fc_test",
    primaryKey: [{"region": "abc"}, {"id": Long.fromNumber(1)}],
    maxVersions: 1,
  };

  client.getRow(params, (err, res) => {
    if (err) {
      callback(err); 
      throw err;
    }
    callback(null, res.row)
  });
}