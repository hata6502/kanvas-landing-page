---
title: premy - A drawing app for anyone.
---

<script type="module">
  import "https://cdn.jsdelivr.net/npm/premy@8.18.1";
</script>

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

  #open-premy-button {
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
  <span>We recommend to install the application.
    <a
      href="https://helpfeel.com/hata6502/premy%20%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B-61818b0489e586002278f64c"
      rel="noopener"
      target="_blank"
      style="text-decoration: none; "
    >
      <img
        src="https://i.gyazo.com/8737dd05a68d04d808dfdb81c6783be1.png"
        style="opacity: 0.5; vertical-align: text-bottom; width: 18px; "
      />
    </a>
  </span>
  <button id="open-premy-button">Open premy</button>

<a
  href="https://twitter.com/intent/tweet?button_hashtag=premy&ref_src=twsrc%5Etfw"
  class="twitter-hashtag-button"
  data-show-count="false">
Tweet #premy
</a>

</div>

<a
  class="twitter-timeline"
  data-theme="light"
  href="https://twitter.com/premy_draw?ref_src=twsrc%5Etfw">
Tweets by premy_draw
</a>

<premy-dialog id="dialog"></premy-dialog>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<script type="module">
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("./serviceWorker.js");
  }
</script>

<script type="module">
  const dialog = document.querySelector("#dialog");
  const openPremyButton = document.querySelector("#open-premy-button");

  dialog.addEventListener("premyClose",
    (event) => dialog.removeAttribute("open")
  );

  dialog.addEventListener("premyHistoryChange", (event) =>
    localStorage.setItem(
      "premy-image",
      event.detail.history[event.detail.historyIndex]
    )
  );

  openPremyButton.addEventListener("click",
    (event) => {
      const image = localStorage.getItem("premy-image");

      if (image) {
        dialog.setAttribute("src", image);
      } else {
        dialog.removeAttribute("src");
      }

      dialog.setAttribute("open", "");
    }
  );
</script>
