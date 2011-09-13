<?php
if (isset($_REQUEST["node"])) {
    $node = $_REQUEST["node"];
    $nodes = Array();
    if ($node == "src") {
        for ($i = 1; $i <= 5; ++$i) {
            array_push($nodes, Array(
                "text"=>"Node $i",
                "id"=>"node$i"
            ));
        }
    } else {
        $node = str_replace("node", "", $node);
        for ($i = 1; $i <= 5; ++$i) {
            array_push($nodes, Array(
                "text"=>"Node $node.$i",
                "id"=>"node" . $node . "_" . $i,
                "leaf"=>true
            ));
        }
    }
    echo json_encode($nodes);
} else {
    $raw  = '';
    $httpContent = fopen('php://input', 'r');
    while ($kb = fread($httpContent, 1024)) {
        $raw .= $kb;
    }
    $params = json_decode(stripslashes($raw));
    $out = Array();
    $id = 1;
    if ($_REQUEST['action'] == 'create') {
        if (is_array($params)) {
            foreach ($params as $param) {
                $param->id = 'new-id-' . $id;
                ++$id;
            }
            $out = $params;
        } else {
            $params->id = 'new-id-1';
            array_push($out, $params);
        }
    } else if ($_REQUEST['action'] == 'update') {
        if (is_array($params)) {
            $out = $params;
        } else {
            array_push($out, $params);
        }
    } else if ($_REQUEST['action'] == 'destroy') {
        if (is_array($params)) {
            $out = $params;
        } else {
            array_push($out, $params);
        }
    }
    echo json_encode($out);
}
?>