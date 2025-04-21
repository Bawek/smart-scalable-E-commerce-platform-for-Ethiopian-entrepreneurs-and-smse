export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        <span className="block">One Chance to</span>
                        <span className="block">Know About Us and</span>
                        <span className="block">Relive Our Journey</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                        Come join us in our journey to growth and betterment
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
                        Join Our Journey
                    </button>
                </div>
            </section>

            {/* Journey Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
                            Our Growth Story
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                                <div className="text-blue-600 text-4xl font-bold mb-4">2017</div>
                                <h3 className="text-xl font-semibold mb-2">Foundation</h3>
                                <p className="text-gray-600">Born from a vision to empower Ethiopian commerce</p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                                <div className="text-blue-600 text-4xl font-bold mb-4">500+</div>
                                <h3 className="text-xl font-semibold mb-2">Merchants</h3>
                                <p className="text-gray-600">Successful onboarded businesses</p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                                <div className="text-blue-600 text-4xl font-bold mb-4">2024</div>
                                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                                <p className="text-gray-600">Continuing to revolutionize e-commerce</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
                        Meet Our Inspiring Executives
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: 'Amare Zewudie',
                                role: 'CEO & Founder',
                                bio: 'Visionary leader driving digital transformation'
                            },
                            {
                                name: 'Mebrat Matebie',
                                role: 'CTO',
                                bio: 'Tech architect behind our platform'
                            },
                            {
                                name: 'Baweke Mekonnen',
                                role: 'COO',
                                bio: 'Operations excellence strategist'
                            },
                            {
                                name: 'Birihanu Tadele',
                                role: 'CFO',
                                bio: 'Financial stewardship expert'
                            }
                        ].map((member) => (
                            <div key={member.name} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <div className="aspect-square bg-blue-100 rounded-t-xl"></div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                                    <p className="text-blue-600 mb-2">{member.role}</p>
                                    <p className="text-gray-600 text-sm">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Ready to Grow With Us?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join hundreds of Ethiopian entrepreneurs already transforming their businesses
                    </p>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors">
                        Start Your Journey
                    </button>
                </div>
            </section>
        </div>
    )
}