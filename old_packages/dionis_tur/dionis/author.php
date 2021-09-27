<!-- header.php -->
<?php get_header(); ?>
<?php
	$curauth = (isset($_GET['author_name'])) ? get_user_by('slug', $author_name) : get_userdata(intval($author));
	//print_r($curauth);
?>
	<div class="content">
		<div class="content-right">
			<div class="googlemaps<?php global $class_prefix; echo $class_prefix; ?>">
				<a href="#" title="">Перейти</a>
			</div>
			<div class="post">
				<img class="post-img" width="119" height="111" src="<?php echo ($curauth->avatar) ?  $curauth->avatar : "/ava1.png"; ?>" alt="" />
				<span class="author-name"><?php echo $curauth->display_name; ?></span>
				<table cellspacing="0" cellpadding="0" border="0">
					<tr>
						<td colspan="2" class="table-head">Статистика</td>
					</tr>
					<tr>
						<td>Сообщений</td>
						<td><?php the_author_posts(); ?></td>
					</tr>
					<tr class="alt">
						<td>Дата регистрации</td>
						<td><?php echo date("d.m.Y", strtotime($curauth->user_registered)); ?></td>
					</tr>
					<tr>
						<td>Число комментариев</td>
						<td><?php author_comment_count($curauth->user_email); ?></td>
					</tr>
					<tr>
						<td colspan="2" class="table-head">Контактные данные</td>
					</tr>
					<tr>
						<td>E-mail</td>
						<td><?php echo ($curauth->user_email) ?  $curauth->user_email : "e-mail не указан"; ?></td>
					</tr>
					<tr class="alt">
						<td>Скайп</td>
						<td><?php echo ($curauth->skype) ?  $curauth->skype : "skype-логин не указан"; ?></td>
					</tr>
					<tr>
						<td>ICQ</td>
						<td><?php echo ($curauth->icq) ?  $curauth->icq : "icq-номер не указан"; ?></td>
					</tr>
					<tr>
						<td colspan="2" class="table-head">Личные данные</td>
					</tr>
					<tr>
						<td>Пол</td>
						<td><?php echo ($curauth->gender) ?  $curauth->gender : "пол не указан"; ?></td>
					</tr>
					<tr class="alt">
						<td>Возраст</td>
						<td><?php echo ($curauth->age) ?  $curauth->age : "возраст не указан"; ?></td>
					</tr>
					<tr>
						<td>Место жительства</td>
						<td><?php echo ($curauth->city) ?  $curauth->city : "не указано"; ?></td>
					</tr>
					<tr class="alt">
						<td>Язык</td>
						<td><?php echo ($curauth->language) ?  $curauth->language : "не указан"; ?></td>
					</tr>
				</table>

				
				<div class="clear"></div>
			</div>
			

			<br />
			<!-- users-reviews.php -->
			<?php include_once('users-reviews.php'); ?>
		</div>
		<!-- sidebar.php -->
		<?php get_sidebar(); ?>
		<div class="clear"></div>
	</div>


<!-- footer.php -->
<?php get_footer(); ?>