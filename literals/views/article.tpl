{{html-header}}

<form method="POST">
	{{article-nav}}

	<div class="title-wrapper">
		<input name="title" type="text" placeholder="Title for the article" class="article-title" value="${d.article.title ? d.article.title : ''}" ${!d.titleSet ? 'autofocus': ''}>
	</div>


	<textarea name="text" class="article-textarea" placeholder="Type here…" ${d.titleSet ? 'autofocus': ''}>${d.article.text ? d.article.text : ''}</textarea>
</form>



{{html-footer}}


