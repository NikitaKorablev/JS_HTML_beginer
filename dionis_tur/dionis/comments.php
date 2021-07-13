<?php // Do not delete these lines
	if ('comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
		die ('Please do not load this page directly. Thanks!');

	if (!empty($post->post_password)) { // if there's a password
		if ($_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password) {  // and it doesn't match the cookie
			?>

			<p>Это сообщение защищено паролем. Введите пароль для просмотра комментариев.</p>

			<?php
			return;
		}
	}

?>

<!-- You can start editing here. -->

<div id="comments" class="comments-list">
<?php if ($comments) : ?>
       
<?php foreach ($comments as $comment) : ?>
<div class="entry">
	<p class="name"><?php comment_author(); ?></p>
	<p class="date"><?php /*comment_date('F jS, Y')*/comment_date('d.m.Y'); ?></p>
	<?php if ($comment->comment_approved == '0') : ?>
		<p><em style=" font-style: normal; color:#FF0000;">Ваш комментарий ожидает модерации.</em></p>
	<?php endif; ?>
	<div class="con"><?php comment_text() ?></div>
</div>

<?php endforeach; ?>

<?php elseif ('open' != $post->comment_status) : ?>
<p class="note">Комментирование закрыто.</p>
<?php endif; ?>
</div>

	
				
<?php if ('open' == $post->comment_status) : ?>
<div class="comments-form">	
<h3 id="respond">Отправить комментарий</h3>
<form id="comment-form" action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post">
<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
<p>Вы должны выполнить <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<?php echo urlencode(get_permalink()); ?>">вход</a>, чтобы оставить комментарий.</p>
<?php else : ?>
								
<?php if ( $user_ID ) : ?>
<p>Вошел как <a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user_identity; ?></a></p>
<?php else : ?>
<p><input id="comment-name" value="<?php echo $comment_author; ?>" name="author"  type="text" class="formid" /> <label for="comment-name">Ваше имя <strong class="required"><?php if ($req) echo "(обязат.)"; ?></strong></label></p>
<p><input id="comment-email" name="email" value="<?php echo $comment_author_email; ?>" type="text" class="formemail" /> <label for="comment-name">Ваш E-mail <strong class="required"><?php if ($req) echo "(обязат.)"; ?></strong></label></p>
<p><input id="comment-url" name="url" value="<?php echo $comment_author_url; ?>" type="text" class="formuri"/> <label for="comment-name">Ваш URL</label></p>
<?php endif; ?>
<p><textarea name="comment" cols="50" rows="8"></textarea></p>
<p><input name="submit" type="submit" id="submit" tabindex="5" class="button" value="Отправить комментарий" />
<input type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" />
<?php endif; ?>
</form>
</div>							
<?php endif; ?>
