<!DOCTYPE html>
<html lang="LANG">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<title>
			${title}
		</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" type="text/css" href="STYLE.CSS" />
		
		<meta name="description" content="${description}" />
		<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
		<link rel="canonical" href="https://slingo.blogswise.com/" />
		<meta name="generator" content="Blogswise 1.0" />

		<meta name="referrer" content="no-referrer" />

		<meta property="og:site_name" content="${title}" />
		<meta property="og:type" content="website" />
		<meta property="og:title" content="${title}" />
		<meta property="og:description" content="${description}" />
		<meta property="og:url" content="https://slingo.blogswise.com/" />
		<meta property="og:image" content="IMAGE" />
		<meta property="og:image:width" content="IMAGE_WIDTH" />
		<meta property="og:image:height" content="IMAGE_HEIGHT" />

		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="${title}" />
		<meta name="twitter:description" content="${description}" />
		<meta name="twitter:url" content="https://slingo.blogswise.com/" />
		<meta name="twitter:image" content="IMAGE" />

		<script type="application/ld+json">
			{
				"@context": "https://schema.org",
				"@type": "WebSite",
				"publisher": {
					"@type": "Organization",
					"name": "${title}",
					"logo": "IMAGE"
				},
				"url": "https://slingo.blogswise.com/",
				"image": {
					"@type": "ImageObject",
					"url": "IMAGE",
					"width": IMAGE_WIDTH,
					"height": IMAGE_HEIGHT
				},
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": "https://slingo.blogswise.com/"
				},
				"description": "${description}"
			}
		</script>

		<link rel="alternate" type="application/rss+xml" title="${title}" href="https://slingo.blogswise.com/rss/" />
	</head>
	<body>


		<header>
			<nav>
				<ul>
					<li>
						<a href="#" title="">
							LINK
						</a>
					</li>
				</ul>
			</nav>
		</header>


		<main>

			${articlesRendered.map(article => `
				<article>
				   <header>
					   <h2>
						   ${article.title}
					   </h2>
				   </header>
				   <section>
					   <p>
						   ${article.text}
					   </p>
				   </section>
				   <footer>
						<time datetime="2020-03-22">
							22 Mar 2020
						</time>
				   </footer>
				</article>
			`).join('')}

		</main>


		<footer>
			<nav>
				<ul>
					<li>
						<a href="#" title="">
							LINK
						</a>
					</li>
				</ul>
			</nav>
		</footer>


	</body>
</html>
