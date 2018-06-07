<?php

require_once 'data/calendar_database.php';
require_once 'lib/hash.php';

class User {

    public function __construct(
        $user_id, 
        $user_name, 
        $first_name, 
        $last_name, 
        $mail,
        $password_hash
    ) {
        $this->user_id = (int) $user_id;
        $this->user_name = $user_name;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->mail = $mail;
        $this->password_hash = $password_hash;
    }


    public static function byArray($array) 
    {
        return new User(
            $array["user_id"],
            $array["user_name"],
            $array["first_name"],
            $array["last_name"],
            $array["mail"],
            $array["password_hash"]
        );
    }

    public static function get($id)
    {		
        $database = CalendarDatabase::getStd();
	    $sql = $database->prepare("SELECT * FROM User WHERE user_id = ?");

	    $sql->bind_param("i", $id);

        $sql->execute();
        $result = $sql->get_result();
		
	    if ($row = $result->fetch_assoc()) {
            $user = User::byArray($row);
		    return $user;
	    }

	    return NULL;
    }

    public function checkPassword($password)
    {
        $passwordHash = hashPassword($password);
        if($this->password_hash == $passwordHash) {
            return true;    
        }
        return false;
    }

    public function changePassword($password)
    {
        $this->password_hash = $password;
        $this->hashPassword();
        $database = CalendarDatabase::getStd();
		$sql = $database->prepare(
            "UPDATE User SET password_hash = ? WHERE user_id = ?"
        );

		$sql->bind_param(
            "si", 
            $this->password_hash,
            $this->user_id
        );

        $success = $sql->execute();
		return $success;
    }

    public function post()
    {
        $database = CalendarDatabase::getStd();
		$sql = $database->prepare(
            "INSERT INTO User (user_name, first_name, 
                last_name, mail, password_hash) VALUES (?, ?, ?, ?, ?)"
        );

		$sql->bind_param(
            "sssss", 
            $this->user_name, 
            $this->first_name, 
            $this->last_name, 
            $this->mail,
            $this->password_hash);

        if ($sql->execute() === true){
			return $database->getInsertId();
		}
		return null;
    }

    public function delete()
    {
        $database = CalendarDatabase::getStd();
	    $sql = $database->prepare("DELETE FROM User WHERE user_id = ?");

	    $sql->bind_param("i", $id);

        return $sql->execute() === true;
    }

    public static function getByName($name) 
    {
	    $database = CalendarDatabase::getStd();
	    $sql = $database->prepare("SELECT * FROM User WHERE user_name like ?");

	    $sql->bind_param("s", "%$name%");

        $sql->execute();
        $result = $sql->get_result();

	    $array = array();

	    if ($result->num_rows > 0) {
		    while ($row = $result->fetch_assoc()) {
                $user = User::byArray($row);
			    array_push($array, $user);
		    }
	    }

	    return $array;
    }

    public static function getByExactName($name) 
    {
	    $database = CalendarDatabase::getStd();
	    $sql = $database->prepare("SELECT * FROM User WHERE user_name = ?");

	    $sql->bind_param("s", $name);

        $sql->execute();
        $result = $sql->get_result();


	    if ($row = $result->fetch_assoc()) {
            $user = User::byArray($row);
		    return $user;
	    }
	    return null;
    }

    public function hashPassword()
    {
        $this->password_hash = hashPassword($this->password_hash);
    }

    public function toJSON() 
    {
        $array = array(
            'user_id' => $this->user_id,
            'user_name' => $this->user_name,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'mail' => $this->mail
          );

        return json_encode($array);
    }
}
?>