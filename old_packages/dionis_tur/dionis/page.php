<!-- header.php -->
<?php get_header(); ?>

	<div class="content">
		<div class="content-right">
			<div class="googlemaps tour">
				<a href="#" title="">Перейти</a>
			</div>
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<?php
				$post_views = get_post_meta($post->ID, 'post-views', true);
				$post_views++;
				update_post_meta($post->ID, 'post-views', $post_views);
			?>
			<div class="post">
				<h1><?php the_title(); ?></h1>
				<span class="post-date"><?php the_time('d.m.Y'); ?></span>
				<span class="post-category">| Автор: <?php the_author_posts_link(); ?></span><br /><br />
				<div class="clear"></div>
				<img class="post-img" width="119" height="111" src="/ava1.png" alt="" />
				<?php the_content(); ?>

				<div class="clear"></div>
				<span class="post-date">Комментариев: <?php comments_number('0','1', '%'); ?></span>
				<span class="post-category"> | Просмотров: <?php echo $post_views; ?></span>
				<div class="clear"></div>
			</div>
			
			<?php endwhile; else : ?>
			
			<?php endif; ?>

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