{{html-header}}
{{main-nav}}



<header class="header container">
	<h2>
		Articles
	</h2>
	<form method="POST" class="button-wrapper">
		<input type="hidden" name="a" value="s">
		<button class="btn">
			New article
		</button>
	</form>
</header>

${d.articles.length > 0 ? `
	<ul class="entries container">
		${d.articles.map(article => `
			<li>
				<a href="/article/${article.id}/">
					<h4>
						${article.title ? article.title : 'No Title'}
					</h4>
					<small class="published-small">
						${article.published ? 'Published' : 'Draft'}
					</small>
					<small>
						by Ben
					</small>
					
				</a>	
			</li>
		`).join('')}
	</ul>
`:`
	<p class="container">
		No articles available!
	</p>
`}


{{html-footer}}


