{{html-header}}



<section class="small-container">
	<h2>
		Sign In
	</h2>

	${d.err ? `<p class="err">${d.err}</p>` : ``}

	<form method="POST">

		<label for="e">
			E-Mail:
		</label>
		<input placeholder="Type here…" type="email" name="email" id="e" required autofocus>

		<label for="p">
			Password:
		</label>
		<input placeholder="The password for your account" type="password" name="password" id="p" minlength="6" required>

		<input type="hidden" name="a" value="s">

		<footer>
			<button type="submit">
				Sign In
			</button>
			<span>
				or
				<a href="/sign-up/">
					create a new account
				</a>
			</span>
		</footer>

	</form>
</section>



{{html-footer}}


