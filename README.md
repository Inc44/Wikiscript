# Wikiscript

Wikiscript is a browser extension for Chromium-based browsers (Microsoft Edge, Google Chrome) that adds Wikipedia articles to your browsing history. This action marks the links as visited, causing them to be styled differently on Wikipedia pages.

## Browser Compatibility

This extension should work on the following browsers:

- Google Chrome
- Microsoft Edge

## Installation

- Download the [latest version](https://github.com/Inc44/Wikiscript/archive/refs/heads/main.zip) and extract it to a folder.
- Enable browser extensions developer mode.
- Drag and drop the extracted folder into `browser://extensions/`.

## Usage

1. Click the Wikiscript icon in the browser toolbar to open the popup.
2. Provide a list of topics using one of the following methods:
	- **Type/Paste Text:** Type or paste a list of topics directly into the text area. Each topic must be on a new line.
	- **Drag and Drop:** Drag a `.txt` or `.md` file from your computer and drop it onto the text area.
	- **Paste File:** Copy a `.txt` or `.md` file from your file explorer and paste it directly into the extension window (`Ctrl+V` or `Cmd+V`).
3. Click the "Add to History" button.
4. The button will change text and color to indicate that it is processing the list. Once complete, it will confirm the number of topics added before resetting.

## Features

- Marks Wikipedia links as visited without requiring you to open them.
- Automatic language detection for English (en), French (fr), Russian (ru), and Ukrainian (uk).
- Multiple input methods: type, paste text, drag and drop a file, or paste a file.
- Supports `.txt` and `.md` file formats for input.
- Ignores empty lines and lines starting with `#` for comments.
- Simple interface with clear visual feedback for processing and completion states.

## TODO

- Use a better language detection method, probably via API, and add more languages.

## License

[![MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/xamituchido)
[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/inc44)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/Inc44)