const stripe = Stripe("pk_test_51R3tW1HCjU5RxEifp4bYnpjMJeUvaaDahzSihggrieb8AxUhR5kJ5GWsNagwgv80ru3WwwYHRy8Uv2pBVohLeLa400evOSVlUT");

const elements = stripe.elements();
const cardElement = elements.create("card");
cardElement.mount("#card-element");

const form = document.getElementById("payment-form");
const paymentMessage = document.getElementById("payment-message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const phoneNumber = document.getElementById("phone-number").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!phoneNumber || amount <= 0) {
        paymentMessage.innerHTML = `<p style="color: red;">Please enter valid details!</p>`;
        return;
    }

    const response = await fetch("http://52.66.252.46:3000/api/payment/create-payment-intent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, currency: "usd", phoneNumber }),
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
        },
    });

    if (result.error) {
        paymentMessage.innerHTML = `<p style="color: red;">${result.error.message}</p>`;
    } else {
        paymentMessage.innerHTML = `<p style="color: green;">Payment Successful! 🎉</p>`;
    }
});
