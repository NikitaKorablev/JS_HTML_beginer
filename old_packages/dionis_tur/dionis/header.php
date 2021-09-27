<?php
	global $class_prefix;
	$class_prefix = ' tour';
	if (is_category(4) or in_category(4)) $class_prefix = ' gastr';
	if (is_category(5) or in_category(5) or is_author()) $class_prefix = ' sport';

?>
<?php
	if (is_home()) {
		$title = get_bloginfo('name').' - '.get_bloginfo('description');
		$keywords = "здесь надо написать кейворды для главной страницы";
		$description = "а здесь надо написать описание главной страницы";
	}
	elseif (is_category()) {
		$title = single_cat_title('', false).' - '.get_bloginfo('name');
		$keywords = single_cat_title('', false);
		$description = 'Рубрика '.$keywords;
	}
	elseif (is_author()) {
		$curauth = (isset($_GET['author_name'])) ? get_user_by('slug', $author_name) : get_userdata(intval($author));
		
		$title = $curauth->display_name;;
		$keywords = '';
		$description = 'Страница пользователя '.$title;
	}
	elseif (is_single() || is_page()) {
		if (get_post_meta($post->ID, 'titl', true)) {
			$title = get_post_meta($post->ID, 'titl', true);
		}
		else {
			$title = the_title('', '', false);
		}
		if (get_post_meta($post->ID, 'thekw', true)) {
			$keywords = get_post_meta($post->ID, 'thekw', true);
		}
		if (get_post_meta($post->ID, 'thedesc', true)) {
			$description = get_post_meta($post->ID, 'thedesc', true);
		}
	}
	else {
		$title = the_title('', '', false).' - '.get_bloginfo('name');
		$keywords = "";
		$description = "";
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><?php //bloginfo('name'); wp_title(); ?><?php echo $title; ?></title>
<meta content="dionis" name="author"/>
<meta content="<?php echo $keywords; ?>" name="keywords" />
<meta content="<?php echo $description; ?>" name="description" />
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" type="text/css" media="screen" />
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
<script charset="UTF8" type="text/javascript" src="/module/js/jquery-plugins.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/slides.min.jquery.js"></script>
<script type="text/javascript">
	// Slider settings
	$(function(){
		$("#slides").slides({
				generateNextPrev: false,
				pagination: false,
				preload: true,
				//preloadImage: 'img/loading.gif',
				generatePagination: false,
				play: 4000,
				pause: 2000,
				hoverPause: true,
				effect: 'fade',
				fadeSpeed: 1500,
				crossfade: true, container: 'slides_container'
			});
	});
	// Toggle menu settings
	$(document).ready(function(){
		$(".toggle_container").hide();
		$("div.left-menu-head").click(function(){
			$(this).toggleClass("active").next().slideToggle("slow");
		});
		$("p.button-down").click(function(){
			$(this).toggleClass("active").next().slideToggle("slow");
		});
	});
	
</script>

  <!-- =================================================================================== -->
  <!-- Вставьте строки ниже в страницу вашего сайта, где будет модуль поиска, в тег <HEAD> -->
  <!-- =================================================================================== -->
    
    <script charset="UTF8" type="text/javascript" src="/module/js/mSettings.js"></script>
    <script charset="UTF8" type="text/javascript" src="/module/js/mCore.js"></script>
    <script charset="UTF8" type="text/javascript" src="/module/js/pSearchFormCommon.js"></script>
    <script charset="UTF8" type="text/javascript" src="/module/js/pSmallSearchForm.js"></script>
    <script type="text/javascript">$(_sf.init);</script>
    <link href="/module/styles/SmallSearchForm.css" rel="stylesheet" type="text/css" />
    <link href="/module/styles/jquery-ui-default.css" rel="stylesheet" type="text/css" />
  <!-- =================================================================================== -->
  <!--                                      Конец <HEAD>                                   -->
  <!-- =================================================================================== -->

<script src="/js-global/FancyZoom.js" type="text/javascript"></script>
<script src="/js-global/FancyZoomHTML.js" type="text/javascript"></script>

<!-- wp-head section -->
<?php wp_head(); ?>
<!-- end wp-head section -->


<script type='text/javascript' src='http://dionis.tw1.ru/wp-content/plugins/i-like-this/js/i-like-this.js?ver=3.2.1'></script>
<link rel="stylesheet" type="text/css" href="http://dionis.tw1.ru/wp-content/plugins/i-like-this/css/i-like-this.css" media="screen" />
<script type="text/javascript">var blogUrl = 'http://dionis.tw1.ru'</script>

</head>
<body onload="setupZoom()">
<div class="container">
<div class="wrapper">
	<div class="header">
		<div class="header-top">
			<div class="login-box">
				<a class="reg" href="/wp-login.php?action=register" title="">Регистрация</a> | <a class="login" href="/wp-login.php" title="">Вход</a>
			</div>
			<a class="logo" href="/" title="На главную">На главную</a>
			<p class="work-time">Наши операторы принимают звонки<br /><span>с 9:00 до 18:00</span><br />без выходных</p>
			<div class="clear"></div>
		</div>
		
		<!-- header-slider.php -->
		<?php include_once('head-slider.php'); ?>
		
	</div>
	<!-- top-menus.php -->
	<?php include_once('top-menus.php'); ?>