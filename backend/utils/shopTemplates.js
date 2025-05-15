// utils/shopTemplates.js
const shopTemplates = {
  // Root files
  layout: (domain) => `// app/${domain}/layout.js
export default function ShopLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">${domain}</h1>
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          © ${new Date().getFullYear()} ${domain}
        </div>
      </footer>
    </div>
  )
}`,

  loading: (domain) => `// app/${domain}/loading.js
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}`,

  error: (domain) => `// app/${domain}/error.js
'use client'

export default function Error({ error, reset }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">${domain} Error</h2>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <button 
        onClick={() => reset()}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}`,

  page: (domain) => `// app/${domain}/page.js
export const metadata = {
  title: 'Welcome to ${domain}',
  description: '${domain} shop homepage',
}

export default function HomePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to ${domain}</h1>
      <p className="text-lg text-gray-700">Discover our products</p>
    </section>
  )
}`,

  // Subpage templates
  subpage: (domain, pageName) => `// app/${domain}/${pageName}/page.js
export const metadata = {
  title: '${pageName} | ${domain}',
}

export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">${domain} ${pageName}</h1>
      <div className="prose prose-lg">
        {/* ${pageName} page content */}
      </div>
    </section>
  )
}`,

  // Dynamic routes
  dynamicRoute: (domain, routeName) => `// app/${domain}/${routeName}/[id]/page.js
export const metadata = {
  title: '${routeName} | ${domain}',
}

export default function ${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Page({ params }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">${domain} ${routeName}</h1>
      <p className="text-lg">ID: {params.id}</p>
    </section>
  )
}`,

  // Support files
  notFound: (domain) => `// app/${domain}/not-found.js
export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">${domain} Page Not Found</h2>
      <p className="text-lg text-gray-600">The requested resource doesn't exist</p>
    </div>
  )
}`
};

module.exports = shopTemplates;