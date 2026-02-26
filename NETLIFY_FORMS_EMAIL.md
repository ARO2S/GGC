# Sending membership form to club president

The membership form is handled by **Netlify Forms**. No SMTP or backend is required.

## Send submissions to president@GreenvilleGardenClub.com

1. In **Netlify**: open your site → **Site configuration** → **Forms**.
2. Find the form named **membership** (it appears after the first deploy with the new form).
3. Open **Form notifications** (or **Notifications**).
4. Click **Add notification** → **Email notification**.
5. Set **Email to notify** to: `president@GreenvilleGardenClub.com`.
6. Optionally set a subject, e.g. `Greenville Garden Club – New membership form submission`.
7. Save.

After that, each time someone clicks “Click here to send electronically,” Netlify will email the submission to the club president.
