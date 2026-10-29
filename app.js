/* Workit marketplace demo
 * All profiles, ratings, prices and availability below are invented examples.
 * No real requests or personal data are transmitted or saved.
 */
(function () {
  "use strict";

  var pros = [
    {
      id: "aqua", name: "Aqua & Co", category: "Loodgieter", town: "Leuven", distance: "2,4",
      rating: 4.9, reviews: 128, jobs: 214, price: 55, days: 1, available: "Morgen beschikbaar",
      verified: true, years: 12, tags: ["Sanitair", "Lekdetectie", "Herstellingen"],
      description: "Van een kleine herstelling tot een volledige badkamerrenovatie. Duidelijke afspraken en proper werk.",
      art: "art-blue", symbol: "◉",
      photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80&fit=crop"
    },
    {
      id: "klus", name: "Klusclub K", category: "Klusjesman", town: "Kessel-Lo", distance: "3,1",
      rating: 4.8, reviews: 93, jobs: 168, price: 42, days: 0, available: "Vandaag nog plek",
      verified: true, years: 7, tags: ["Montage", "Kleine klussen", "Herstellingen"],
      description: "Die kast ophangen, dat rek monteren of die kleine klus die al maanden blijft liggen? Komt goed.",
      art: "art-orange", symbol: "⚒",
      photo: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=700&q=80&fit=crop"
    },
    {
      id: "steen", name: "Steen & Stijl", category: "Aannemer", town: "Herent", distance: "5,8",
      rating: 4.9, reviews: 67, jobs: 97, price: 62, days: 5, available: "Deze week tijd",
      verified: true, years: 16, tags: ["Renovatie", "Ruwbouw", "Totaalprojecten"],
      description: "Een verbouwing op de planning? Van eerste idee tot laatste afwerking, met één aanspreekpunt.",
      art: "art-purple", symbol: "⌂",
      photo: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80&fit=crop"
    },
    {
      id: "vonk", name: "Vonk Atelier", category: "Elektricien", town: "Leuven", distance: "1,8",
      rating: 4.7, reviews: 81, jobs: 132, price: 49, days: 2, available: "Binnen 2 dagen plek",
      verified: true, years: 10, tags: ["Elektriciteit", "Verlichting", "Keuring"],
      description: "Slimme oplossingen voor elektrische installaties, verlichting en praktische vernieuwingen.",
      art: "art-green", symbol: "ϟ",
      photo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=80&fit=crop"
    },
    {
      id: "kleur", name: "Kleur & Karakter", category: "Schilder", town: "Bertem", distance: "7,2",
      rating: 4.8, reviews: 56, jobs: 85, price: 44, days: 1, available: "Morgen beschikbaar",
      verified: false, years: 8, tags: ["Binnenschilderwerk", "Gevel", "Afwerking"],
      description: "Frisse muren en fijne details. Van een enkele kamer tot een hele woning in een nieuw jasje.",
      art: "art-pink", symbol: "◐",
      photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80&fit=crop"
    },
    {
      id: "fix", name: "Fix & Flow", category: "Loodgieter", town: "Heverlee", distance: "3,6",
      rating: 4.6, reviews: 42, jobs: 74, price: 52, days: 6, available: "Deze week tijd",
      verified: false, years: 5, tags: ["Kranen", "Leidingen", "Onderhoud"],
      description: "Behulpzame allround loodgieter voor kleine en middelgrote opdrachten rond Leuven.",
      art: "art-teal", symbol: "◉",
      photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&fit=crop"
    }
  ];

  var state = {
    category: "all",
    location: "Leuven",
    when: "all",
    verified: false,
    rating: false,
    maxPrice: 90,
    sort: "match",
    savedOnly: false,
    saved: new Set()
  };

  function el(id) { return document.getElementById(id); }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  function tinyPin() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  }
  function heartIcon() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
  }
  function verifiedIcon() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m7.5 12 3 3 6-6"/></svg>';
  }
  function matchesLocation(p, query) {
    var q = query.trim().toLocaleLowerCase("nl-BE");
    if (!q || q === "leuven" || q === "3000") return true;
    return p.town.toLocaleLowerCase("nl-BE").includes(q) ||
      (q === "3010" && p.town === "Kessel-Lo") ||
      (q === "3001" && p.town === "Heverlee") ||
      (q === "3020" && p.town === "Herent") ||
      (q === "3060" && p.town === "Bertem");
  }
  function filteredPros() {
    var list = pros.filter(function (p) {
      if (state.category !== "all" && p.category !== state.category) return false;
      if (!matchesLocation(p, state.location)) return false;
      if (state.when === "soon" && p.days > 1) return false;
      if (state.when === "week" && p.days > 7) return false;
      if (state.verified && !p.verified) return false;
      if (state.rating && p.rating < 4.8) return false;
      if (p.price > state.maxPrice) return false;
      if (state.savedOnly && !state.saved.has(p.id)) return false;
      return true;
    });
    if (state.sort === "rating") list.sort(function (a, b) { return b.rating - a.rating || b.reviews - a.reviews; });
    if (state.sort === "price") list.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === "jobs") list.sort(function (a, b) { return b.jobs - a.jobs; });
    return list;
  }
  function renderCard(p) {
    var isSaved = state.saved.has(p.id);
    var tags = p.tags.map(function (tag) { return "<span>" + escapeHTML(tag) + "</span>"; }).join("");
    var photo = p.photo
      ? '<img loading="lazy" src="' + escapeHTML(p.photo) + '" alt="Illustratief sfeerbeeld bij ' + escapeHTML(p.category.toLowerCase()) + '" onerror="this.style.display=\'none\'">'
      : "";
    return '<article class="pro-card">' +
      '<div class="pro-image ' + escapeHTML(p.art) + '">' +
        '<span class="photo-symbol" aria-hidden="true">' + escapeHTML(p.symbol) + '</span>' +
        photo + '<span class="image-count">Sfeerbeeld</span>' +
      '</div>' +
      '<div class="pro-details">' +
        '<div class="pro-topline"><span class="cat-dot"></span>' + escapeHTML(p.category.toUpperCase()) + ' <span>·</span> ' + p.jobs + ' klussen afgerond</div>' +
        '<h3>' + escapeHTML(p.name) + '</h3>' +
        '<div class="pro-location">' + tinyPin() + '<span>' + escapeHTML(p.town) + ' · ' + escapeHTML(p.distance) + ' km van centrum Leuven</span></div>' +
        '<p class="pro-description">' + escapeHTML(p.description) + '</p>' +
        '<div class="pro-tags">' + tags + '</div>' +
        '<div class="pro-bottom">' +
          (p.verified ? '<span class="verify">' + verifiedIcon() + ' Geverifieerd profiel</span>' : '') +
          '<span class="years-tag">' + p.years + ' jaar ervaring</span>' +
        '</div>' +
      '</div>' +
      '<div class="pro-action">' +
        '<button type="button" class="heart ' + (isSaved ? 'active' : '') + '" data-save="' + p.id + '" aria-label="' + (isSaved ? 'Verwijder ' : 'Bewaar ') + escapeHTML(p.name) + '" aria-pressed="' + isSaved + '">' + heartIcon() + '</button>' +
        '<div class="rating-line"><strong>' + (p.rating >= 4.8 ? "Uitstekend" : "Heel goed") + '</strong><span class="rating-box">' + p.rating.toFixed(1).replace(".", ",") + '</span></div>' +
        '<div class="reviews">' + p.reviews + ' beoordelingen</div>' +
        '<div class="price-caption">Richtprijs vanaf</div>' +
        '<div class="price">€ ' + p.price + ' <span>/ uur</span></div>' +
        '<div class="availability">' + escapeHTML(p.available) + '</div>' +
        '<button type="button" class="quote-btn" data-quote="' + p.id + '">Vraag offerte aan ↗</button>' +
      '</div></article>';
  }
  function render() {
    var matching = filteredPros();
    el("resultsList").innerHTML = matching.map(renderCard).join("");
    el("emptyState").hidden = matching.length !== 0;
    el("resultsCount").textContent = matching.length;
    el("countSummary").textContent = matching.length + (matching.length === 1 ? " profiel" : " profielen");
    el("resultsPlace").textContent = state.location.trim() || "Leuven";
    el("savedCount").textContent = String(state.saved.size);
    el("savedButton").setAttribute("aria-pressed", state.savedOnly ? "true" : "false");
    el("savedButton").title = state.savedOnly ? "Toon alle profielen" : "Toon bewaarde profielen";
    el("savedButton").style.color = state.savedOnly ? "#c5e78c" : "";
    el("priceValue").textContent = String(state.maxPrice);
    el("serviceSelect").value = state.category;
    el("whenSelect").value = state.when;
    el("verifiedFilter").checked = state.verified;
    el("ratingFilter").checked = state.rating;
    el("priceFilter").value = String(state.maxPrice);
    el("sortSelect").value = state.sort;
    document.querySelectorAll('input[name="filterCategory"]').forEach(function (input) {
      input.checked = input.value === state.category;
    });
    document.querySelectorAll(".category-tile").forEach(function (button) {
      button.classList.toggle("active", button.dataset.category === state.category);
      button.setAttribute("aria-pressed", String(button.dataset.category === state.category));
    });
    el("resultsList").querySelectorAll("[data-save]").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.getAttribute("data-save");
        if (state.saved.has(id)) state.saved.delete(id);
        else state.saved.add(id);
        render();
      });
    });
    el("resultsList").querySelectorAll("[data-quote]").forEach(function (button) {
      button.addEventListener("click", function () {
        var pro = pros.find(function (p) { return p.id === button.getAttribute("data-quote"); });
        if (!pro) return;
        el("selectedPro").textContent = pro.name;
        el("quoteLocation").value = state.location || "Leuven";
        el("quoteForm").reset();
        el("quoteLocation").value = state.location || "Leuven";
        el("quoteModal").showModal();
      });
    });
  }
  function resetFilters() {
    state.category = "all"; state.location = "Leuven"; state.when = "all";
    state.verified = false; state.rating = false; state.maxPrice = 90;
    state.sort = "match"; state.savedOnly = false;
    el("locationInput").value = "Leuven";
    render();
  }
  el("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();
    state.category = el("serviceSelect").value;
    state.location = el("locationInput").value.trim() || "Leuven";
    state.when = el("whenSelect").value;
    state.savedOnly = false;
    render();
    el("ontdek").scrollIntoView({behavior: "smooth", block: "start"});
  });
  document.querySelectorAll(".category-tile").forEach(function (button) {
    button.addEventListener("click", function () {
      state.category = button.dataset.category;
      state.savedOnly = false;
      render();
      el("ontdek").scrollIntoView({behavior: "smooth", block: "start"});
    });
  });
  document.querySelectorAll('input[name="filterCategory"]').forEach(function (input) {
    input.addEventListener("change", function () { state.category = input.value; state.savedOnly = false; render(); });
  });
  el("verifiedFilter").addEventListener("change", function (e) { state.verified = e.target.checked; render(); });
  el("ratingFilter").addEventListener("change", function (e) { state.rating = e.target.checked; render(); });
  el("priceFilter").addEventListener("input", function (e) { state.maxPrice = Number(e.target.value); render(); });
  el("sortSelect").addEventListener("change", function (e) { state.sort = e.target.value; render(); });
  el("clearFilters").addEventListener("click", resetFilters);
  el("emptyReset").addEventListener("click", resetFilters);
  el("savedButton").addEventListener("click", function () {
    if (!state.saved.size && !state.savedOnly) { showToast("Bewaar eerst een vakman met het hartje."); return; }
    state.savedOnly = !state.savedOnly;
    render();
    el("ontdek").scrollIntoView({behavior: "smooth", block: "start"});
  });
  el("mapToggle").addEventListener("click", function () {
    el("mapPanel").hidden = !el("mapPanel").hidden;
    if (!el("mapPanel").hidden) el("mapPanel").scrollIntoView({behavior: "smooth", block: "nearest"});
  });
  el("closeMap").addEventListener("click", function () { el("mapPanel").hidden = true; });
  document.querySelector(".language-btn").addEventListener("click", function () {
    showToast("Deze mockup is voorlopig alleen beschikbaar in het Nederlands.");
  });
  document.querySelector(".filters-head").addEventListener("click", function (e) {
    if (e.target.closest("button")) return;
    if (window.matchMedia("(max-width: 650px)").matches) document.querySelector(".filters").classList.toggle("mobile-open");
  });
  document.querySelectorAll("[data-close-modal]").forEach(function (button) {
    button.addEventListener("click", function () { el(button.dataset.closeModal).close(); });
  });
  document.querySelectorAll("dialog").forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  });
  el("quoteForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!el("quoteForm").reportValidity()) return;
    el("quoteModal").close();
    el("quoteForm").reset();
    el("successModal").showModal();
  });
  function showToast(message) {
    var toast = document.querySelector(".demo-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "demo-toast";
      toast.style.cssText = "position:fixed;bottom:22px;left:50%;transform:translateX(-50%);z-index:100;background:#123668;color:white;border-radius:9px;padding:13px 18px;box-shadow:0 10px 36px #0003;font-size:13px;font-weight:700;max-width:calc(100% - 40px);text-align:center;";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(function () { toast.remove(); }, 2800);
  }
  render();
})();
