import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Sana121",
  database: "pesuclubs", //test2
});

db.connect((err) => {
    if (err) {
      console.error("Error connecting to database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + db.threadId);
  });

 