<?php
    $to = $_REQUEST['email'];
    $from = "checkout@thewidgetstore.com";
    $name = "The Widget Store";
    $headers = "From: $from";
    $subject = "Your receipt from the widget store";
    $fields = array();
    $fields{"message"} = "message";
    $body = "Here is your receipt:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }
    $send = mail($to, $subject, $body, $headers);
?>