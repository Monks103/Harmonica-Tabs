<div align="center">

# 🎵 Harmonica Tabs for Obsidian

<img src="https://img.shields.io/badge/%E2%96%B2%20blow-%234fc3f7?style=flat-square" alt="blow"> <img src="https://img.shields.io/badge/%E2%96%BC%20draw-%23ef5350?style=flat-square" alt="draw"> <img src="https://img.shields.io/badge/%E2%86%93%20bend-%2366bb6a?style=flat-square" alt="bend"> <img src="https://img.shields.io/badge/%2B%5E%20overblow-%23ffa726?style=flat-square" alt="overblow"> <img src="https://img.shields.io/badge/-%5E%20overdraw-%23ce93d8?style=flat-square" alt="overdraw">

[![Version](https://img.shields.io/badge/version-1.1.0-blue?style=flat-square)](manifest.json)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Obsidian](https://img.shields.io/badge/Obsidian-0.15+-7c3aed?style=flat-square)](https://obsidian.md)

**Renders harmonica tablature with color-coded notes directly in your Obsidian vault**

*Built by [MusanaINC](https://github.com/monks103)*

</div>

---

## What it does

Write harmonica tabs in a `harp` code block and the plugin renders each note as a colored badge — blow notes in blue, draw in red, bends in green, overblows in orange, overdraws in purple. No more squinting at plain text tabs.

| Color | Type | Example |
|-------|------|---------|
| 🔵 Blue | Blow | `+4` |
| 🔴 Red | Draw | `-4` |
| 🟢 Green | Bend | `-3'` `-3''` `-3'''` |
| 🟠 Orange | Overblow | `+4^` |
| 🟣 Purple | Overdraw | `-4^` |

---

## Usage

````markdown
```harp
Verse
+4 -4 +5 -5 +6 -6

Chorus
-2 -3' +3 -2 +2 +1
```
````

Plain text lines with no note symbols become section labels. Everything else is rendered as color-coded note badges with a legend at the top.

---

## Notation guide

| Symbol | Meaning |
|--------|---------|
| `+N` | Blow hole N |
| `-N` | Draw hole N |
| `-N'` | Half-step bend |
| `-N''` | Full-step bend |
| `-N'''` | 1.5-step bend |
| `+N^` | Overblow |
| `-N^` | Overdraw |

---

## Installation

### From Community Plugins

Search for **Harmonica Tabs** in Settings → Community Plugins.

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release
2. Copy them into `.obsidian/plugins/harmonica-tabs/` in your vault
3. Enable the plugin in Settings → Community Plugins

---

## Examples

The `examples/` folder has ready-to-use tabs sorted by genre — Blues, Classic, Folk, Irish, and Christmas. Copy any `.md` file into your vault to get started.

---

## License

MIT — © 2026 MusanaINC
