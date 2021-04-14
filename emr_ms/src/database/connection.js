import mysql from 'mysql';

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'emr_site',
  password : 'site123',
  database : 'emr_group_c',
  // port     : '3000'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('Database connected');
});

export default connection;