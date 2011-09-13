<?php
    //session_unset();
    $row_count = 100;
    
    function generateData() {
    	global $row_count;
        $data['data'] = array();
        
        for ($i=0; $i<$row_count; $i++) {
            $s = str_pad($i, 5, "0", STR_PAD_LEFT);
            $data['data'][] = array('idx' => $i, 'id' => $s, 'AAA' => 'A'.$s, 'BBB' => 'B'.$s);
        }
        $data['total'] = $row_count;
        return $data;
    }
    
    function getAll() {
        if (!isset($_SESSION['buffer_data'])) {
	        $_SESSION['buffer_data'] = generateData();
	    }
	    return $_SESSION['buffer_data'];
    }
    
    function getPage($start, $limit) {
    	global $row_count;
    	$all = getAll();
    	$count = $start + $limit;
        $data['data'] = array();
        
        for ($i=$start; $i<$count; $i++) {
        	if (isset($all['data'][$i])) {
                $data['data'][] = $all['data'][$i];
        	}
        }
        $data['total'] = $row_count;
        return $data;
    }
    
    // return empty set, which should work
    echo "[]";
    
    //echo json_encode(getAll());
    
//    if (isset($_REQUEST['start'])) {
//    	echo json_encode(getPage($_REQUEST['start'], $_REQUEST['limit']));
//    }
//    else {
//        echo json_encode(getAll());
//    }
?>