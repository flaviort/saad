<?php
	$currentPage = 'home';
	include('components/head.php');
?>

<div id='home'></div>

<div id='canvas'></div>

<section id='background'>
	<div class='wrapper'>

		<a href='#about' class='scroll sliding-link text-small'>
			<span class='rotate'>
				scroll <span class='line'><span></span></span>
			</span>
		</a>

		<div class='top'>

			<div class='left'>

				<p class='text text-big words'>
					Saad® is an internationally award-winning boutique brand consultancy specialized in building and transforming the future of businesses.
				</p>

				<ul class='lines'>
					
					<li>
						<a href='tel:+55-41-988-497-003'>
							+55&nbsp;41&nbsp;988&nbsp;497&nbsp;003
						</a>
					</li>

					<li>
						<span>
							|
						</span>
					</li>

					<li>
						<a href='mailto:saad@saad.cx'>
							saad@saad.cx
						</a>
					</li>

					<li>
						<span>
							|
						</span>
					</li>

					<li>
						<p>
							curitiba, brazil
						</p>
					</li>

				</ul>

			</div>

			<div class='right circle'>
				<?php echo file_get_contents('assets/svg/new-website.svg'); ?>
			</div>

		</div>

		<div class='bottom'>

			<div id='logo' class='logo'>
				<?php echo file_get_contents('assets/svg/logo.svg'); ?>
			</div>

			<a href='#about' class='arrow sliding-link'>
				<?php echo file_get_contents('assets/svg/ux/arrow-down.svg'); ?>
			</a>

		</div>

	</div>
</section>

<section id='about'>
	<div class='wrapper'>

		<div class='image-slider'>

			<p>
				Until our new website is ready, <br />
				<a href='#' target='_blank'>download our portfolio here.</a>
			</p>

			<div class='images'>

				<div class='image' style='opacity: 1'>
					<img src='assets/img/01.jpg' alt='Image 01' class='cover'>
				</div>

				<div class='image'>
					<img src='assets/img/02.jpg' alt='Image 02' class='cover'>
				</div>

				<div class='image'>
					<img src='assets/img/03.jpg' alt='Image 03' class='cover'>
				</div>

				<div class='image'>
					<img src='assets/img/04.jpg' alt='Image 04' class='cover'>
				</div>

				<div class='image'>
					<img src='assets/img/05.jpg' alt='Image 05' class='cover'>
				</div>

			</div>

		</div>

	</div>
</section>

<?php include('components/footer.php');?>