<header class="article-header">
	<div class="left-wrapper">
		<a href="/articles/">
			Back to articles
		</a>
		${d.isEditor ? `
			<button name="a" value="sav" type="submit" class="btn">
				Save
			</button>
		` : ``}
	</div>

	<div class="right-wrapper">
		<button name="a" value="pub" type="submit" class="publish ${d.article.published ? 'published' : ''}">
			<span></span>
			Published
		</button>
		<button name="a" value="pre" type="submit" class="btn">
			${d.isEditor ? `Save & Preview` : `Back to Editor`}
		</button>
	</div>
</header>