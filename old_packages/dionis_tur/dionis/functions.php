<?php
/* Число комментариев определенного автора */
function author_comment_count($the_email){
	global $wpdb;
	$result = $wpdb->get_var("SELECT COUNT(comment_ID) FROM $wpdb->comments WHERE comment_author_email = '$the_email'");
	echo $result;
}

/* Дополнительные поля в админке для пользователя */
function my_new_contactmethods( $contactmethods ) {
	// Добавляем Skype
	$contactmethods['skype'] = 'Skype';
	// Добавляем icq
	$contactmethods['icq'] = 'ICQ';
	// Добавляем пол
	$contactmethods['gender'] = 'Пол';
	// Добавляем возраст
	$contactmethods['age'] = 'Возраст';
	// Добавляем Место жительства
	$contactmethods['city'] = 'Место жительства';
	// Добавляем язык
	$contactmethods['language'] = 'Язык';
	// Добавляем аватарку
	$contactmethods['avatar'] = 'Картинка пользователя (аватар)';
	
	// Удаляем яхо
	unset($contactmethods['yim']); 
	// Удаляем аим
	unset($contactmethods['aim']);
	// Удаляем джабер
	unset($contactmethods['jabber']);
	
	return $contactmethods;
}
add_filter('user_contactmethods','my_new_contactmethods',10,1);

/* Ограничение по количеству слов в анонсе */
function limit_words($string, $word_limit) {
	$string = strip_tags($string);
    $words = explode(" ",$string);
    echo implode(" ",array_splice($words,0,$word_limit));
}



















?>