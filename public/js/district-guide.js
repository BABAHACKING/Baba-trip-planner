/* Shared interactive helpers, Google Map & Start My Trip actions, and Double-Click Detail Navigation */
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "home.html";
    }
}

function switchCardImage(cardId, newSrc, thumbBtn) {
    var mainImg = document.getElementById(cardId + "-main-img");
    if (mainImg) {
        mainImg.style.opacity = "0.35";
        mainImg.style.transition = "opacity 0.2s ease";
        setTimeout(function () {
            mainImg.src = newSrc;
            mainImg.style.opacity = "1";
        }, 150);
    }
    if (thumbBtn && thumbBtn.parentElement) {
        var thumbs = thumbBtn.parentElement.querySelectorAll(".place-thumb");
        thumbs.forEach(function (t) {
            t.classList.remove("active");
        });
        thumbBtn.classList.add("active");
    }
}

function detectDistrictCityKey() {
    var path = (window.location.pathname || "").toLowerCase();
    var file = path.split("/").pop() || "";
    if (file.indexOf("mirzapur") !== -1) return "mirzapur";
    if (file.indexOf("sonebhadra") !== -1 || file.indexOf("sonbhadra") !== -1) return "sonebhadra";
    if (file.indexOf("prayagraj") !== -1) return "prayagraj";
    if (file.indexOf("lucknow") !== -1) return "lucknow";
    if (file.indexOf("mathura") !== -1) return "mathura";
    if (file.indexOf("varanasi") !== -1) return "varanasi";
    if (file.indexOf("ayodhya") !== -1) return "ayodhya";
    return "";
}

document.addEventListener("DOMContentLoaded", function () {
    // Enable tap-to-toggle overlay on touch devices where :hover isn't sticky
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) {
        var imageWraps = document.querySelectorAll(".place-card-image");
        imageWraps.forEach(function (wrap) {
            wrap.addEventListener("click", function () {
                wrap.classList.toggle("overlay-visible");
            });
        });
    }

    var cityKey = detectDistrictCityKey();
    if (!cityKey) return;

    var cards = document.querySelectorAll(".place-card");
    cards.forEach(function (card) {
        var cardId = card.id;
        if (!cardId) return;

        var catalogEntry =
            window.PLACES_CATALOG &&
            window.PLACES_CATALOG[cityKey] &&
            window.PLACES_CATALOG[cityKey][cardId];

        var titleEl = card.querySelector(".place-card-title");
        var locEl = card.querySelector(".place-card-location");
        var rawTitle = titleEl ? titleEl.childNodes[0].textContent.trim() : cardId;
        var rawLoc = locEl ? locEl.textContent.trim() : cityKey;

        var placeName = (catalogEntry && catalogEntry.name) || rawTitle;
        var mapUrl =
            typeof window.getGoogleMapsSearchUrl === "function"
                ? window.getGoogleMapsSearchUrl(catalogEntry || placeName, rawLoc)
                : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(placeName + ", " + rawLoc);
        var detailsUrl =
            typeof window.getPlaceDetailsUrl === "function"
                ? window.getPlaceDetailsUrl(cityKey, cardId)
                : "place-details.html?city=" + encodeURIComponent(cityKey) + "&id=" + encodeURIComponent(cardId);

        // Prevent thumbnail rapid-clicks from firing card double-click navigation
        card.querySelectorAll(".place-thumb").forEach(function (thumb) {
            thumb.addEventListener("dblclick", function (e) {
                e.stopPropagation();
            });
        });

        // Double-click anywhere on the card opens the particular location detail page
        card.setAttribute("title", "Double-click to view complete guide & info for " + placeName);
        card.addEventListener("dblclick", function (e) {
            if (e.target && (e.target.closest(".place-card-actions") || e.target.closest(".place-thumb"))) {
                return;
            }
            window.location.href = detailsUrl;
        });

        // Append Start My Trip + Google Map + Full Details action bar if not present
        if (!card.querySelector(".place-card-actions")) {
            var actionsBar = document.createElement("div");
            actionsBar.className = "place-card-actions";
            actionsBar.innerHTML =
                '<div class="place-card-btn-group">' +
                    '<button type="button" class="card-action-btn card-btn-trip" aria-label="Start My Trip to ' + placeName.replace(/"/g, "&quot;") + '">' +
                        '🚀 Start My Trip' +
                    '</button>' +
                    '<a href="' + mapUrl + '" target="_blank" rel="noopener noreferrer" class="card-action-btn card-btn-map" aria-label="Open ' + placeName.replace(/"/g, "&quot;") + ' in Google Maps">' +
                        '📍 Google Map' +
                    '</a>' +
                '</div>' +
                '<a href="' + detailsUrl + '" class="card-action-btn card-btn-info">Full Info ↗</a>' +
                '<div class="card-dblclick-hint">' +
                    '<span><strong>' + placeName + '</strong></span>' +
                    '<span>Double-click card for full guide</span>' +
                '</div>';

            var tripBtn = actionsBar.querySelector(".card-btn-trip");
            if (tripBtn) {
                tripBtn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    if (typeof window.startTripFromPlace === "function") {
                        window.startTripFromPlace(cityKey, cardId);
                    } else {
                        window.location.href = "/home.html?openWizard=true&city=" + encodeURIComponent(cityKey) + "&placeId=" + encodeURIComponent(cardId);
                    }
                });
            }

            actionsBar.addEventListener("click", function (e) {
                e.stopPropagation();
            });
            actionsBar.addEventListener("dblclick", function (e) {
                e.stopPropagation();
            });

            card.appendChild(actionsBar);
        }
    });
});
