import { ResultSetHeader } from "mysql2";
import { pool } from "../config/db";
import { User } from "../interface/User";

// create a user table if not present already
export const createUserTable = async () => {
  const query: string = `
            CREATE TABLE IF NOT EXISTS user (
            id int AUTO_INCREMENT PRIMARY KEY, 
            firstName varchar(255) NOT NULL,
            lastName varchar(255) NOT NULL,
            email varchar(255) UNIQUE,
            password CHAR(64) NOT NULL
        );`;

  await pool.execute(query);
};

// Get all users
export const getUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM user;");
  return rows;
};

// Insert a user
export const addUser = async ({
  firstName,
  lastName,
  email,
  password,
}: User) => {
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO user (firstName,lastName,email,password) values(?,?,?,?)",
      [firstName, lastName, email, password]
    );
    // Here, `result` is of type ResultSetHeader, which has properties like `affectedRows`
    if (result && result.affectedRows === 1) {
      return { success: true, userId: result.insertId };
    } else {
      return { success: false, message: "Failed to add user" };
    }
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      return { success: false, message: "Email already exists" };
    }
    return { success: false, message: "An error occurred", error };
  }
};

// Find a user
