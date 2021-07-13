<!-- header.php -->
<?php get_header(); ?>

	<div class="content">
		<div class="content-right">
			<div class="googlemaps tour">
				<a href="#" title="">Перейти</a>
			</div>
			<?php $count = 0; if (have_posts()) : while (have_posts()) : the_post(); ?>
			<!--<img class="post-img" width="119" height="111" src="/ava1.png" alt="" />-->
			<?php if ($count == 0) {$cat_right = ''; $count = 1;} else {$cat_right = ' r-anons'; $count = 0;}?>
			
			
			<div class="friend-post-anons">
				<a class="ava" href="<?php the_permalink(); ?>"><img width="119" height="111" src="<?php the_author_meta('avatar'); ?>" alt="" /><br /><?php the_author(); ?></a>
				<span class="friend-post-anons-date"><?php the_time('d.m.Y'); ?></span>
				<span class="friend-post-anons-title"><?php the_title(); ?></span>
				<p><?php $content_text = $post->post_content; limit_words($content_text, 50); ?>... <a href="<?php the_permalink(); ?>">Читать далее</a></p>
				<div class="clear"></div>
				<span class="friend-post-anons-comments">(<?php comments_number('0','1', '%'); ?>) комментариев</span>
				<span class="friend-post-anons-like">(<?php if (get_post_meta($post->ID, '_liked', true)) {echo get_post_meta($post->ID, '_liked', true);} else echo '0'; ?>) нравится</span>
				<div class="clear"></div>
			</div>
			
			<?php endwhile; else : ?>
			<div class="post-anons">
				<h2>Записей не найдено...</h2>
			</div>
			<?php endif; ?>
				<div class="clear"></div>
			<?php wp_pagenavi(); ?>
			

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