const sql = require('mssql');

// Конфигурация подключения к базе данных
const config = {
  user: 'trpk',
  password: '12344321',
  server: 'localhost',
  database: 'Book_Store',
  trustServerCertificate: true
};

// Функция для получения списка изданий по названию
async function getPublicationsByTitle(title) {
  try {
    // Установка соединения с базой данных
    await sql.connect(config);

    // Выполнение запроса
    const result = await sql.query(`
      SELECT P_ID as id, P_NAME as name, P_AUTHOR as author, P_GENRE as genre
      FROM Publications
      WHERE P_NAME = '' OR P_NAME LIKE '%${title}%'
    `);

    // Закрытие соединения с базой данных
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

async function getPublicationById(id) {
  try {
    // Установка соединения с базой данных
    await sql.connect(config);

    // Выполнение запроса
    const result = await sql.query(`
          SELECT P_ID as id, P_NAME as name, P_AUTHOR as author, P_PRICE as price, P_COUNT as count, P_PLACE as place
          FROM Publications
          WHERE P_ID = ${id}
        `);

    // Закрытие соединения с базой данных
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

async function insertRequest(pid, name, email, phone) {
  try {
    // Установка соединения с базой данных
    await sql.connect(config);

    // Выполнение запроса
    const result = await sql.query(`
    INSERT INTO Requests(P_ID, R_NAME, R_EMAIL, R_PHONE) 
    VALUES (${pid}, '${name}', '${email}', '${phone}'); 
    SELECT SCOPE_IDENTITY() AS id;
        `);

    // Закрытие соединения с базой данных
    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

module.exports = {
  getPublicationsByTitle,
  getPublicationById,
  insertRequest
};