---
title: premy - A drawing app for anyone.
---

<script type="module">
  import "https://cdn.jsdelivr.net/npm/premy@9.0.0";
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

  dialog.addEventListener("premyClose", (event) => {
    dialog.removeAttribute("open")
  });

  openPremyButton.addEventListener("click", (event) => {
    dialog.setAttribute("open", "");
  });

  const premyDBOpenRequest = indexedDB.open("premy", 1);

  premyDBOpenRequest.onsuccess = () => {
    const premyDB = premyDBOpenRequest.result;

    const transaction = premyDB.transaction(["etc"], "readonly");
    const etcStore = transaction.objectStore("etc");
    const historyGetRequest = etcStore.get("history");
    historyGetRequest.onsuccess = () => {
      const history = historyGetRequest.result;
      if (!history) {
        return;
      }
      dialog.setAttribute("history", JSON.stringify(history));
    };

    dialog.addEventListener("premyHistoryChange", (event) => {
      const transaction = premyDB.transaction(["etc"], "readwrite");
      const etcStore = transaction.objectStore("etc");
      etcStore.put(event.detail.history, "history");
    });
  };

  premyDBOpenRequest.onupgradeneeded = (event) => {
    const premyDB = premyDBOpenRequest.result;
    let version = event.oldVersion;

    if (version === 0) {
      const etcStore = premyDB.createObjectStore("etc");
      const image = localStorage.getItem("premy-image");
      if (image) {
        etcStore.put([image], "history");
      }
      localStorage.removeItem("premy-image");

      version++;
    }
  };
</script>

<script type="module">
  const examplesResponse = await fetch("./examples.json");
  if (!examplesResponse.ok) {
    throw new Error("Failed to fetch examples.json");
  }
  const examples = await examplesResponse.json();

  const links =
    [...examples.relatedPages.links1hop]
    .sort(() => Math.random() - 0.5);
  const examplesContainerElement = document.querySelector("#examples-container");

  for (const { title, image } of links) {
    const linkElement = document.createElement("a");
    linkElement.href = `https://scrapbox.io/hata6502/${encodeURIComponent(title)}`;
    linkElement.target = "_blank";

    const imageElement = document.createElement("img");
    imageElement.alt = title;
    imageElement.src = image;
    imageElement.loading = "lazy";
    imageElement.style.width = "224px";
    imageElement.style.borderBottom = "1px solid #337ab7";

    linkElement.append(imageElement);
    examplesContainerElement.append(linkElement);
  }
</script>
