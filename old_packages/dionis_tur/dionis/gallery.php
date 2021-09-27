<?php
/*
Template Name: Gallery
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
				<!--<a href="/111/ph1.jpg" title=""><img width="140" height="100" src="/111/ph1_sm.jpg" alt="" /></a>
				<a href="/111/ph2.jpg" title=""><img width="140" height="100" src="/111/ph2_sm.jpg" alt="" /></a>
				<a href="/111/ph3.jpg" title=""><img width="140" height="100" src="/111/ph3_sm.jpg" alt="" /></a>
				<a href="/111/ph4.jpg" title=""><img width="140" height="100" src="/111/ph4_sm.jpg" alt="" /></a>
				<a href="/111/ph5.jpg" title=""><img width="140" height="100" src="/111/ph5_sm.jpg" alt="" /></a>-->

				<?php
						$args = array('post_type' => 'attachment', 'post_mime_type' => 'image');
						$posts_more = get_posts($args);
						//print_r($posts_more);
						foreach ($posts_more as $post) {
						?>
							<a href="<?php echo $post->guid; ?>"><img width="140" src="<?php echo $post->guid; ?>" alt="" /></a>
						<?php
						//echo "\n\t\t\t\t";
						}
				?>
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