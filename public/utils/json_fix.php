<?php
function json_fix($str) {
    $str = preg_replace_callback(
        '/\\\\u00([0-9a-f]{2})\\\\u00([0-9a-f]{2})\\\\u00([0-9a-f]{2})\\\\u00([0-9a-f]{2})/',
        function($matches) { return chr(hexdec("$1")).chr(hexdec("$2")).chr(hexdec("$3")).chr(hexdec("$4")); },
        $str
    );
    $str = preg_replace_callback(
        '/\\\\u00([0-9a-f]{2})\\\\u00([0-9a-f]{2})\\\\u00([0-9a-f]{2})/',
        function($matches) { return chr(hexdec("$1")).chr(hexdec("$2")).chr(hexdec("$3")); },
        $str
    );
    $str = preg_replace_callback(
        '/\\\\u00([0-9a-f]{2})\\\\u00([0-9a-f]{2})/',
        function($matches) { return chr(hexdec("$1")).chr(hexdec("$2")); },
        $str
    );
    $str = preg_replace_callback(
        '/\\\\u00([0-9a-f]{2})/',
        function($matches) { return chr(hexdec("$1")); },
        $str
    );
    return $str;
}