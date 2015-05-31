<?php

class LittleBit {

    public function donate ($amount) {

        # Our new data
        $data = array(
            'api_key' => $this->api_key,
            'amount' => $amount
        );

        # Create a connection
        $url = 'localhost/donations';
        $ch = curl_init($url);

        # Form data string
        $postString = http_build_query($data, '', '&');

        # Setting our options
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        # Get the response
        $response = curl_exec($ch);
        curl_close($ch);
        echo $response;
    }

    private $api_key = NULL;

    function __construct ($api_key) {
        $this->api_key = $api_key;
    }
}

?>

