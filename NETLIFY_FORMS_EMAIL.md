# Sending membership form to club president

The membership form is handled by **Netlify Forms**. No SMTP or backend is required.

## If Netlify doesn't detect your forms

The app uses a **static form registration page** so Netlify can see the forms at deploy time:

- **`public/netlify-forms.html`** – Contains minimal `<form name="membership">` and `<form name="plant-questions">` with `data-netlify="true"`. Netlify's crawler reads this file and registers the forms. The real forms on the Join and Plant Questions pages submit with the same names, so submissions are accepted.

**You need to redeploy** after this file is in the repo. Then in Netlify: **Site configuration** → **Forms**. You should see **membership** and **plant-questions** listed. If they still don't appear, trigger a full deploy (e.g. clear cache and deploy again).

## Send submissions to president@GreenvilleGardenClub.com

1. In **Netlify**: open your site → **Site configuration** → **Forms**.
2. Find the form named **membership** (it appears after the first deploy with the new form).
3. Open **Form notifications** (or **Notifications**).
4. Click **Add notification** → **Email notification**.
5. Set **Email to notify** to: `president@GreenvilleGardenClub.com`.
6. Optionally set a subject, e.g. `Greenville Garden Club – New membership form submission`.
7. Save.

After that, each time someone clicks "Click here to send electronically," Netlify will email the submission to the club president.

---

## Anti-bot protection (already in place)

Both the **membership** and **plant-questions** forms use:

1. **Honeypot** – A hidden "Don't fill this out if you're human" field. Bots often fill it; Netlify discards those submissions.
2. **Minimum time** – Submissions are blocked if the form is submitted within 3 seconds of the page loading (catches simple bots).
3. **reCAPTCHA (optional)** – The forms are set up for Netlify's reCAPTCHA. To enable it:
   - Get a reCAPTCHA v2 key pair at [Google reCAPTCHA](https://www.google.com/recaptcha/admin).
   - In Netlify: **Site configuration** → **Forms** → **Form options** (or **Spam filters**).
   - Add your **Site key** and **Secret key**. Save and redeploy so the "I'm not a robot" checkbox appears on the forms.
