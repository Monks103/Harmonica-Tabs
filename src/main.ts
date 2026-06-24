import { Plugin } from "obsidian";

const BLOW = "#4fc3f7";
const DRAW = "#ef5350";
const BLOW_RE = /^\+\d+$/;
const DRAW_RE = /^-\d+$/;

export default class HarmonicaTabsPlugin extends Plugin {
	private observer: MutationObserver | null = null;
	private rafId: number | null = null;

	async onload() {
		this.registerMarkdownCodeBlockProcessor("harp", (source, el) => {
			this.renderHarpBlock(source, el);
		});

		this.registerMarkdownPostProcessor((el) => {
			el.querySelectorAll("a").forEach((a) => this.styleLink(a));
		});

		this.observer = new MutationObserver(() => this.scheduleColor());
		this.observer.observe(this.app.workspace.containerEl, {
			childList: true,
			subtree: true,
		});

		this.registerEvent(
			this.app.workspace.on("layout-change", () => this.colorAll())
		);

		setTimeout(() => this.colorAll(), 300);
	}

	private renderHarpBlock(source: string, el: HTMLElement) {
		const container = el.createDiv({ cls: "harp-tab" });

		const legend = container.createDiv({ cls: "harp-legend" });
		legend.createSpan({ cls: "harp-legend-blow", text: "▲ blow" });
		legend.createSpan({ text: "  " });
		legend.createSpan({ cls: "harp-legend-draw", text: "▼ draw" });

		for (const line of source.trim().split("\n")) {
			const trimmed = line.trim();
			if (!trimmed) continue;

			const tokens = trimmed.split(/\s+/);
			const isNoteLine = tokens.some((t) => {
				const clean = t.replace(/^\[|\]$/g, "");
				return BLOW_RE.test(clean) || DRAW_RE.test(clean);
			});

			if (!isNoteLine) {
				container.createDiv({ cls: "harp-label", text: trimmed });
				continue;
			}

			const row = container.createDiv({ cls: "harp-row" });
			for (const token of tokens) {
				const clean = token.replace(/^\[|\]$/g, "");
				if (!clean) continue;
				const span = row.createSpan({ cls: "harp-note", text: clean });
				if (BLOW_RE.test(clean)) span.addClass("harp-blow");
				else if (DRAW_RE.test(clean)) span.addClass("harp-draw");
			}
		}
	}

	private styleLink(a: HTMLAnchorElement) {
		const text = a.textContent ?? "";
		if (BLOW_RE.test(text)) {
			a.style.setProperty("color", BLOW, "important");
			a.style.setProperty("font-weight", "bold", "important");
			a.style.setProperty("text-decoration", "none", "important");
			a.style.setProperty("pointer-events", "none", "important");
		} else if (DRAW_RE.test(text)) {
			a.style.setProperty("color", DRAW, "important");
			a.style.setProperty("font-weight", "bold", "important");
			a.style.setProperty("text-decoration", "none", "important");
			a.style.setProperty("pointer-events", "none", "important");
		}
	}

	private colorAll() {
		document.querySelectorAll(".cm-line .cm-link .cm-underline").forEach((el) => {
			const span = el as HTMLSpanElement;
			const text = span.textContent ?? "";
			if (BLOW_RE.test(text)) {
				span.style.color = BLOW;
				span.style.fontWeight = "bold";
			} else if (DRAW_RE.test(text)) {
				span.style.color = DRAW;
				span.style.fontWeight = "bold";
			}
		});
		document
			.querySelectorAll(
				".markdown-reading-view a.internal-link, .markdown-preview-view a.internal-link"
			)
			.forEach((el) => this.styleLink(el as HTMLAnchorElement));
	}

	private scheduleColor() {
		if (this.rafId !== null) return;
		this.rafId = requestAnimationFrame(() => {
			this.rafId = null;
			this.colorAll();
		});
	}

	onunload() {
		if (this.observer) this.observer.disconnect();
		if (this.rafId !== null) cancelAnimationFrame(this.rafId);
	}
}
