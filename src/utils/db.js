import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("beans.db");

db.transaction((tx) => {
  tx.executeSql(
    "create table if not exists beans (id integer primary key not null, time_created text, description text, picture_uri text);"
  );
});

// Get all beans
export const getAllBeans = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "Select * from beans;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// Create a new bean
export const createBean = async (time_created, description, picture_uri) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "Insert into beans (time_created, description, picture_uri) values (?, ?, ?);",
        [time_created, description, picture_uri],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
};

// Get beans by day
export const getBeansByDay = async (day) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "Select * from beans where time_created = ?;",
        [day],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// Remove a bean by ID
export const removeBeanById = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "Delete from beans where id = ?;",
        [id],
        (_, { rowsAffected }) => resolve(rowsAffected),
        (_, error) => reject(error)
      );
    });
  });
};
