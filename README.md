# Jivan Foundation Website
### A Perfect Way to Shape Your Life

---

## 📁 Project Structure

```
jivan-foundation/
│
├── index.html              ← Home page
├── about.html              ← About Us
├── governing-body.html     ← Governing Body
├── events.html             ← Events (loaded from JS)
├── gallery.html            ← Gallery / PDF Viewer
├── contact.html            ← Contact & Inquiry Form
├── sitemap.xml             ← SEO sitemap
├── robots.txt              ← SEO robots file
│
├── css/
│   └── style.css           ← All styles
│
├── js/
│   └── main.js             ← All JavaScript (slider, counters, events, gallery)
│
├── images/
│   └── logo.jpg            ← Foundation logo
│
├── src/
│   ├── slider/
│   │   ├── img1.jpg        ← Hero slider images
│   │   ├── img2.jpg
│   │   ├── img3.jpg
│   │   ├── img4.jpg
│   │   └── img5.jpg
│   ├── Event_2023-24.pdf   ← Event report PDF
│   ├── Gallery_2023-24.pdf ← Gallery PDF
│   ├── Event_2024-25.pdf
│   └── Gallery_2024-25.pdf
```

---

## 🚀 How to Deploy to GitHub Pages

### Step 1 – Create a GitHub Account
Go to https://github.com and sign up (free).

### Step 2 – Create a New Repository
1. Click the **+** button → **New repository**
2. Name it: `live-website` (or any name)
3. Set it to **Public**
4. Click **Create repository**

### Step 3 – Upload Your Files
1. Click **uploading an existing file** on the repository page
2. **Drag and drop** ALL files and folders from this project
3. Click **Commit changes**

### Step 4 – Enable GitHub Pages
1. Go to your repository **Settings**
2. Scroll to **Pages** in the left menu
3. Under **Source**, select **main** branch, **/ (root)** folder
4. Click **Save**
5. Your site will be live at: `https://YOUR-USERNAME.github.io/live-website/`

---

## ✏️ How to Update Content (No Coding Needed)

### Change Contact Number or Address
Open `contact.html`, `index.html`, `about.html` etc. and search for the phone number or address text and change it.

### Add a New Event
Open `js/main.js`, find the `events` array inside the `loadEvents()` function, and add a new object at the top:
```js
{
  id: 19,
  title: "Your Event Name",
  date: "Day Month Year",
  year: "2025-26",
  description: "Short description of the event.",
  icon: "🎯",
  color: "#1A5BA6"
}
```

### Add a New Gallery Year (e.g., 2025–26)
1. Copy your PDF files into the `src/` folder:
   - `src/Event_2025-26.pdf`
   - `src/Gallery_2025-26.pdf`
2. Open `gallery.html`
3. Add a new button in the **"Select Year"** section:
   ```html
   <button class="year-tab-btn" data-year="2025-26" onclick="selectYear('2025-26', this)">2025–26</button>
   ```
4. Add the file paths in the `pdfFiles` object in the `<script>` section:
   ```js
   '2025-26': {
     'Events':  'src/Event_2025-26.pdf',
     'Gallery': 'src/Gallery_2025-26.pdf'
   }
   ```

### Change Slider Images
Replace the files in `src/slider/` folder:
- `img1.jpg`, `img2.jpg`, `img3.jpg`, `img4.jpg`, `img5.jpg`
- Keep the same file names, or update the CSS in `index.html` (`<style>` section at top).

### Update Counter Numbers
Open `index.html`, find the `#impact` section, and change the `data-count` values:
```html
<span class="count" data-count="500" data-suffix="+">0</span>
```

### Add Governing Body Member
Open `governing-body.html`, copy an existing `<div class="col-sm-6 col-lg-3">` block and update the name, designation, and description.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling & layout |
| JavaScript (Vanilla) | Slider, counters, events, gallery |
| Bootstrap 5 | Responsive grid & components |
| Bootstrap Icons | All icons |
| Google Fonts | Typography (Playfair Display + Nunito) |

**No React, No Node.js, No build tools required.**
Works directly in any browser. Upload to GitHub Pages and it's live.

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Orange | `#F5A623` | Primary accent, CTAs, highlights |
| Blue | `#1A5BA6` | Secondary, buttons |
| Navy | `#1B2A6B` | Dark backgrounds, headings |
| White | `#FFFFFF` | Backgrounds, text on dark |

---

## 📞 Support

For any questions about the website, contact the web administrator.

© 2026 Jivan Foundation. All Rights Reserved.
