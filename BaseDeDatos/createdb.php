<?php
$servername = "localhost";
$username = "root";
$password = "";
//Crear Conexion con MYSQL
$conn = new mysqli($servername, $username, $password);
//Comprobar la Conexión
if ($conn->connect_error) {
    die("Fallo de Conexión: " . $conn->connect_error);
} 
//Crear base de datos
$sql = "CREATE DATABASE sistema";
if ($conn->query($sql) === TRUE) {
    echo "Base de Datos Creada.";
} else {
    echo "Error al Crear la Base de Datos:". $conn->error;
}
//Cerrar Conexión
$conn->close();



$connection = mysqli_connect(
    'localhost',
    'root',
    '',
    'sistema'
);

$query=
"CREATE TABLE `contacts`  (
    `contact_id` int(11) NOT NULL,
    `contact_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `contact_number` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `contact_type` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `contact_relationship` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
    `user_id` varchar(12) COLLATE utf8_unicode_ci NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
CREATE TABLE `user` (
  `id` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `gender` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
";
$result=  mysqli_query($connection,$query);


?>