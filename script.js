const menuBtn = document.getElementById("menuBtn");

const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

  navbar.classList.toggle("active");

  if (navbar.classList.contains("active")) {

    menuBtn.innerHTML = "⨉";

  } else {

    menuBtn.innerHTML = "☰";

  }

});


function getNights(i) {

  const start = new Date(document.getElementById("checkin" + i).value);

  const end = new Date(document.getElementById("checkout" + i).value);

  const diff = end - start;

  const nights = diff / (1000 * 60 * 60 * 24);

  return nights > 0 ? nights : 1;

}


function resetRoom(i) {

  document.getElementById("name" + i).value = "";

  document.getElementById("email" + i).value = "";

  document.getElementById("checkin" + i).value = "";

  document.getElementById("checkout" + i).value = "";

  document.getElementById("guests" + i).value = "";

}


function goToDefault(i) {

  resetRoom(i);

  window.location.hash = "ff" + i;

}


function payWithPaystack(pricePerNight, i) {

  const bookingCode = 'BK' + Math.floor(Math.random() * 1000000);

  const name = document.getElementById("name" + i).value.trim();

  const email = document.getElementById("email" + i).value.trim();

  const checkin = document.getElementById("checkin" + i).value;

  const checkout = document.getElementById("checkout" + i).value;

  const guests = document.getElementById("guests" + i).value;



  if (!name || !email || !checkin || !checkout || !guests) {

    alert("Please fill all the form ❗");

    return;

  }


  if (guests < 1 || guests > 10) {

    alert("Guests must be between 1 and 10");

    return;

  }

  const nights = getNights(i);

  const total = pricePerNight * nights;

  let handler = PaystackPop.setup({

    key: "pk_test_084ec29bb0ddd52605c8eedd784ef0b46a1ebe86",

    email: email,

    amount: total * 100,

    currency: "NGN",

    metadata: {

      custom_fields: [

        { display_name: "Name", value: name },

        { display_name: "Guests", value: guests },

        { display_name: "Check-in", value: checkin },

        { display_name: "Check-out", value: checkout },

        { display_name: "Nights", value: nights },

        { display_name: "Total", value: total },

        { display_name: "Booking Code", value: bookingCode }

      ]

    },


    callback: function (response) {

      alert(

        "Payment Successful ✔️\nBooking Confirmed ✔️\nBooking Code: " + bookingCode

      );

      goToDefault(i);

    },


    onClose: function () {

      alert("Booking not confirmed ❌");

      goToDefault(i);

    }

  });

  handler.openIframe();

}

const phone = "2348130975590";
const msg =
  "Hello 🏨 \n\nI'd like to book/inquire:\n1. Room type: \n2. Check-in date: \n3. Check-out date: \n4. Nights: \n5. No. of guests: \n\nThank you!";
document.getElementById("whatsapp-btn").href =

  "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);



const searchBtn = document.getElementById("searchBtn");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("searchInput");
const closeBtn = document.getElementById("closeBtn");

const rooms = document.querySelectorAll(".rooms");
const section = document.querySelector(".section");
const suggestions = document.getElementById("suggestions");

let noResultDiv = null;

searchBtn.addEventListener("click", () => {

    searchContainer.classList.add("active");
    searchBtn.style.display = "none"

    searchContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
      searchContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      searchInput.focus();
    }, 100);
});


closeBtn.addEventListener("click", () => {

    searchContainer.classList.remove("active");
    searchBtn.style.display = "block"

    searchInput.value = "";
    rooms.forEach(room => {
        room.style.display = "";
    });

    suggestions.innerHTML = "";
    suggestions.style.display = "none";

    if (noResultDiv) {
        noResultDiv.remove();
        noResultDiv = null;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    AOS.refresh();
});

suggestions.style.display = "none";

searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase().trim();

    let found = false;

    suggestions.innerHTML = "";

    // EMPTY INPUT
    if (value === "") {

        rooms.forEach(room => {
            room.style.display = "";
        });

        suggestions.style.display = "none";

        if (noResultDiv) {
            noResultDiv.remove();
            noResultDiv = null;
        }

        AOS.refresh();
        return;
    }

    // FILTER ROOMS
    rooms.forEach(room => {

        const title = room.querySelector("h3")
            .textContent
            .trim()
            .toLowerCase();

        const desc = room.querySelector("p")
            .textContent
            .trim()
            .toLowerCase();

        if (
            title.includes(value) ||
            desc.includes(value)
        ) {

            room.style.display = "";
            found = true;

            const item = document.createElement("div");

            item.classList.add("suggestion-item");
            item.textContent = room.querySelector("h3").textContent.trim();

            item.addEventListener("click", () => {

                const selectedTitle = item.textContent;

                searchInput.value = selectedTitle;

                suggestions.innerHTML = "";
                suggestions.style.display = "none";

                rooms.forEach(r => {

                    const roomTitle = r.querySelector("h3")
                        .textContent
                        .trim();

                    if (roomTitle === selectedTitle) {

                        r.style.display = "";

                        r.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    } else {

                        r.style.display = "none";

                    }
                });

                AOS.refresh();
            });

            suggestions.appendChild(item);

        } else {

            room.style.display = "none";

        }
    });

    suggestions.style.display =
        suggestions.children.length > 0
            ? "block"
            : "none";

    if (!found) {
        if (!noResultDiv) {
            noResultDiv = document.createElement("div");
            noResultDiv.className = "no-result";
            noResultDiv.textContent = "No rooms found 😢";
            noResultDiv.style.color = "white";
            noResultDiv.style.fontSize = "18px";
            noResultDiv.style.fontFamily = "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji";
            noResultDiv.style.textAlign = "center";
            noResultDiv.style.margin = "0 auto";
            noResultDiv.style.width = "100%";
            noResultDiv.style.fontSize = "18px";

            section.appendChild(noResultDiv);
        }
    } else {
        if (noResultDiv) {
            noResultDiv.remove();
            noResultDiv = null;
        }
    }

    AOS.refresh();
});
