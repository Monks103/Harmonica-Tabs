import { Plugin } from "obsidian";

const BLOW_RE      = /^\+\d+$/;
const DRAW_RE      = /^-\d+$/;
const BEND_RE      = /^[+-]\d+'+$/;    // -2'  -3''  +9'
const OVERBLOW_RE  = /^\+\d+\^$/;      // +4^  (overblow — blow hole)
const OVERDRAW_RE  = /^-\d+\^$/;       // -4^  (overdraw — draw hole)

function classify(token: string): string {
	if (OVERBLOW_RE.test(token)) return "overblow";
	if (OVERDRAW_RE.test(token)) return "overdraw";
	if (BEND_RE.test(token))     return "bend";
	if (BLOW_RE.test(token))     return "blow";
	if (DRAW_RE.test(token))     return "draw";
	return "";
}

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
		legend.createSpan({ cls: "harp-legend-blow",     text: "▲ blow" });
		legend.createSpan({ text: "  " });
		legend.createSpan({ cls: "harp-legend-draw",     text: "▼ draw" });
		legend.createSpan({ text: "  " });
		legend.createSpan({ cls: "harp-legend-bend",     text: "↓ bend" });
		legend.createSpan({ text: "  " });
		legend.createSpan({ cls: "harp-legend-overblow", text: "+^ overblow" });
		legend.createSpan({ text: "  " });
		legend.createSpan({ cls: "harp-legend-overdraw", text: "-^ overdraw" });

		for (const line of source.trim().split("\n")) {
			const trimmed = line.trim();
			if (!trimmed) continue;

			const tokens = trimmed.split(/\s+/);
			const isNoteLine = tokens.some((t) => {
				const clean = t.replace(/^\[|\]$/g, "");
				return classify(clean) !== "";
			});

			if (!isNoteLine) {
				container.createDiv({ cls: "harp-label", text: trimmed });
				continue;
			}

			const row = container.createDiv({ cls: "harp-row" });
			for (const token of tokens) {
				const clean = token.replace(/^\[|\]$/g, "");
				if (!clean) continue;
				const type = classify(clean);
				const span = row.createSpan({ cls: "harp-note", text: clean });
				if (type) span.addClass(`harp-${type}`);
			}
		}
	}

	private styleLink(a: HTMLAnchorElement) {
		const text = a.textContent ?? "";
		const type = classify(text);
		const colorMap: Record<string, string> = {
			blow: "#4fc3f7", draw: "#ef5350",
			bend: "#66bb6a", overblow: "#ffa726", overdraw: "#ce93d8",
		};
		const color = colorMap[type] ?? null;
		if (color) {
			a.style.setProperty("color", color, "important");
			a.style.setProperty("font-weight", "bold", "important");
			a.style.setProperty("text-decoration", "none", "important");
			a.style.setProperty("pointer-events", "none", "important");
		}
	}

	private colorAll() {
		const colorMap: Record<string, string> = {
			blow: "#4fc3f7", draw: "#ef5350",
			bend: "#66bb6a", overblow: "#ffa726", overdraw: "#ce93d8",
		};
		document.querySelectorAll(".cm-line .cm-link .cm-underline").forEach((el) => {
			const span = el as HTMLSpanElement;
			const text = span.textContent ?? "";
			const color = colorMap[classify(text)] ?? null;
			if (color) {
				span.style.color = color;
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
