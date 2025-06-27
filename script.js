function getLanguageCode(text) {
	if (/[ґєії]/i.test(text)) {
		return "uk";
	}
	if (/[а-яё]/i.test(text)) {
		return "ru";
	}
	if (/[àâçéèêëîïôûùüÿœæ]/i.test(text)) {
		return "fr";
	}
	return "en";
}
function addUrlsToHistory() {
	const text = document.getElementById("topicList").value;
	const button = document.getElementById("addButton");
	let added = 0;
	button.disabled = true;
	button.textContent = "Processing...";
	button.className = "processing";
	const lines = text.split("\n");
	for (const line of lines) {
		const trimmedLine = line.trim();
		if (trimmedLine && !trimmedLine.startsWith("#")) {
			const lang = getLanguageCode(trimmedLine);
			const formatted = trimmedLine.replace(/ /g, "_");
			const url = `https://${lang}.wikipedia.org/wiki/${formatted}`;
			chrome.history.addUrl({ url });
			added++;
		}
	}
	button.textContent = `Visited ${added} topics.`;
	button.className = "done";
	setTimeout(() => {
		button.disabled = false;
		button.textContent = "Add to History";
		button.className = "";
	}, 4096);
}
document
	.getElementById("addButton")
	.addEventListener("click", addUrlsToHistory);
