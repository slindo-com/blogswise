{{html-header}}

<form method="POST">
	<header class="article-header">
		<div class="left-wrapper">
			<button name="a" value="sav" type="submit" class="btn">
				Save Article
			</button>
			or
			<a href="/articles/">
				back without saving
			</a>
		</div>

		<div class="right-wrapper">
			<button name="a" value="pub" type="submit" class="publish ${d.article.published ? 'published' : ''}">
				<span></span>
				Publish${d.article.published ? 'ed' : ''}
			</button>
			<button name="a" value="pre" type="submit" class="btn">
				Preview
			</button>
		</div>
	</header>

	<div class="title-wrapper">
		<input name="title" type="text" placeholder="Title for the article" class="article-title" value="${d.article.title ? d.article.title : ''}" ${!d.titleSet ? 'autofocus': ''}>
	</div>


	<textarea name="text" class="article-textarea" placeholder="Type here…" ${d.titleSet ? 'autofocus': ''}>${d.article.text ? d.article.text : ''}</textarea>
</form>



{{html-footer}}


