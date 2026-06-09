const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
    if(navbar.classList.contains("active"))  {
        menuBtn.innerHTML = "⨉"
    }else{
        menuBtn.innerHTML = "☰"
    }
});

function getNights(i) {
  const start = new Date(document.getElementById("checkin" + i).value);
  const end = new Date(document.getElementById("checkout" + i).value);

  const diff = end - start;
  const nights = diff / (1000 * 60 * 60 * 24);

  return nights > 0 ? nights : 1;
}

function payWithPaystack(pricePerNight, i) {

  const bookingCode = 'BK' + Math.floor(Math.random() * 1000000);

  const name = document.getElementById("name" + i).value;
  const email = document.getElementById("email" + i).value;
  const guests = document.getElementById("guests" + i).value;
  const checkin = document.getElementById("checkin" + i).value;
  const checkout = document.getElementById("checkout" + i).value;

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
        { display_name: "Room Price", value: pricePerNight },
        { display_name: "Total", value: total },
        { display_name: "Booking Code", value: bookingCode }
      ]
    },

    callback: function (response) {

      alert(
        "Payment Successful ✔️\nBooking Confirmed ✔️\nBooking Code: " + bookingCode
      );

      console.log("Booking Code:", bookingCode, "| Ref:", response.reference);

      const form = document.querySelector("#ggg" + i + " .paymentform");
      if (form) {
        form.reset();
      }


      const modal = document.getElementById("ggg" + i);
      if (modal) {
        modal.style.display = "none";
      }
    },

    onClose: function () {
      alert("Booking not confirmed ❌");

      const form = document.querySelector("#ggg + i + .paymentform")
      if (form) {
        form.reset();
      }

      const modal = document.getElementById("ggg" + i)
      if(modal) {
        modal.style.display = "n"
      }
    }

  });

  handler.openIframe();
}

const phone = "2348130975590"
const msg = "Hello 🏨 \n\nI'd like to book/inquire:\n1. Room type: \n2. Check-in date: \n3. Check-out date: \n4. Nights: \n5. No. of guests: \n\nThank you!";
document.getElementById("whatsapp-btn").href = "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);
