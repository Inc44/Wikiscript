function getLanguageCode(text) {
	if (/[ґєії]/i.test(text)) return "uk";
	if (/[а-яё]/i.test(text)) return "ru";
	if (/[àâçéèêëîïôûùüÿœæ]/i.test(text)) return "fr";
	return "en";
}
const dropZone = document.getElementById("dropZone");
const topicList = document.getElementById("topicList");
const addButton = document.getElementById("addButton");
function resetIdleAddButtonState() {
	addButton.className = "";
	addButton.disabled = false;
	addButton.textContent = "Add to History";
}
function handleFile(file) {
	if (file && (file.name.endsWith(".txt") || file.name.endsWith(".md"))) {
		const reader = new FileReader();
		reader.onload = (progressEvent) => {
			topicList.value = progressEvent.target.result;
		};
		reader.readAsText(file);
		return true;
	}
	addButton.className = "error";
	addButton.textContent = "Invalid File";
	setTimeout(resetIdleAddButtonState, 4000);
	return false;
}
function addUrlsToHistory() {
	const text = topicList.value;
	let added = 0;
	addButton.className = "processing";
	addButton.disabled = true;
	addButton.textContent = "Processing...";
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
	addButton.className = "done";
	addButton.textContent = `Added ${added} topics.`;
	setTimeout(resetIdleAddButtonState, 4000);
}
addButton.addEventListener("click", addUrlsToHistory);
dropZone.addEventListener("dragover", (dragEvent) => {
	dragEvent.preventDefault();
	dropZone.classList.add("drag-over");
});
dropZone.addEventListener("dragleave", (dragEvent) => {
	dragEvent.preventDefault();
	dropZone.classList.remove("drag-over");
});
dropZone.addEventListener("drop", (dragEvent) => {
	dragEvent.preventDefault();
	dropZone.classList.remove("drag-over");
	if (dragEvent.dataTransfer.files.length > 0) {
		handleFile(dragEvent.dataTransfer.files[0]);
	}
});
topicList.addEventListener("paste", (clipboardEvent) => {
	if (clipboardEvent.clipboardData.files.length > 0) {
		clipboardEvent.preventDefault();
		handleFile(clipboardEvent.clipboardData.files[0]);
	}
});
