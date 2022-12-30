<?php
    $script = $_POST['script'];
    $language = $_POST['language'];
    $versionIndex = $_POST['versionIndex'];
    $clientId = $_POST['clientId'];
    $clientSecret = $_POST['clientSecret'];

    $ch = curl_init();

    $url = 'https://api.jdoodle.com/v1/execute';

    $data = array(
        'script' => $script,
        'language' => $language,
        'versionIndex' => $versionIndex,
        'clientId' => $clientId,
        'clientSecret' => $clientSecret);
    
    
    $headers = array(
        'Content-Type: application/json'
    );

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result= curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ( $status !== 201 && $status !== 200 ) {
        echo "Server down! please try again after some time";
     }
     else{
        $decoded = json_decode($result);
        echo $decoded->output;
    }