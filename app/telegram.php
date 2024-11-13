<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
	$chatId = "-4082469347";
	$botToken = "6738781579:AAGwwDl2_UiW0bMdoWYzyI0ZUm-DVM17KLA";

	// Получаем и фильтруем данные с помощью filter_input
	$name = htmlspecialchars(trim(filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING)));
	$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
	$message = htmlspecialchars(trim(filter_input(INPUT_POST, "message", FILTER_SANITIZE_STRING)));
	$request_from = htmlspecialchars(trim(filter_input(INPUT_POST, "request-from", FILTER_SANITIZE_STRING)));

	// Если email некорректный, можем вернуть ошибку или продолжить
	if (!$email) {
			// Можно обработать ошибку
			exit("Некорректный email");
	}

	// Дополнительно можно ограничить длину вводимых полей
	if (strlen($name) > 100 || strlen($message) > 1000 || strlen($request_from) > 200) {
			exit("Превышена допустимая длина сообщения.");
	}

	// Формируем текст сообщения
	$text = "Новое сообщение из формы:\n\n";
	$text .= "Имя: $name\n";
	$text .= "Email: $email\n";
	$text .= "Сообщение: $message\n";
	$text .= "Заявка: $request_from";

	// Отправка сообщения в Telegram
	$url = "https://api.telegram.org/bot$botToken/sendMessage";
	$data = [
			"chat_id" => $chatId,
			"text" => $text,
	];

	// Опции для HTTP запроса
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