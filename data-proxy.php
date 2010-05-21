<?php
if (get_magic_quotes_gpc()) {
    $process = array(&$_GET, &$_POST, &$_COOKIE, &$_REQUEST);
    while (list($key, $val) = each($process)) {
        foreach ($val as $k => $v) {
            unset($process[$key][$k]);
            if (is_array($v)) {
                $process[$key][stripslashes($k)] = $v;
                $process[] = &$process[$key][stripslashes($k)];
            } else {
                $process[$key][stripslashes($k)] = stripslashes($v);
            }
        }
    }
    unset($process);
}


$data = $_REQUEST['data'];

$data = explode(',' , $data);
$start = $data[0];
$b64 = $data[1];

$start= explode(";", $start);

$mime = $start[0];
$encoding = $start[1];
if ($mime == "image/png") {
  $ret = base54_decode($b64);
  header('Content-Type: ' . $mime);
  echo $ret;
}


?>
