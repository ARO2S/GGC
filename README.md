# Greenville Garden Club Website

A modern, static website for the Greenville Garden Club built with Next.js, Tailwind CSS, and Decap CMS.

## Features

- 📱 **Fully Responsive** - Works beautifully on all devices
- 🎨 **Modern Design** - Clean, accessible interface with garden-themed styling
- 📝 **Easy Content Management** - Web-based CMS at `/admin` for non-technical users
- 📧 **Contact Forms** - Netlify Forms for membership applications and plant questions
- 📰 **Blog System** - Markdown-based blog with CMS integration
- 🚀 **Fast & Static** - Pre-rendered static site for maximum performance
- ♿ **Accessible** - WCAG compliant with excellent readability

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Forms**: Netlify Forms
- **Hosting**: Netlify (recommended)
- **Content**: Markdown files with frontmatter

## Project Structure

```
greenville-garden-club/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with nav/footer
│   ├── page.tsx             # Home page
│   ├── history/             # Club history page
│   ├── programs-2025/       # 2025 programs
│   ├── programs-2026/       # 2026 programs
│   ├── join/                # Membership form
│   ├── plant-questions/     # Plant questions form
│   └── blog/                # Blog listing & posts
├── components/              # Reusable components
├── content/                 # Markdown content
│   ├── blog/               # Blog posts
│   ├── programs/           # Program listings
│   └── pages/              # Page content
├── public/                  # Static assets
│   ├── admin/              # CMS configuration
│   └── images/             # Image uploads
└── netlify.toml            # Netlify configuration
```

## Getting Started

### Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This generates static files in the `out` directory.

## Content Management

### Accessing the CMS

1. Deploy the site to Netlify
2. Enable Netlify Identity in your site settings
3. Enable Git Gateway in Netlify Identity settings
4. Invite users via Netlify Identity
5. Access CMS at `https://yoursite.com/admin`

### Local CMS Development

For local CMS testing:

1. Run the local backend proxy:
   ```bash
   npx decap-server
   ```

2. In another terminal, run Next.js:
   ```bash
   npm run dev
   ```

3. Access at `http://localhost:3000/admin`

### Managing Content

The CMS allows you to manage:

- **Blog Posts**: Create, edit, and publish articles
- **2025 Programs**: Add and manage program listings
- **2026 Programs**: Plan ahead with next year's programs
- **Pages**: Edit History page and Home page content

## Forms

Two Netlify Forms are configured:

1. **Membership Application** (`/join`)
   - Collects member information
   - Sends notifications to club email

2. **Plant Questions** (`/plant-questions`)
   - Community Q&A form
   - Routes to designated responders

### Form Setup on Netlify

Forms work automatically when deployed to Netlify. To receive notifications:

1. Go to Netlify site settings
2. Navigate to Forms
3. Set up email notifications for form submissions

## Deployment

### Deploy to Netlify

#### Option 1: Git Integration (Recommended)

1. Push code to GitHub, GitLab, or Bitbucket
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings (auto-detected):
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
6. Click "Deploy site"

#### Option 2: Manual Deploy

1. Build locally:
   ```bash
   npm run build
   ```

2. Drag the `out` folder to Netlify

### Post-Deployment Setup

1. **Enable Netlify Identity:**
   - Site Settings → Identity → Enable Identity

2. **Configure Git Gateway:**
   - Identity → Services → Enable Git Gateway

3. **Invite CMS Users:**
   - Identity → Invite users
   - Send invitation emails to club officers

4. **Set up Form Notifications:**
   - Site Settings → Forms → Form notifications
   - Add email addresses to receive form submissions

## Customization

### Colors

Garden-themed colors are defined in `tailwind.config.ts`:
- `garden`: Green tones for primary elements
- `earth`: Brown/beige tones for accents

### Logo

Add your club logo:
1. Place image in `public/images/`
2. Update `components/Navigation.tsx` to include the image

### Social Links

Update social media links in `components/Footer.tsx`

## For Club Officers

### Adding Blog Posts

1. Go to `/admin` on your live site
2. Log in with your credentials
3. Click "Blog Posts" → "New Blog Post"
4. Fill in:
   - Title
   - Publish date
   - Author name
   - Excerpt (brief summary)
   - Featured image (optional)
   - Article content
5. Click "Publish"

### Managing Programs

1. Go to `/admin`
2. Select "2025 Programs" or "2026 Programs"
3. Click "New [Year] Program"
4. Enter:
   - Program title
   - Date and time
   - Location
   - Description
5. Click "Publish"

### Editing Pages

1. Go to `/admin`
2. Click "Pages"
3. Select "History Page" or "Home Page Sections"
4. Make your edits
5. Click "Publish"

### Tips

- **Images**: Upload images through the CMS for automatic optimization
- **Preview**: Use the preview pane to see changes before publishing
- **Drafts**: Save as draft if you're not ready to publish
- **Rich Text**: Use the editor toolbar for formatting (bold, lists, links, etc.)

## Support

For technical issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Decap CMS documentation](https://decapcms.org/docs/)
- Contact your web developer

## License

© 2025 Greenville Garden Club. All rights reserved.

