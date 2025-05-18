// app/aberham.com/product/[id]/page.js
export const metadata = {
  title: 'product | aberham.com',
}

export default function ProductPage({ params }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">aberham.com product</h1>
      <p className="text-lg">ID: {params.id}</p>
    </section>
  )
}