import { Editor, Plugin } from 'obsidian';
import { marked } from 'marked';
import makeSlug from "./utils/makeSlug"

// Remember to rename these classes and interfaces!

export default class MyPlugin extends Plugin {
	async onload() {

		this.addCommand({
			"id": "obsidian-html-converter",
			"name": "Martin's HTML Converter",
			editorCallback: (editor: any) => this.markdownToHTML(editor)
		})
	}
	
	markdownToHTML(editor: Editor) {
		const prepended_url = 'https://salesflowcoach.app/vault/';
		const yamlRegex = /^---[\r\n]+([\s\S]*)[\r\n]+---[\r\n]+/;
		const wikilink_pattern = /\[\[(.*)\]\]/g;

		const selectedMarkdown = editor.getSelection();
		const cleanSelection = selectedMarkdown.replace(yamlRegex, ''); // This is if yaml/fm is also selected
		const convertedHTML = marked(cleanSelection).replace(wikilink_pattern, (_, p1) => {
			return `<a href="${prepended_url}${makeSlug(p1)}">${p1}</a>`; // Simulate GG's way of creating slugs
		});

		const styles = `
			<style type="text/css">
				@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Roboto&display=swap');
				body {
					font-family: 'Roboto', sans-serif;
				}
				h1, h2, h3 {
					font-family: 'Playfair Display', serif;
					font-weight: 600;
				}
				h1, a {
					color: #405aac;
				}
				h2, h3 {
					color: #54595F;
				}
				h1 {
					font-size: 2.074rem;
				}
				h2 {
					font-size: 1.728rem;
				}
				h3 {
					font-size: 1.44rem;
				}
				a {
				    text-decoration: none;
				}
			</style>
		`

		const html = `
			<html>
				<head>
					${styles}
				</head>
				<body>
					${convertedHTML}
				</body>
			</html>
		`;

		const blob = new Blob([html], {
			//@ts-ignore
			type: ["text/plain", "text/html"]
		});

		const data = [new ClipboardItem({
			["text/plain"]: blob,
			["text/html"]: blob
		})];

		navigator.clipboard.write(data);
	}

	onunload() {

	}
}