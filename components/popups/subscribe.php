<div id='subscribe-popup' class='popup'>
	<div class='wrap'>

		<h2 class='text-bigger'>
			<b>
				Stay in the Know
			</b>
		</h2>

		<p class='desc'>
			Get exclusive access to early-bird discounts, exciting updates, and the latest news by subscribing to our newsletter today!
        </p>

		<form action='' autocomplete='off'>

			<?php
				function inputNewsletter() {
					$id = 'popup-newsletter-email';
					$label = 'Email';
					$type = 'email';
					$placeholder = 'email@email.com';
					$name = 'Email';
					$required = true;
					include('components/atoms/input.php');
				}
				inputNewsletter();
			?>

			<!-- uncomment this block and delete the one below that for the correct submit button -->
			<!--?php
				function submitNewsletter() {
					$id = 'submit-popup-newsletter';
					$text = 'Submit';
					include('components/atoms/submit.php');
				}
				submitNewsletter();
			?-->

			<a href='#subscribe-success' data-fancybox class='button black-button text-small' onclick='Fancybox.close();'>
				Submit
				<span class='fx'>
					<span>Submit</span>
					<span>Submit</span>
				</span>
			</a>

		</form>

	</div>
</div>

<div id='subscribe-success' class='popup'>
	<div class='wrap'>

		<h2 class='text-bigger'>
			<b>
				Subscribed
			</b>
		</h2>

		<p class='desc'>
			You're in! Thanks for subscribing to our newsletter. Keep an eye on your inbox for exclusive content and special discounts.
        </p>

		<button class='button black-button text-small' onclick='Fancybox.close();'>
			Close
			<span class='fx'>
				<span>Close</span>
				<span>Close</span>
			</span>
		</button>

	</div>
</div>