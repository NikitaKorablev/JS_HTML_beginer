<?php /* Меню для спортивного туризма*/ if (is_category(5)) { ?>
	<div class="top-menu">
		<ul>
			<li><a href="/st-article-1">Виндсерфинг</a></li>
			<li><a href="/st-article-1">Кайтсерфинг</a></li>
			<li><a href="/st-article-1">Горные лыжи и сноуборд</a></li>
			<li><a href="/st-article-1">Водный туризм</a></li>
			<li><a href="/st-article-1">Велотуры</a></li>
			<li><a href="/st-article-1">Экскурсионные туры</a></li>
		</ul>
		<div class="clear"></div>
	</div>
<?php } else { ?>
	<div class="top-menu">
		<ul>
			<li><a href="/o-kompanii">О компании</a></li>
			<li><a href="/on-line-servis">On-line сервис</a></li>
			<li><a href="/category/turizm">Туризм</a></li>
			<li><a href="/category/vinnyj-turizm">Гастрономический туризм</a></li>
			<li><a href="/category/sportivnyj-turizm">Спортивный туризм</a></li>
			<li><a href="/category/klub-druzej">Клуб друзей</a></li>
			<!--<li><a href="/category/stati">Статьи</a></li>-->
		</ul>
		<div class="clear"></div>
	</div>
<?php } ?>

<?php /*Меню для гастрономического туризма*/ if (is_category(4)) { ?>
	<div class="gastr-menu">
		<span>Специальные предложения</span>
		<ul>
			<li><a href="/gt-article-1">Национальная кухня</a></li>
			<li><a href="/gt-article-1">Вина</a></li>
			<li><a href="/gt-article-1">Пиво</a></li>
			<li><a href="/gt-article-1">Крепкий алкоголь</a></li>
			<li><a href="/gt-article-1">Сыры</a></li>
			<li><a href="/gt-article-1">Чай</a></li>
			<li><a href="/gt-article-1">Кофе</a></li>
			<li><a href="/gt-article-1">Лакомства</a></li>
			<li><a href="/gt-article-1">Разное</a></li>			
		</ul>
		<div class="clear"></div>
	</div>
	
<?php } /*Меню для просто туризма*/ elseif (is_category(3)) { ?>
	<div class="flags-menu ontur">
		<span>Специальные предложения</span>
		<ul>
			<li><a href="#">Турция</a></li>
			<li><a href="#">Египет</a></li>
			<li><a href="#">Греция</a></li>
			<li><a href="#">ОАЭ</a></li>
			<li><a href="#">Тунис</a></li>
			<li><a href="#">Тайланд</a></li>
			<li><a href="#">Испания</a></li>
			<li><a href="#">Италия</a></li>
			<li><a href="#">Франция</a></li>			
		</ul>
		<div class="clear"></div>
		<p style="font-size:11px; text-align:right; margin:0; cursor:pointer;" class="button-down num7"><a name="anchor7">Показать полный список</a></p>
		<div class="toggle_container">
		<ul>
			<li><a href="#">Россия</a></li>
			<li><a href="#">Хорватия</a></li>
			<li><a href="#">Болгария</a></li>
			<li><a href="#">Чехия</a></li>
			<li><a href="#">Шри-Ланка</a></li>
			<li><a href="#">Израиль</a></li>
			<li><a href="#">Индонезия</a></li>
			<li><a href="#">Австрия</a></li>
			<li><a href="#">Кипр</a></li>
		</ul>
		<div class="clear"></div>

		<ul>
			<li><a href="#">Мексика</a></li>
			<li><a href="#">Бразилия</a></li>
			<li><a href="#">Кения</a></li>
			<li><a href="#">Доминикана</a></li>
			<li><a href="#">Куба</a></li>
			<li><a href="#">Китай</a></li>
			<li><a href="#">Швеция</a></li>
			<li><a href="#">Швейцария</a></li>
			<li><a href="#">Голландия</a></li>
		</ul>
		<div class="clear"></div>
		</div>
		
	</div>
	
<?php } else { ?>
	<div class="flags-menu">
		<span>Специальные предложения</span>
		<ul>
			<li><a class="avstria" href="#">Австрия</a></li>
			<li><a class="italy" href="#">Италия</a></li>
			<li><a class="france" href="#">Франция</a></li>
			<li><a class="horvatia" href="#">Хорватия</a></li>
			<li><a class="chernogoria" href="#">Черногория</a></li>
			<li><a class="shvecia" href="#">Швеция</a></li>
			<li><a class="spain" href="#">Испания</a></li>
			<li><a class="china" href="#">Китай</a></li>
			<li><a class="shveicaria" href="#">Швейцария</a></li>
		</ul>
		<div class="clear"></div>
	</div>
<?php } ?>