---
title: premy - A drawing app for anyone.
---

<script type="module">
  import "https://cdn.jsdelivr.net/npm/premy@8.18.2";
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

  #examples-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>

&nbsp;

<div id="action-container">
  <button id="open-premy-button">Open premy</button>

<a href="https://twitter.com/premy_draw?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @premy_draw</a>

</div>

<div id="examples-container"></div>

---

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

<script type="module">
  import examples from "./examples.json" assert { type: "json" };

  const links =
    [...examples.relatedPages.links1hop]
    .sort(() => Math.random() - 0.5);
  const examplesContainerElement = document.querySelector("#examples-container");

  for (const { title, image } of links) {
    const linkElement = document.createElement("a");
    linkElement.href = `https://scrapbox.io/hata6502/${encodeURIComponent(title)}`;
    linkElement.target = "_blank";
    linkElement.style.borderBottom = "1px solid #337ab7";

    const imageElement = document.createElement("img");
    imageElement.alt = title;
    imageElement.src = image;
    imageElement.loading = "lazy";
    imageElement.style.width = "224px";

    linkElement.append(imageElement);
    examplesContainerElement.append(linkElement);
  }
</script>
