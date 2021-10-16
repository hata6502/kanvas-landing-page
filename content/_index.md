---
title: kanvas
description: Minimal sketching canvas.
---

<style>
  .intro {
    transform: unset;
  }

  #action-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
  }

  #open-kanvas-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 4px;
    font-size: x-large;
  }
</style>

&nbsp;

<div id="action-container">
  <button id="open-kanvas-button">Open kanvas</button>

<a
  href="https://twitter.com/intent/tweet?button_hashtag=kanvas&ref_src=twsrc%5Etfw"
  class="twitter-hashtag-button"
  data-show-count="false">
Tweet #kanvas
</a>

</div>

<a
  class="twitter-timeline"
  data-width="700"
  data-theme="light"
  href="https://twitter.com/kanvas_bh?ref_src=twsrc%5Etfw">
Tweets by kanvas_bh
</a>

<kanvas-dialog id="dialog"></kanvas-dialog>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<script type="module">
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("./serviceWorker.js");
  }
</script>

<script type="module">
  import "https://cdn.jsdelivr.net/npm/kanvas-dialog@latest";

  const dialog = document.querySelector("#dialog");
  const openKanvasButton = document.querySelector("#open-kanvas-button");

  const image = localStorage.getItem("kanvas-image");

  if (image) {
    dialog.setAttribute("src", image);
  }

  dialog.addEventListener("kanvasClose",
    (event) => dialog.removeAttribute("open")
  );

  dialog.addEventListener("kanvasHistoryChange", (event) =>
    localStorage.setItem(
      "kanvas-image",
      event.detail.history[event.detail.historyIndex]
    )
  );

  openKanvasButton.addEventListener("click",
    (event) => dialog.setAttribute("open", "")
  );
</script>
