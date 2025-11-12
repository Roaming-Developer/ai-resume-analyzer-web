# 🚀 AI Resume Analyzer

> **Stop guessing. Start matching.** Get instant, AI-powered feedback on how well your resume aligns with any job description.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)

## ✨ What is this?

Ever wondered why your perfectly crafted resume isn't getting past the ATS (Applicant Tracking System)? This tool helps you understand exactly what's missing and how to fix it.

**AI Resume Analyzer** is a modern web application that:

- 📊 Analyzes your resume against any job description
- 🎯 Provides an ATS compatibility score (0-100)
- 🔍 Identifies matched and missing keywords
- 💡 Offers AI-powered improvement suggestions
- 📄 Lets you compare multiple resume versions
- ✏️ Helps rewrite sections to better match job requirements

Made with ❤️ by [Akash](https://github.com/akashprasher) and AI maybe ✨

## 🎯 Features

### Core Functionality

- **Resume Analysis**: Upload your PDF resume and get instant feedback
- **ATS Score**: Understand how well your resume will perform in applicant tracking systems
- **Keyword Matching**: See which keywords from the job description you've included (and which ones you're missing)
- **AI Suggestions**: Get personalized recommendations to improve your resume
- **Resume Comparison**: Compare two versions of your resume side-by-side
- **Text Rewriting**: Use AI to rewrite specific sections to better match job requirements

### User Experience

- 🌓 **Dark Mode**: Beautiful dark theme support
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- ⚡ **Fast & Optimized**: Built with Next.js 16 for optimal performance
- 💾 **Smart Caching**: Your last analysis is saved for quick re-access
- 📤 **Export Reports**: Download your analysis as a beautifully formatted PDF
- 🔗 **Shareable Links**: Share your analysis results with others

## 🛠️ Tech Stack

This project uses some of the best modern web technologies:

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Axios](https://axios-http.com/)** - HTTP client for API calls
- **[Sonner](https://sonner.emilkowal.ski/)** - Beautiful toast notifications
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)** - PDF export functionality

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (or use [nvm](https://github.com/nvm-sh/nvm))
- **pnpm** (recommended) or npm/yarn
- A running backend API (see [Backend Requirements](./internal_docs/BACKEND_PROMPT.md))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/akashprasher/ai-resume-analyzer-web.git
   cd ai-resume-analyzer-web
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

   > 💡 **Note**: Make sure your backend API is running on the specified URL.

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

That's it! You're ready to analyze resumes 🎉

## 📖 How to Use

### Analyzing a Resume

1. **Upload your resume**: Drag and drop your PDF file or click to browse
2. **Paste job description**: Copy the job posting and paste it into the text area
3. **Click "Analyze Resume"**: Wait a few seconds for the AI to work its magic
4. **Review results**: See your ATS score, keywords, and suggestions
5. **Take action**: Use the suggestions to improve your resume

### Comparing Resumes

1. Navigate to the **Compare** page
2. Upload two different versions of your resume
3. Paste the same job description
4. See which version performs better and why

### Rewriting Sections

1. On the results page, click **"Rewrite My Summary"**
2. Paste the section you want to improve
3. Get AI-powered suggestions with explanations

## 🏗️ Project Structure

```
ai-resume-analyzer-web/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Home page
│   │   ├── result/            # Result pages
│   │   └── compare/           # Compare page
│   ├── components/            # React components
│   │   ├── ui/                # Shadcn UI components
│   │   ├── UploadBox.tsx      # File upload component
│   │   ├── KeywordCloud.tsx   # Keyword visualization
│   │   └── ...
│   ├── lib/                   # Utilities
│   │   ├── api.ts             # API client
│   │   └── utils.ts           # Helper functions
│   └── store/                 # State management
│       └── useAppStore.ts     # Zustand store
├── internal_docs/             # Backend documentation
└── public/                    # Static assets
```

## 🔧 Configuration

### Environment Variables

| Variable              | Description          | Default                 |
| --------------------- | -------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000` |

### API Endpoints

The frontend expects the following backend endpoints:

- `POST /analyze` - Analyze a resume
- `GET /result/:id` - Get analysis result
- `POST /compare` - Compare two resumes
- `POST /rewrite` - Rewrite resume section
- `GET /health` - Health check

See [Backend Requirements](./internal_docs/BACKEND_PROMPT.md) for detailed API specifications.

## 🎨 Customization

### Styling

The project uses Tailwind CSS with a custom theme. You can modify colors, fonts, and other design tokens in:

- `src/app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration (if needed)

### Components

All UI components are in `src/components/ui/` and follow the Shadcn UI pattern. Feel free to customize them to match your brand.

## 📦 Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

For deployment, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure your code follows the existing style and includes tests if applicable.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by [Shadcn UI](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

## 💬 Support

Found a bug? Have a feature request? [Open an issue](https://github.com/akashprasher/ai-resume-analyzer-web/issues)!

---

**Made with ❤️ by [Akash](https://github.com/akashprasher) and AI maybe** ✨

- 🔗 **GitHub**: [github.com/akashprasher](https://github.com/akashprasher)
- 🌐 **Website**: [akashprasher.com](https://akashprasher.com)

_If you're a recruiter checking this out - nice attention to detail! 👋_
