---
title: "PDFs in the Browser: Typst's World Trait, Compiled to WASM"
description: "A vision for editing and sharing study material in the browser: running Typst as a layout engine with Rust, compiled to WASM, with no server in the loop."
pubDate: 2026-08-12
tags: ["RUST", "WASM", "TYPST"]
draft: true
---

PDFs are a print format pretending to be a document format. They are great at
looking identical everywhere and terrible at being edited, re-laid-out, or
re-flowed. In a browser this becomes a hard wall: the document you want to
touch was designed for a page, not for a screen — and certainly not for
being rebuilt on the fly.

This post describes a project I'm working on that moves the whole layout
problem into the browser: **Typst as the layout engine, Rust compiled to
WASM, no server involved**. It is a vision piece — the code is still
barebones — but the architecture is the part I want to explain.

## Why PDFs are hard in the browser

Editing or generating PDFs client-side usually means one of two things:

- **A server does the heavy lifting** (headless Chromium, LibreOffice, a
  PDF library) and the browser just downloads the result. This works, but it
  costs you a server, latency, and — for sensitive material — the privacy of
  sending documents somewhere else.
- **A browser renderer only reads** (like pdf.js): great for viewing, but it
  does not *lay out* anything. You cannot re-typeset a document, adapt it to
  a new page size, or reflow a paragraph from a library of content.

What I wanted was the third option: layout *in the browser*, from raw
content to finished PDF, without a single network round trip.

## The idea: Typst as the engine

Typst is a modern typesetting system: you write plain markup, it produces
beautiful, deterministic PDFs. It is fast, it is written in Rust, and —
crucially for this project — it is designed to run embedded, not just as a
CLI tool.

The bet is simple: compile Typst to WASM, run it in the browser, and suddenly
the browser can turn *markup* into *pages* locally. No server, no uploads,
no waiting. The same architecture that makes a study guide easy to generate
also makes it private.

## The `World` trait: the key to embedding Typst

Typst is, by design, pure computation: given the same inputs, it produces the
same output. But a typesetting engine cannot be fully pure — it needs to read
files, load fonts, and know what time it is. Typst expresses this dependency
as the **`World` trait**: an interface that provides the engine with
everything it needs from its environment.

Implementing `World` is the entire integration. In the browser, that means
answering questions like:

- Where do files come from? (In-memory, not the filesystem.)
- Where do fonts come from? (Loaded at runtime from binary data.)
- What is the current time? (The local clock.)

The interesting part is that the browser has no filesystem — so the `World`
implementation is backed by memory and by a runtime font loader. Fonts are
loaded at runtime through a function exported from Rust, which keeps the
WASM binary lean instead of baking font data into the module.

## The bridge: Rust ↔ WASM ↔ JS

The plumbing uses `wasm-bindgen` and `wasm-pack`, the standard toolchain for
Rust-to-WASM in the browser. The boundary is deliberately small: JavaScript
hands in a source string, and gets back rendered output.

Right now the project exposes two things:

- **Render to PNG** at 2× the container resolution, so text stays crisp on
  high-DPI screens while the layout stays cheap.
- **Export to PDF**, the actual deliverable for sharing material.

Everything is barebones on purpose. The roadmap is two stages: first, a
*reliable in-browser renderer* — this post describes exactly that stage;
second, a *content distribution system* where the value comes from the
content, not the rendering.

## The vision: study guides in seconds

The end goal is educational: a place where users **compose study guides in
seconds**. A student preparing for an exam would pick a subject, pull
questions and answers from a large database, and get a clean, printable PDF —
typeset locally, offline, without uploading anything.

The rendering is the foundation; the distribution of content is the value.
Typst's markup makes the content itself simple to store and combine: a
question bank is just data, and the layout engine turns that data into a
beautiful document on demand.

## Learnings so far

- **WASM size and font loading dominate.** The layout logic is small; the
  fonts are not. Loading fonts at runtime from Rust kept the binary
  reasonable and the startup fast.
- **2× rendering is a good default.** It looks sharp on modern displays and
  is cheap enough that re-rendering on input changes feels instant.
- **The `World` trait is a beautiful abstraction.** It concentrates every
  environment-specific decision in one place, which made the browser port
  tractable — and would make a future server-side port trivial.

The project is experimental, but the architecture is the point: a private,
serverless, browser-native way to go from markup to PDF. For study material,
that combination — privacy, speed, and beautiful output — is the feature.
