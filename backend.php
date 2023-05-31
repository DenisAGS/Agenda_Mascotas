<?php

// Establecer la conexión con la base de datos PostgreSQL
$dbconn = pg_connect("host=localhost port=5432 dbname=nombre_basedatos user=usuario password=contraseña");

// Verificar la conexión
if (!$dbconn) {
  exit("Error al conectar a la base de datos");
}

// Obtener la lista de mascotas activas
function obtenerMascotas() {
  global $dbconn;
  $query = "SELECT * FROM mascotas WHERE activo = true";
  $result = pg_query($dbconn, $query);
  $mascotas = pg_fetch_all($result);
  return $mascotas ? $mascotas : [];
}

// Agregar una nueva mascota
function agregarMascota($nombre, $nombreDueno, $enfermedad, $edad, $fechaIngreso) {
  global $dbconn;
  $query = "INSERT INTO mascotas (nombre, nombre_dueno, enfermedad, edad, fecha_ingreso, activo) VALUES ('$nombre', '$nombreDueno', '$enfermedad', $edad, '$fechaIngreso', true)";
  $result = pg_query($dbconn, $query);
  return $result ? true : false;
}

// Editar una mascota existente
function editarMascota($id, $nombre, $nombreDueno, $enfermedad, $edad) {
  global $dbconn;
  $query = "UPDATE mascotas SET nombre = '$nombre', nombre_dueno = '$nombreDueno', enfermedad = '$enfermedad', edad = $edad WHERE id = $id";
  $result = pg_query($dbconn, $query);
  return $result ? true : false;
}

// Eliminar una mascota
function eliminarMascota($id) {
  global $dbconn;
  $query = "UPDATE mascotas SET activo = false WHERE id = $id";
  $result = pg_query($dbconn, $query);
  return $result ? true : false;
}

// Obtener los datos enviados por la petición HTTP
$requestData = json_decode(file_get_contents("php://input"), true);

// Manejar la petición según el método y la acción especificada
$method = $_SERVER['REQUEST_METHOD'];
$action = isset($requestData['action']) ? $requestData['action'] : '';

switch ($method) {
  case 'GET':
    if ($action === 'obtenerMascotas') {
      $mascotas = obtenerMascotas();
      echo json_encode($mascotas);
    }
    break;

  case 'POST':
    if ($action === 'agregarMascota') {
      $nombre = $requestData['nombre'];
      $nombreDueno = $requestData['nombreDueno'];
      $enfermedad = $requestData['enfermedad'];
      $edad = $requestData['edad'];
      $fechaIngreso = $requestData['fechaIngreso'];
      $resultado = agregarMascota($nombre, $nombreDueno, $enfermedad, $edad, $fechaIngreso);
      echo json_encode($resultado);
    }
    break;

  case 'PUT':
    if ($action === 'editarMascota') {
      $id = $requestData['id'];
      $nombre = $requestData['nombre'];
      $nombreDueno = $requestData['nombreDueno'];
      $enfermedad = $requestData['enfermedad'];
      $edad = $requestData['edad'];
      $resultado = editarMascota($id, $nombre, $nombreDueno, $enfermedad, $edad);
      echo json_encode($resultado);
    }
    break;

  case 'DELETE':
    if ($action === 'eliminarMascota') {
      $id = $requestData['id'];
      $resultado = eliminarMascota($id);
      echo json_encode($resultado);
    }
    break;
}

// Cerrar la conexión con la base de datos
pg_close($dbconn);

?>
