<?php
header("Content-Type:application/json");




if (isset($_GET['action']) && $_GET['action']!="") {
    //include('config.php');

    $con = mysqli_connect("localhost","root","","bd_viernesxiii");
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        die();
	}
    if($_GET['action']=="listarusuarios"){
            //$order_id = $_GET['order_id'];
            $result = mysqli_query(
            $con,
            "SELECT * FROM `usuario`");
        if(mysqli_num_rows($result)>0){


            $myArray = array();
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
            mysqli_close($con);
        }
        else{
            echo json_encode("no records");
        }
    }
    if($_GET['action']=="relatousuario"){
            $id_usuario = $_GET['idusuario'];
            $result = mysqli_query(
            $con,
            "SELECT * FROM relatos WHERE id_usuario = ".$id_usuario.";");
        if(mysqli_num_rows($result)>0){


            $myArray = array();
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
            mysqli_close($con);
        }
        else{
            echo json_encode("no records");
        }
    }
    if($_GET['action']=="loginusuario"){
            $correo = $_POST['correo'];
            $password = $_POST['password'];
            $result = mysqli_query(
            $con,
            "SELECT * FROM usuario WHERE correo_usuario = '".$correo."' AND password_usuario = '".$password."';");
        if(mysqli_num_rows($result)>0){


            $myArray = array();
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
            mysqli_close($con);
        }
        else{
            echo json_encode("failed login");
        }
    }
    if($_GET['action']=="listarelatos"){
            //$order_id = $_GET['order_id'];
            $result = mysqli_query(
            $con,
            "SELECT id_relato, titulo_relato, SUBSTRING(contenido_relato, 1, 200) AS contenido_relato, nombre_usuario FROM relatos INNER JOIN usuario ON relatos.id_usuario = usuario.id_usuario;");
        if(mysqli_num_rows($result)>0){


            $myArray = array();
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
            mysqli_close($con);
        }
        else{
            echo json_encode("no records");
        }
    }
    if($_GET['action']=="registrousuario"){
        $nombre=$_POST['nombre'];
        $password=$_POST['password'];
        $correo=$_POST['correo'];
        $sql = "INSERT INTO usuario (correo_usuario, nombre_usuario, password_usuario) VALUES ('".$correo."', '".$nombre."', '".$password."')";
        mysqli_query($con, $sql);
        if (mysqli_query($con, $sql)){
            
            echo json_encode ('registro exitoso');
        }else{echo json_encode ('error, no se pudo registrar');}
        mysqli_close($con);
    }
    if($_GET['action']=="registrorelato"){
        $contenido=$_POST['contenido'];
        $idusuario=$_POST['idusuario'];
        $titulo=$_POST['titulo'];
        $sql = "INSERT INTO relatos (contenido_relato, id_usuario, titulo_relato) VALUES ('".$contenido."', '".$idusuario."', '".$titulo."')";
        mysqli_query($con, $sql);
        if (mysqli_query($con, $sql)){
            
            echo json_encode ('registro exitoso');
        }else{echo json_encode ('error, no se pudo registrar');}
        mysqli_close($con);
    }
    if($_GET['action']=="relatocompleto"){
            $relatoid = $_GET['idrelato'];
            $result = mysqli_query(
            $con,
            "SELECT id_relato, titulo_relato, contenido_relato, nombre_usuario FROM relatos INNER JOIN usuario ON relatos.id_usuario = usuario.id_usuario WHERE id_relato =" .$relatoid);
        if(mysqli_num_rows($result)>0){


            $myArray = array();
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
            mysqli_close($con);
        }
        else{
            echo json_encode("no records");
        }
    }
}else{
	echo json_encode("invalid request");
	}

function response($order_id,$amount,$response_code,$response_desc){
	$response['order_id'] = "asd";
	$response['amount'] = $amount;
	$response['response_code'] = $response_code;
	$response['response_desc'] = $response_desc;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>