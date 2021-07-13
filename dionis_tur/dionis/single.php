<!-- header.php -->
<?php get_header(); ?>

	<div class="content">
		<div class="content-right">
			<div class="googlemaps<?php global $class_prefix; echo $class_prefix; ?>">
				<a href="#" title="">Перейти</a>
			</div>
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<div class="post">
				<?php
					$cat = get_the_category($post->ID);
					$cat_name = $cat[0]->cat_name;
					$cat_slug = $cat[0]->slug;
					if (get_post_meta($post->ID, 'post-image', true)) $cat_image = get_post_meta($post->ID, 'post-image', true);
					$post_views = get_post_meta($post->ID, 'post-views', true);
					$post_views++;
					update_post_meta($post->ID, 'post-views', $post_views);
				?>

				<h1><?php the_title(); ?></h1>
				<span class="post-date"><?php the_time('d.m.Y'); ?></span>
				<span class="post-category"> | Рубрика: <?php echo $cat_name; ?> | Автор: <?php the_author_posts_link(); ?></span><br /><br />
				<div class="clear"></div>
				<img class="post-img<?php echo $class_prefix; ?>" width="119" height="111" src="<?php echo $cat_image; ?>" alt="" />
				<?php the_content(); ?>

				<div class="clear"></div>
				<span class="post-date">Комментариев: <?php comments_number('0','1', '%'); ?></span>
				<span class="post-category"> | Просмотров: <?php echo $post_views; ?></span>
				<span class="post-category"> | <?php if(function_exists(getILikeThis)) getILikeThis('get'); ?></span>
				<span class="post-tags"><?php the_tags(); ?></span>
				<div class="clear"></div>
			</div>
			<br /><br />
			<!-- comments -->
			<?php comments_template(); ?>
			
			<?php endwhile; else : ?>
			
			<?php endif; ?>

			<br />
			<?php //comments_template(); ?>
			<!-- users-reviews.php -->
			<?php include_once('users-reviews.php'); ?>
		</div>
		<!-- sidebar.php -->
		<?php get_sidebar(); ?>
		<div class="clear"></div>
	</div>


<!-- footer.php -->
<?php get_footer(); ?>