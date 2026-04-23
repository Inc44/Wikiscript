const hideLinks = document.getElementById("hideLinks");

function save()
{
	chrome.storage.sync.set(
	{
		hideLinks: hideLinks.value
	});
}

function load()
{
	chrome.storage.sync.get(
	{
		hideLinks: "none"
	}, (prefs) =>
	{
		hideLinks.value = prefs.hideLinks;
	});
}
hideLinks.addEventListener("change", save);
document.addEventListener("DOMContentLoaded", load);