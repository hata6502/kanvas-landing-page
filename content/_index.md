---
title: kanvas
description: Minimal sketching canvas.
---

<style>
  .intro {
    transform: unset;
  }

  .navbar-fixed-bottom, .navbar-fixed-top {
    position: absolute;
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

  #tango-gacha-slot {
    height: 320px;
    margin-bottom: 32px;
    margin-top: 32px;
    width: 100%;
  }
</style>

&nbsp;

<div id="action-container">
  <span>We recommend to install the application for drawing on Smartphone.</span>
  <button id="open-kanvas-button">Open kanvas</button>

<a
  href="https://twitter.com/intent/tweet?button_hashtag=kanvas&ref_src=twsrc%5Etfw"
  class="twitter-hashtag-button"
  data-show-count="false">
Tweet #kanvas
</a>

</div>

<iframe id="tango-gacha-slot" src="https://tango-gacha.com/slot/"></iframe>

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
  import "./kanvas-dialog.js";

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

<script type="module">
  import { injectByTextQuote } from "./text-quote-injection.js";

  const injectionConfigs = [
    {
      selector: {
        type: 'TextQuoteSelector',
        exact: 'We recommend to install the application for drawing on Smartphone.',
      },
      href: "https://helpfeel.com/hata6502/kanvas%20%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B-61818b0489e586002278f64c",
    },
  ];

  injectByTextQuote(
    injectionConfigs.map(({ selector, href }) => ({
      selector,
      inject: (range) => {
        const linkElement = document.createElement("a");

        linkElement.href = href;
        linkElement.rel = "noopener";
        linkElement.target = "_blank";
        linkElement.style.textDecoration = "none";

        linkElement.innerHTML = `
          <img
           src="https://i.gyazo.com/8737dd05a68d04d808dfdb81c6783be1.png"
           style="opacity: 0.5; vertical-align: text-bottom; width: 18px; "
          />
        `;

        range.collapse();
        range.insertNode(linkElement);

        return linkElement;
      },
      cleanUp: (linkElement) => linkElement.remove(),
    }))
  );
</script>
