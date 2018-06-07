<?php

require_once 'data/calendar_database.php';

class Appointment {

    function __construct(
        $appointment_id, 
        $start, 
        $end, 
        $calendar_id, 
        $appointment_title, 
        $appointment_description
    ) {
        $this->appointment_id = (int)$appointment_id;
        $this->start = $start;
        $this->end = $end;
        $this->calendar_id = (int)$calendar_id;
        $this->appointment_title = $appointment_title;
        $this->appointment_description = $appointment_description;
    }

    static function get($id) 
    {
        $database = CalendarDatabase::getStd();
        $sql = $database->prepare(
            "SELECT * FROM Appointment WHERE appointment_id = ?"
        );

        $sql->bind_param("i", $id);
        $sql->execute();
        $result = $sql->get_result(); 

        if ($result->num_rows > 0) {

	        $row = $result->fetch_assoc();

	        return new Appointment(
		        $row['appointment_id'], 
		        DateTime::createFromFormat(SQL_TIMESTAMP, $row['start']), 
		        DateTime::createFromFormat(SQL_TIMESTAMP, $row['end']), 
		        $row['calendar_id'], 
		        $row['appointment_title'], 
		        $row['appointment_description']
	        );
        }

        return null;
    }

    function post() 
    {
        $database = CalendarDatabase::getStd();
        $sql = $database->prepare(
            "INSERT INTO Appointment (start, end, calendar_id, 
		    appointment_title, appointment_description) VALUES (?, ?, ?, ?, ?)"
        );

        $sql->bind_param(
            "ssiss", 
            $this->start->format(SQL_TIMESTAMP), 
	        $this->end->format(SQL_TIMESTAMP), 
            $this->calendar_id, 
	        $this->appointment_title, 
            $this->appointment_description
        );

        if ($sql->execute() === true) {
	        return $database->getInsertId();
        }

        return null;
    }

    function put() 
    {
        $database = CalendarDatabase::getStd();
        $sql = $database->prepare(
            "INSERT INTO Appointment (" .
	            "appointment_id, start, end, calendar_id, appointment_title," . 
	            "appointment_description" .
            ") VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE " .
	            "start=?, end=?, calendar_id=?, appointment_title=?," .
	            "appointment_description=?"
        );

        $sql->bind_param(
            "ississssiss", 
            $this->appointment_id, 
	        $this->start->format(SQL_TIMESTAMP), 
            $this->end->format(SQL_TIMESTAMP), 
	        $this->calendar_id, 
            $this->appointment_title, 
            $this->appointment_description, 
	        $this->start->format(SQL_TIMESTAMP), 
            $this->end->format(SQL_TIMESTAMP), 
	        $this->calendar_id, 
            $this->appointment_title, 
            $this->appointment_description
        );

        if ($sql->execute() === true) {
	        return $database->getInsertId();
        }

        return null;
    }

    function delete() 
    {
        $database = CalendarDatabase::getStd();
        $sql = $database->prepare(
            "DELETE FROM Appointment WHERE appointment_id = ?"
        );

        $sql->bind_param("i", $this->appointment_id);

        return $sql->execute() === true;
    }

	static function searchAppointments($after, $before, $calId) 
    {
        $resultArray = array();

        if (is_null($calId) || is_null($before) || is_null($after)) {
	        return $resultArray;
        }

        $database = CalendarDatabase::getStd();
        $beforeTS = new DateTime();
        $beforeTS->setTimestamp($before);
        $afterTS = new DateTime();
        $afterTS->setTimestamp($after);

        $sql = $database->prepare(
            "SELECT * FROM Appointment" . 
	        " WHERE calendar_id = ? AND start >= ? AND end <= ?"
        );

        $sql->bind_param(
            $calId, 
            $afterTS->format(SQL_TIMESTAMP), 
	        $beforeTS->format(SQL_TIMESTAMP)
        );

        $sql->execute();
        $result = $sql->get_result();

        while ($row = $result->fetch_assoc()) {
	        array_push($resultArray, new Appointment(
		        $row['appointment_id'], 
		        DateTime::createFromFormat(SQL_TIMESTAMP, $row['start']), 
		        DateTime::createFromFormat(SQL_TIMESTAMP, $row['end']), 
		        $row['calendar_id'], 
		        $row['appointment_title'], 
		        $row['appointment_description'])
            );
        }

        return $resultArray;
    }

    function toJSON() 
    {
        $array = array(
            'appointment_id' => $this->appointment_id,
            'start' => $this->start->getTimestamp(),
            'end' => $this->end->getTimestamp(),
            'calendar_id' => $this->calendar_id,
            'appointment_title' => $this->appointment_title,
            'appointment_description' => $this->appointment_description
        );

        return json_encode($array);
    }

    static function fromArray($array)
    {
        $start=new DateTime();
        $end=new DateTime();

        return new Appointment(
            $array["appointment_id"],
            $start->setTimestamp($array["start"]),
            $end->setTimestamp($array["end"]),
            $array["calendar_id"],
            $array["appointment_title"],
            $array["appointment_description"]
        );
    }
  }
?>
