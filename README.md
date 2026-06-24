# Harmonica Tabs for Obsidian

Renders harmonica tablature directly in your notes. Blow notes appear in **blue**, draw notes in **red**.

## Usage

Create a `harp` code block anywhere in a note:

````markdown
```harp
+4 -4 +5 +4 -3 +2 -2 +1
```
````

### Note syntax

| Notation | Meaning |
|----------|---------|
| `+4` | Blow hole 4 |
| `-4` | Draw hole 4 |
| `+45` | Blow holes 4 and 5 (chord) |
| `-45` | Draw holes 4 and 5 (chord) |

### Section labels

Any line inside the block that doesn't contain note tokens is treated as a label:

````markdown
```harp
Verse
+4 -4 +5 +4 -3

Chorus
+6 +6 -6 +5 -5 +4
```
````

### Multiple lines

Split long passages across lines to make them easier to follow:

````markdown
```harp
+56 -56 -56 +56 -45 -45 +56 +56
+56 -45 +45 +56 -56 -56 +56 -45
```
````

## Installation

### From Community Plugins

Search for **Harmonica Tabs** in Settings → Community Plugins.

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release
2. Copy them into `.obsidian/plugins/harmonica-tabs/` in your vault
3. Enable the plugin in Settings → Community Plugins
