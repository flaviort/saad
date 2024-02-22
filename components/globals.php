<?php

	// page title
	if (empty($pageTitle)) {
	    $page = '';
	} else {
	    $page = '| ' . $pageTitle;
	}

	// check for http or https
	$url = (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]';

	// global vars
	$siteUrl = 'https://www.saad.cx';
	$phone = '+55 41 988 497 003';
	$linkedin = 'https://www.linkedin.com/';
	$facebook = 'https://facebook.com/';
	$instagram = 'https://instagram.com/';
	$twitter = 'https://twitter.com/';
	$behance = 'https://www.behance.net/';
	$email = 'saad@saad.cx';
	
?>