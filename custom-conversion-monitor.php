<?php
/**
 * @package Custom Conversion Monitor
 * @version 1.0
 */
/*
Plugin Name: Custom Conversion Monitor
Plugin URI:
Description: Just an wrapper for JS script added to every page. Script performs an DOM Element queries and listens for clicks, submits etc..
Author: Dmitry Koutsenko
Version: 1.0
Author URI: https://www.facebook.com/koutsenko.ds
*/

function add_conversion_monitor() {
    add_action('wp_enqueue_scripts', 'load_conversion_monitor');
}
add_action('get_header', 'add_conversion_monitor');
function load_conversion_monitor() {
    wp_enqueue_script('conversion_monitor', plugin_dir_url( __FILE__ ).'custom-conversion-monitor.js');
}
?>
