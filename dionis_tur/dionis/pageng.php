<?php
/*
Template Name: NG-Gallery
*/
?>

<!-- header.php -->
<?php get_header(); ?>

	<div class="content">
		<div class="content-right">
			<div class="googlemaps tour">
				<a href="#" title="">Перейти</a>
			</div>
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<div class="post">
				<h1><?php the_title(); ?></h1>
				<div class="clear"></div>
				<?php the_content(); ?>

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