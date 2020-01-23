{{html-header}}

{{main-nav}}

{{sub-nav}}

${d.subview === 'general' ? `
	{{settings-general}}
` : ``}

${d.subview === 'team' ? `
	<div class="container">
		<h3>
			Team
		</h3>
	</div>
` : ``}

${d.subview === 'account' ? `
	{{settings-account}}
` : ``}

{{html-footer}}

