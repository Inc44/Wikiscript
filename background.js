chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
{
	if (message === "get-history")
	{
		chrome.history.search(
		{
			maxResults: 999999,
			startTime: 0,
			text: ".wikipedia.org/wiki/"
		}, (results) =>
		{
			const links = [];
			for (const link of results)
			{
				if (!link.url) continue;
				const a = new URL(link.url);
				if (!a.pathname.includes(":"))
				{
					const linkPath = (a.hostname + a.pathname.replace(/\/$/, ""))
						.toLowerCase();
					links.push(linkPath);
				}
			}
			sendResponse(
			{
				links
			});
		});
		return true;
	}
});