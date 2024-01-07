<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
	$chatId = "-4082469347";
	$botToken = "6738781579:AAGwwDl2_UiW0bMdoWYzyI0ZUm-DVM17KLA";

	$name = $_POST["name"];
	$email = $_POST["email"];
	$message = $_POST["message"];
	$request_from = $_POST["request-from"];

	$text = "Новое сообщение из формы:\n\n";
	$text .= "Имя: $name\n";
	$text .= "Email: $email\n";
	$text .= "Сообщение: $message\n";
	$text .= "Заявка: $request_from";

	$url = "https://api.telegram.org/bot$botToken/sendMessage";
	$data = [
		"chat_id" => $chatId,
		"text" => $text,
	];

	$options = [
		"http" => [
			"header" => "Content-type: application/x-www-form-urlencoded\r\n",
			"method" => "POST",
			"content" => http_build_query($data),
		],
	];

	$context = stream_context_create($options);
	file_get_contents($url, false, $context);
}