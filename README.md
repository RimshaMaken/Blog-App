# 📝 Blog App

A full-stack blog platform built with React and Appwrite. Users can sign up, log in, and create, edit, and delete blog posts with rich text formatting and featured images.

---

## ✨ Features

- 🔐 User authentication (signup, login, logout) via Appwrite
- ✍️ Create and edit posts with a rich text editor (TinyMCE)
- 🖼️ Upload and display featured images
- 📄 View all posts or just your own
- 🔒 Protected routes — only logged-in users can create/edit posts
- 👤 Author-only Edit/Delete controls on each post
- 📱 Responsive, clean UI built with Tailwind CSS

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React + Vite |
| Routing | React Router DOM |
| State Management | Redux Toolkit |
| Forms | React Hook Form |
| Rich Text Editor | TinyMCE |
| Backend / Database / Storage | Appwrite Cloud |
| Styling | Tailwind CSS |
| HTML Parsing | html-react-parser |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- An [Appwrite Cloud](https://cloud.appwrite.io/) account and project
- A [TinyMCE](https://www.tiny.cloud/) API key (free tier available)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_APPWRITE_URL=your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
VITE_TINYMCE_API_KEY=your-tinymce-api-key
```

> ⚠️ Never commit your `.env` file. It's already listed in `.gitignore`.

### 4. Set up Appwrite

In your Appwrite Console:

1. Create a **Database** and a **Collection** with the following attributes:

   | Attribute | Type | Required |
   |---|---|---|
   | `title` | String | ✅ |
   | `content` | String | ✅ |
   | `featuredImage` | String | ✅ |
   | `status` | String | ✅ |
   | `userId` | String | ✅ |

2. Create a **Storage bucket** for images.
3. Under the bucket's **Permissions**, add:
   - `Users` role → Create, Read, Update, Delete (so logged-in users can manage their own uploads)
   - `Any` role → Read only (so images display publicly without requiring a session)
4. Under **Settings → Platforms**, add a Web platform with your app's domain (`localhost` for development).

### 5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
src/
├── appwrite/          # Appwrite service wrappers (auth.js, config.js)
├── assets/            # Static images
├── components/        # Reusable UI components
│   └── post-form/     # Shared create/edit post form
├── conf/               # Environment variable config
├── pages/              # Route-level pages (Home, Post, Login, etc.)
├── store/               # Redux store and auth slice
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |

---

## 🖼️ A Note on Images

This project uses Appwrite's `getFileView()` method to serve images, which works on Appwrite's free plan. If you upgrade to a paid plan, you can switch to `getFilePreview()` in `appwrite/config.js` to enable on-the-fly image resizing/transformations.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) for the backend infrastructure
- [TinyMCE](https://www.tiny.cloud/) for the rich text editor
