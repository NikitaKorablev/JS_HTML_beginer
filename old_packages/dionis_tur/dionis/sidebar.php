		<div class="content-left">
			
			<?
			if (is_home() || is_author() || is_page() || is_tag() || is_category(3)) {
				$cat_param = '';
			}
			if (is_category() && !(is_category(3))) {
				$thisCat = get_category(get_query_var('cat'),false);
				$cat_param = '&category='.$thisCat->cat_ID;
			}
			if (is_single()) {
				$thisCat = get_the_category($post->ID);
				$cat_param = '&category='.$thisCat[0]->cat_ID;
			}
			//print_r($cat_param);
			?>
			
			
		
		
			<?php if (is_category(6) || is_single() || (!(is_page(7)) && !(is_home()))) { ?>
			<!--<div class="left-menu-head num1"><span><a name="anchor1">Подписаться на обновления</a></span></div>
			<div class="toggle_container">
				<div class="block">
					
				</div>
			</div>
			
			<div class="left-menu-head num2"><span><a name="anchor2">Лента RSS</a></span></div>
			<div class="toggle_container">
				<div class="block">
					
				</div>
			</div>-->
			
			<div class="left-menu-head num3"><span><a name="anchor3">Последние записи</a></span></div>
			<div class="toggle_container">
				<div class="block">
					<ul>
					<?php
						$posts_more = get_posts("numberposts=5$cat_param");
						foreach ($posts_more as $post) {
							setup_postdata($post); ?>
								<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
						<?php
						//echo "\n\t\t\t\t";
						}
					?>
					</ul>
				</div>
			</div>
			
			<div class="left-menu-head num4"><span><a name="anchor4">Самое читаемое</a></span></div>
			<div class="toggle_container">
				<div class="block">
					<ul>
					<?php
						$popular_posts = $wpdb->get_results("SELECT post_id, meta_value FROM {$wpdb->prefix}postmeta WHERE meta_key = 'post-views' AND meta_value > 15 ORDER BY meta_value DESC LIMIT 0,50");
//print_r($popular_posts);
$postv = array();
foreach ($popular_posts as $value) {
	$postv[$value->post_id] = $value->meta_value;
}
asort($postv);
$postv1 = array();
foreach($postv as $key => $val) {
	$postv1[] = array('id' => $key, 'views' => $val);
}
$c = count($postv1);
$i = $c - 1;
for ($i, $k = 5; $k > 0; $i--, $k--) {
	echo "<li><a href='". get_permalink($postv1[$i]['id']) ."'>".get_the_title($postv1[$i]['id'])."</a> (".$postv1[$i]['views'].")</li>\n";
}
					?>
					</ul>
				</div>
			</div>
			
			<div class="left-menu-head num5"><span><a name="anchor5">Самое популярное</a></span></div>
			<div class="toggle_container">
				<div class="block">
					<ul>
					<?php
						//$args = array('numberposts' => '5', 'orderby' => 'comment_count', 'order' => 'DESC'); 
						//$posts_more = get_posts($args);
						$posts_more = get_posts("numberposts=5&orderby=comment_count&order=DESC$cat_param");
						foreach ($posts_more as $post) {
							setup_postdata($post); if ($post->comment_count >= 2) { ?>
								<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a> (<?php echo $post->comment_count; ?> комм.)</li>
						<?php }
						//echo "\n\t\t\t\t";
						}
					?>
					</ul>
				</div>
			</div>
			
			<div class="left-menu-head num6"><span><a name="anchor6">Последние комментарии</a></span></div>
			<div class="toggle_container">
				<div class="block">
					<ul>
					<?php
						$args = array('number' => 5, 'status' => 'approve', 'post_status' => 'publish');
						$comments = get_comments($args);
						//print_r($comments);
						foreach ($comments as $scom) { ?>
							<li><em><?php echo $scom->comment_author; ?></em> к записи <a href="<?php echo $scom->guid; ?>"><?php echo $scom->post_title; ?></a></li>
						<?php
						//echo "\n\t\t\t\t";
						}
					?>
					</ul>
				</div>
			</div>
			
			<div class="line-solid"></div>
			<?php } ?>

			<?php /*if (is_category() || is_single() || is_author() || is_tag() || (!(is_page(7)) && !(is_home()))) { ?>
			<span class="left-head">Статьи</span>
			<?php
				if (is_category(6) || is_single() || is_page()) {$need_posts = 1;} else {$need_posts = 3;};
				$count = 1;
				$posts_more = get_posts("numberposts=$need_posts&category=7");
				foreach ($posts_more as $post) {
					setup_postdata($post); ?>
					<div class="left-anons<?php if (($need_posts - $count) == 0) echo ' no-border'; ?>">
						<span class="anons-date"><?php the_time('(d.m.Y / h:m)'); ?></span>
						<span class="anons-title"><?php the_title(); ?></span>
						<p><?php $content_text = $post->post_content; limit_words($content_text, 30); ?>...</p>
						<a class="readmore-link" href="<?php the_permalink(); ?>">Читать далее</a>
					</div>
				<?php
				$count++;
				//echo "\n\t\t\t\t";
				}
			?>
			
			<p class="button-gocategory<?php global $class_prefix; echo $class_prefix; ?>"><a href="/category/stati" title="">Все статьи</a></p>
			<div class="clear"></div>
			<?php }*/ ?>
			
			<?php if (is_home() || is_page(7)) { ?>
			<!--<img width="326" height="424" src="/forma-poisk.jpg" alt="" />--><div id="sm_SearchForm"></div>
			<br /><br />
			<?php } ?>
			


			<span class="left-head"><a href="/samye-samye">Самые-самые</a></span>
			<br />
			<br />
			<span class="left-head">Фотогалерея</span>
					<?php
						$args = array('post_type' => 'attachment', 'numberposts' => 4, 'post_mime_type' => 'image'); 
						$posts_more = get_posts($args);
						$align = '';
						//print_r($posts_more);
						foreach ($posts_more as $post) {
						?>
							<a class="gal-img<?php echo $align; ?>" href="<?php echo $post->guid; ?>"><img width="140" src="<?php echo $post->guid; ?>" alt="" /></a>
						<?php
						if ($align == '') {$align = ' righ';} else {$align = ''; echo '<div class="clear"></div>';}
						//echo "\n\t\t\t\t";
						}
					?>

			<div class="clear"></div>
			<a href="/fotogalereya">Перейти в фотогалерею</a><br /><br />
			<span class="left-head">Партнеры</span>
				<a href="#1"><img width="150" height="80" src="/111/par1.jpg" alt="" /></a>
				<a href="#2"><img width="150" height="80" src="/111/par2.jpg" alt="" /></a>
				<a href="#3"><img width="150" height="80" src="/111/par3.jpg" alt="" /></a>
				<a href="#4"><img width="150" height="80" src="/111/par4.jpg" alt="" /></a>
				<a href="#5"><img width="150" height="80" src="/111/par5.jpg" alt="" /></a>
				<a href="#6"><img width="150" height="80" src="/111/par6.jpg" alt="" /></a>
				<a href="#7"><img width="150" height="80" src="/111/par7.jpg" alt="" /></a>

		</div>