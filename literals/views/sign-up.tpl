{{html-header}}

<section class="small-container">
	<h2>
		Create new account
	</h2>
	<form method="POST">

		<label for="e">
			E-Mail:
		</label>
		<input placeholder="Type your e-mail address here…" type="email" name="email" id="e" required autofocus>

		<label for="p">
			Password:
		</label>
		<input placeholder="The password for your account" type="password" name="password" id="p" minlength="6" required>

		<input type="hidden" name="a" value="s" />

 		<footer>
			<button type="submit">
				Create new account
			</button>
			<span>
				or
				<a href="/sign-in/">
					sign in to account
				</a>
			</span>
		</footer>
	</form>
</section>

{{html-footer}}