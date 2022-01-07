const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "wptexam",
};

const record = {
  sender: "Mrunal",
  reciever: "Amol",
  msg: "Hi how are you",
};
const addRecord = async (record) => {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  const sql = `insert into message (sender,reciever,msz) values (?,?,?)`;
  await connection.queryAsync(sql, [
    record.sender,
    record.reciever,
    record.msg,
  ]);
  await connection.endAsync();
  console.log("Message record added !!");
};

const getRecord = async () => {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  const sql = `select * from message`;
  const list = await connection.queryAsync(sql, []);
  await connection.endAsync();
  console.log("List of records...");
  console.log(list);
  return list;
};
getRecord();
module.exports = { addRecord, getRecord };
