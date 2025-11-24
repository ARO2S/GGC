# Deployment Guide
## Greenville Garden Club Website

This guide covers deploying the website to Netlify and setting up all features.

---

## Prerequisites

- GitHub account (or GitLab/Bitbucket)
- Netlify account (free tier is sufficient)
- Your website code pushed to a Git repository

---

## Step-by-Step Deployment

### Step 1: Push Code to GitHub

1. **Create a new repository on GitHub:**
   - Go to github.com
   - Click "New repository"
   - Name it "greenville-garden-club"
   - Make it public or private
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Push your local code:**
   ```bash
   cd /path/to/GGC
   git init
   git add .
   git commit -m "Initial commit - Greenville Garden Club website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/greenville-garden-club.git
   git push -u origin main
   ```

### Step 2: Deploy to Netlify

1. **Go to Netlify:**
   - Visit [netlify.com](https://netlify.com)
   - Log in or sign up (you can use GitHub to sign in)

2. **Create new site:**
   - Click "Add new site" → "Import an existing project"
   - Click "GitHub" (or your Git provider)
   - Authorize Netlify to access your repositories
   - Select "greenville-garden-club" repository

3. **Configure build settings:**
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - Click "Deploy site"

4. **Wait for deployment:**
   - First build takes 2-5 minutes
   - You'll see a random URL like `https://random-name-123.netlify.app`

### Step 3: Set Up Custom Domain (Optional)

1. **In Netlify:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `greenvillegardenclub.org`)

2. **Configure DNS:**
   - Follow Netlify's instructions to:
   - Add Netlify's nameservers to your domain registrar, OR
   - Add an A record pointing to Netlify's IP

3. **Enable HTTPS:**
   - Netlify automatically provides free SSL
   - Wait for certificate to provision (takes a few minutes)

### Step 4: Enable Netlify Identity (for CMS)

1. **In your Netlify site dashboard:**
   - Go to "Site settings" → "Identity"
   - Click "Enable Identity"

2. **Configure registration:**
   - Set "Registration preferences" to "Invite only"
   - This prevents random people from signing up

3. **Enable Git Gateway:**
   - Still in Identity settings
   - Scroll to "Services"
   - Click "Enable Git Gateway"
   - This allows CMS to save changes to your repository

### Step 5: Configure Form Notifications

1. **In Netlify:**
   - Go to "Site settings" → "Forms"
   - Click "Form notifications"
   - Click "Add notification"

2. **For Membership Applications:**
   - Select form: "membership"
   - Notification type: "Email notification"
   - Email to notify: Your club's email address
   - Click "Save"

3. **For Plant Questions:**
   - Repeat above for form: "plant-questions"
   - Send to appropriate email address

### Step 6: Invite CMS Users

1. **In Netlify Identity:**
   - Go to "Identity" tab
   - Click "Invite users"
   - Enter email addresses of club officers who need CMS access
   - Click "Send"

2. **Users will receive an email:**
   - They click the invite link
   - Set their password
   - They can then access `/admin` on your site

---

## Testing After Deployment

### Test the Website

1. Visit your Netlify URL
2. Check all pages:
   - ✅ Home page loads
   - ✅ History page displays
   - ✅ Programs pages show correctly
   - ✅ Blog page works
   - ✅ Navigation works on mobile
   - ✅ Forms are visible

### Test the CMS

1. Go to `yoursite.com/admin`
2. Log in with invited user credentials
3. Try creating a test blog post
4. Check if it appears on your blog page
5. Delete the test post

### Test Forms

1. Fill out the membership form
2. Check if you receive an email notification
3. Repeat for plant questions form

---

## Ongoing Maintenance

### Automatic Deployments

Every time you push to your GitHub repository, Netlify will:
1. Automatically rebuild your site
2. Deploy the new version
3. Send you an email notification

### CMS Updates

When club officers make changes via CMS:
1. Changes are committed to GitHub
2. Netlify detects the commit
3. Site rebuilds automatically
4. Changes go live in 1-2 minutes

### Managing Content

Club officers can manage content at `/admin`:
- No need to involve developer for content changes
- All changes are tracked in Git history
- Changes can be reverted if needed

---

## Troubleshooting Deployment

### Build Fails

**Check the build log:**
1. In Netlify, go to "Deploys"
2. Click the failed deploy
3. Read the error message

**Common issues:**
- Missing dependencies: Run `npm install` locally
- TypeScript errors: Check for type issues
- Missing files: Ensure all files are committed to Git

### Forms Not Working

**Checklist:**
1. Forms have `data-netlify="true"` attribute ✅
2. Forms have `name` attribute ✅
3. Forms include hidden `form-name` input ✅
4. Site is deployed to Netlify (forms don't work locally)

### CMS Not Saving

**Check:**
1. Git Gateway is enabled
2. User is logged in
3. User has proper permissions
4. Check browser console for errors

### Images Not Loading

**Possible causes:**
1. Images not uploaded through CMS
2. Incorrect image path
3. Image too large (>10MB)

**Solutions:**
- Re-upload images through CMS
- Compress large images before uploading
- Check `public/images/uploads` folder exists

---

## Environment Variables (If Needed)

If you need to add environment variables:

1. In Netlify, go to "Site settings" → "Environment variables"
2. Click "Add a variable"
3. Enter key and value
4. Click "Save"
5. Rebuild your site

Common variables you might need:
- API keys for third-party services
- Google Analytics ID
- Custom configuration

---

## Security Best Practices

1. **Keep Netlify Identity "Invite Only"**
   - Don't allow open registration

2. **Limit CMS Access**
   - Only invite trusted club officers
   - Remove access when no longer needed

3. **Review Form Submissions Regularly**
   - Check for spam
   - Respond promptly to legitimate inquiries

4. **Monitor Site Activity**
   - Check Netlify analytics
   - Review build logs periodically

---

## Performance Tips

Your site is already optimized, but you can:

1. **Compress Images**
   - Use tools like TinyPNG or Squoosh
   - Keep images under 500KB when possible

2. **Regular Content Cleanup**
   - Archive old blog posts if needed
   - Remove outdated programs

3. **Monitor Bandwidth**
   - Netlify free tier: 100GB/month
   - Usually more than enough for club sites

---

## Backup Strategy

Your content is automatically backed up because:
1. **Git History**: All changes saved in GitHub
2. **Netlify**: Keeps deployment history
3. **CMS**: All edits are commits in Git

To manually backup:
```bash
git clone https://github.com/YOUR_USERNAME/greenville-garden-club.git
```

---

## Support Resources

### Documentation
- [Netlify Docs](https://docs.netlify.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Decap CMS Docs](https://decapcms.org/docs/)

### Getting Help
1. Check this guide
2. Review Netlify community forums
3. Contact your web developer
4. Email Netlify support (on paid plans)

---

## Costs

### Free Tier (Sufficient for Most Clubs)
- **Netlify**: Free
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Unlimited sites
  - Free SSL certificates

- **GitHub**: Free
  - Unlimited public repositories
  - Version control and backup

### When to Upgrade
Consider paid plans if you:
- Exceed 100GB bandwidth
- Need more than 300 build minutes
- Want advanced features (analytics, A/B testing)
- Require priority support

**Netlify Pro**: $19/month (usually not needed)

---

## Checklist: Post-Deployment

After deploying, confirm:

- [ ] Site is live and accessible
- [ ] All pages load correctly
- [ ] Navigation works (desktop & mobile)
- [ ] Forms submit successfully
- [ ] Form notifications arrive via email
- [ ] CMS is accessible at `/admin`
- [ ] CMS users can log in
- [ ] CMS changes appear on site
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS is enabled
- [ ] Favicon displays correctly
- [ ] Social media links work
- [ ] Contact information is correct

---

## Next Steps

After successful deployment:

1. **Train Club Officers**
   - Share the CMS User Guide
   - Do a walkthrough of adding content
   - Answer questions

2. **Add Initial Content**
   - Create first blog post
   - Add all 2025 programs
   - Upload photos
   - Review and edit History page

3. **Promote the Site**
   - Announce on social media
   - Include URL in newsletters
   - Add to email signatures
   - Print on club materials

4. **Regular Maintenance**
   - Post monthly blog updates
   - Keep programs current
   - Respond to form submissions
   - Update content seasonally

---

Congratulations! Your Greenville Garden Club website is now live! 🎉

*Last updated: November 2025*

