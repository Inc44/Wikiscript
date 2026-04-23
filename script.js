function getLanguageCode(text)
{
	if (/[ґєії]/i.test(text)) return "uk";
	if (/[а-яё]/i.test(text)) return "ru";
	if (/[àâçéèêëîïôûùüÿœæ]/i.test(text)) return "fr";
	return "en";
}
const dropZone = document.getElementById("dropZone");
const topicList = document.getElementById("topicList");
const addButton = document.getElementById("addButton");
let isShiftPressed = false;

function updateAddButtonText()
{
	if (!addButton.disabled)
	{
		addButton.textContent = isShiftPressed ? "Export History" : "Add to History";
	}
}

function resetIdleAddButtonState()
{
	addButton.className = "";
	addButton.disabled = false;
	updateAddButtonText();
}

function handleFile(file)
{
	if (file && (file.name.endsWith(".txt") || file.name.endsWith(".md")))
	{
		const reader = new FileReader();
		reader.onload = (progressEvent) =>
		{
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

function downloadBlob(blob, fileName)
{
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	link.click();
	URL.revokeObjectURL(url);
}

function downloadTxt(text, fileName)
{
	const blob = new Blob([text],
	{
		type: "text/plain"
	});
	downloadBlob(blob, fileName);
}

function exportUrlsFromHistory()
{
	addButton.className = "processing";
	addButton.disabled = true;
	addButton.textContent = "Exporting...";
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
			if (link.url)
			{
				links.push(link.url);
			}
		}
		downloadTxt(links.join("\n"), "wikipedia.txt");
		addButton.className = "done";
		addButton.textContent = `Exported ${links.length} links.`;
		setTimeout(resetIdleAddButtonState, 4000);
	});
}

function addUrlsToHistory(event)
{
	if (event.shiftKey)
	{
		exportUrlsFromHistory();
		return;
	}
	const text = topicList.value;
	let added = 0;
	addButton.className = "processing";
	addButton.disabled = true;
	addButton.textContent = "Processing...";
	const lines = text.split("\n");
	for (const line of lines)
	{
		const trimmedLine = line.trim();
		if (trimmedLine && !trimmedLine.startsWith("#"))
		{
			const lang = getLanguageCode(trimmedLine);
			const formatted = trimmedLine.replace(/ /g, "_");
			const url = `https://${lang}.wikipedia.org/wiki/${formatted}`;
			chrome.history.addUrl(
			{
				url
			});
			added++;
		}
	}
	addButton.className = "done";
	addButton.textContent = `Added ${added} topics.`;
	setTimeout(resetIdleAddButtonState, 4000);
}
addButton.addEventListener("click", addUrlsToHistory);
document.addEventListener("keydown", (event) =>
{
	if (event.key === "Shift")
	{
		isShiftPressed = true;
		updateAddButtonText();
	}
});
document.addEventListener("keyup", (event) =>
{
	if (event.key === "Shift")
	{
		isShiftPressed = false;
		updateAddButtonText();
	}
});
window.addEventListener("blur", () =>
{
	isShiftPressed = false;
	updateAddButtonText();
});
dropZone.addEventListener("dragover", (dragEvent) =>
{
	dragEvent.preventDefault();
	dropZone.classList.add("drag-over");
});
dropZone.addEventListener("dragleave", (dragEvent) =>
{
	dragEvent.preventDefault();
	dropZone.classList.remove("drag-over");
});
dropZone.addEventListener("drop", (dragEvent) =>
{
	dragEvent.preventDefault();
	dropZone.classList.remove("drag-over");
	if (dragEvent.dataTransfer.files.length > 0)
	{
		handleFile(dragEvent.dataTransfer.files[0]);
	}
});
topicList.addEventListener("paste", (clipboardEvent) =>
{
	if (clipboardEvent.clipboardData.files.length > 0)
	{
		clipboardEvent.preventDefault();
		handleFile(clipboardEvent.clipboardData.files[0]);
	}
});