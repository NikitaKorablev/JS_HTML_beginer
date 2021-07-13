<?php
/*
Template Name: Online
*/
?>

<!-- header.php -->
<?php get_header(); ?>

	<div class="content">
		<div class="content-right">
			<div class="googlemaps tour">
				<a href="#" title="">Перейти</a>
			</div>
			
			<div class="post">
				<h1><?php the_title(); ?></h1>
				<div id="sm_SearchResult"></div>
				<span class="review-anons-head">Самые посещаемые места</span>
				<img style="border:none;" width="654" height="342" src="/home-table.jpg" alt="" />

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