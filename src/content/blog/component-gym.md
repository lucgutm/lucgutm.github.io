---
title: "Component Gym — Internal Reference Post"
description: "Internal reference demonstrating every markdown block supported by this blog. draft: true — never published to production."
pubDate: 2025-01-01
tags: ["REFERENCE", "INTERNAL"]
draft: true
---

This is the **component gym**: an internal reference post that shows every
block the blog supports. It lives in the source code and is visible with
`pnpm dev`, but `draft: true` keeps it out of production — it never appears
in the post list and its URL returns 404 after `astro build`.

## Headings

Use `##` and `###` inside the body. The `h1` is reserved for the title.

### Heading 3

#### Heading 4

## Inline text

You can use **bold**, *italic*, ***both***, inline code like `const x = 42`,
and links like [Astro's docs](https://docs.astro.build). Remember: keep a
single `h1` per post.

## Lists

Unordered list:

- first item
- second item
  - nested item
- third item

Ordered list:

1. install
2. build
3. deploy

Task list (GFM):

- [x] write the post
- [ ] publish it
- [ ] share it

## Callout / note

> Use a blockquote for a technical note or rule of thumb. It renders as a
> callout with a cyan accent border.

## Code

Fenced code blocks get syntax highlighting (shiki) and a **Copy** button:

```rust
fn main() {
    let msg = "hello from the gym";
    println!("{msg}");
}
```

```js
const posts = await getCollection('blog');
const published = posts.filter((p) => !p.data.draft);
```

Inline code inside prose: use `String.prototype.trim()` sparingly.

## Table

| Feature | Status | Notes |
| --- | --- | --- |
| Headings | ✅ | `##` / `###` / `####` |
| Lists | ✅ | ul, ol, task lists |
| Callout | ✅ | blockquote |
| Code + copy | ✅ | shiki + button |

## Horizontal rule

---

## Frontmatter checklist

When writing a real post, verify:

- [ ] `description` is unique and ≤160 characters
- [ ] `tags` in uppercase
- [ ] `pubDate` in `YYYY-MM-DD`
- [ ] only one `h1` (the title)
- [ ] at least one useful external link
