<!-- header.php -->
<?php get_header(); ?>

	<div class="content">
		<div class="content-right">
			<div class="googlemaps<?php global $class_prefix; echo $class_prefix; ?>">
				<a href="#" title="">Перейти</a>
			</div>
			<?php $count = 0; if (have_posts()) : while (have_posts()) : the_post(); ?>
			<!--<img class="post-img" width="119" height="111" src="/ava1.png" alt="" />-->
			<?php if ($count == 0) {$cat_right = ''; $count = 1;} else {$cat_right = ' r-anons'; $count = 0;}?>
			
			<div class="post-anons<?php echo $cat_right; ?>">
				<?php if (get_post_meta($post->ID, 'post-image', true)) $cat_image = get_post_meta($post->ID, 'post-image', true); ?>
				<a href="<?php the_permalink(); ?>" title=""><img class="<?php echo $class_prefix; ?>" width="160" height="100" src="<?php echo $cat_image; ?>" alt="" /></a>
				<a class="post-anons-title<?php echo $class_prefix; ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
				<span class="post-anons-pretitle"><?php $excerpt_text = $post->post_excerpt; limit_words($excerpt_text, 20); ?></span>
				<div class="clear"></div>
				<p><?php $content_text = $post->post_content; limit_words($content_text, 50); ?>...</p>
			</div>
			<?php if ($count == 0) { ?>
			<div class="clear dotted"></div>
			<?php } ?>

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