import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "progress_DB",
  })
  .promise();

export { pool };
