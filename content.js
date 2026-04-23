chrome.storage.sync.get(
{
	hideLinks: "none"
}, (prefs) =>
{
	if (prefs.hideLinks === "none") return;
	let visitedLinks = null;
	if (prefs.hideLinks === "history")
	{
		chrome.runtime.sendMessage('get-history', (response) =>
		{
			visitedLinks = new Set(response?.links || []);
			hideLinks();
		});
	}

	function isArticleLink(a)
	{
		if (a.querySelector("img")) return false;
		if (!a.pathname.startsWith("/wiki/")) return false;
		if (a.pathname.includes(":")) return false;
		if (a.pathname === window.location.pathname) return false;
		return true;
	}

	function hideLinks()
	{
		const content = document.getElementById("mw-content-text");
		if (!content) return;
		const links = Array.from(content.querySelectorAll("a:not([data-hidden])"))
			.filter(isArticleLink);
		if (links.length === 0) return;
		links.forEach(a =>
		{
			if (prefs.hideLinks === "all")
			{
				a.dataset.hidden = "true";
				a.replaceWith(...a.childNodes);
			}
			else if (prefs.hideLinks === "history" && visitedLinks)
			{
				a.dataset.hidden = "true";
				const linkPath = (a.hostname + a.pathname.replace(/\/$/, ""))
					.toLowerCase();
				if (visitedLinks.has(linkPath))
				{
					a.replaceWith(...a.childNodes);
				}
			}
		});
	}
	const observer = new MutationObserver(hideLinks);
	observer.observe(document.documentElement,
	{
		childList: true,
		subtree: true
	});
});