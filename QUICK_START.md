# Quick Start Guide
## Get Your Site Running in 5 Minutes

---

## Option 1: Test Locally (Development)

```bash
# Navigate to the project
cd /home/andyr/GGC

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Open browser:** http://localhost:3000

**Press Ctrl+C to stop the server**

---

## Option 2: Deploy to Netlify (Production)

### Prerequisites
- GitHub account
- Netlify account (free)

### Steps

1. **Push to GitHub:**
   ```bash
   cd /home/andyr/GGC
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `out`
   - Click "Deploy"

3. **Enable CMS (after deployment):**
   - In Netlify: Site Settings → Identity → Enable Identity
   - Identity → Services → Enable Git Gateway
   - Identity → Invite users → Add club officers' emails

4. **Set Up Forms:**
   - Site Settings → Forms → Form notifications
   - Add email notifications for both forms

**Done!** Your site is live at the Netlify URL.

---

## Testing Checklist

After starting the site (locally or deployed):

- [ ] Visit home page - loads correctly
- [ ] Click navigation links - all pages work
- [ ] Try mobile view - hamburger menu works
- [ ] Visit /admin - CMS loads (only works when deployed)
- [ ] Submit a test form
- [ ] Check email for form notification

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server locally

# View site
# Local: http://localhost:3000
# Admin: http://localhost:3000/admin
```

---

## File Locations

| What | Where |
|------|-------|
| Pages | `/app/` |
| Components | `/components/` |
| Blog posts | `/content/blog/` |
| Programs | `/content/programs/` |
| CMS config | `/public/admin/config.yml` |
| Colors | `/tailwind.config.ts` |

---

## Quick Customizations

### Change Club Name
Search and replace "Greenville Garden Club" with your club name throughout the project.

### Update Colors
Edit `tailwind.config.ts` - change the `garden` and `earth` color values.

### Add Logo
1. Put logo in `/public/images/logo.png`
2. Edit `components/Navigation.tsx`
3. Add `<img>` tag next to club name

### Update Social Links
Edit `components/Footer.tsx` - update Facebook URL and add other social links.

---

## Need Help?

📖 **Full Documentation:**
- `README.md` - Technical details
- `CMS_USER_GUIDE.md` - For club officers
- `DEPLOYMENT_GUIDE.md` - Deployment steps
- `PROJECT_SUMMARY.md` - Complete overview

🆘 **Troubleshooting:**
- Check the documentation first
- Search error messages online
- Contact your web developer

---

## Next Actions

1. ✅ Test site locally
2. ✅ Deploy to Netlify
3. ✅ Set up CMS access
4. ✅ Configure forms
5. ✅ Add your content
6. ✅ Go live!

---

**Ready to launch!** 🚀

