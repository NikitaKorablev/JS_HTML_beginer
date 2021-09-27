			<span class="review-anons-head">Отзывы туристов</span>
			<div class="clear"></div>
			<?php
				$count = 1;
				$posts_more = get_posts("numberposts=2&category=6");
				foreach ($posts_more as $post) {
					setup_postdata($post); ?>
					<div class="review-anons<?php if ((2 - $count) == 0) echo ' r-anons'; ?>">
						<span class="review-anons-date"><?php the_time('(d.m.Y / h:m)'); ?></span>
						<span class="review-anons-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></span>
						<p><?php $content_text = $post->post_content; limit_words($content_text, 30); ?>...</p>
						<p>Автор: <?php the_author_posts_link(); ?></p>
					</div>
				<?php
				$count++;
				//echo "\n\t\t\t\t";
				}
			?>
			<div class="clear"></div>
			<p class="button-gocategory<?php global $class_prefix; echo $class_prefix; ?>"><a href="/category/klub-druzej" title="">Все отзывы</a></p>
<div class="clear"></div>
<a href="#1"><img width="660" height="100" src="/111/banner1.jpg" alt="" /></a>