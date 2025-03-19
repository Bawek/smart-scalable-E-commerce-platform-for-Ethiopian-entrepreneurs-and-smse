export default function AboutPage() {
    const team = [
        {
            image: "https://via.placeholder.com/400x400",
            name: "Andrew O'Keeffe",
            position: "Creative Director",
            bio: "Visionary leader with 15+ years experience in brand strategy and creative direction."
        },
        {
            image: "https://via.placeholder.com/400x400",
            name: "Mark O'Keeffe",
            position: "Design Director",
            bio: "Award-winning designer specializing in visual identity and user experience."
        },
        {
            image: "https://via.placeholder.com/400x400",
            name: "Sarah Johnson",
            position: "Client Relations",
            bio: "Connects client vision with creative execution for seamless collaborations."
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] w-full">
                <div className="absolute -top-6 inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLWgOtmncZM1QTBlpBPIiTvcfLi8H0V82n_g&s')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black opacity-40" />
                </div>

                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-orange-700 tracking-wide uppercase">
                            Who we are
                        </h2>
                        <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                            Designers, thinkers & collaborators
                        </p>
                        <div className="mt-5 max-w-2xl mx-auto">
                            <p className="text-xl text-white">
                                Led by brothers Andrew and Mark O'Keeffe, we are a boutique brand
                                communications agency where you get to deal directly with the creatives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Who We Are Section */}
            <div className="max-w-7xl mx-auto mb-20">

            </div>

            {/* Our Team Section */}
            <div className="max-w-7xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
                    Our Team
                </h3>
                <div className="grid gap-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className=" overflow-hidden transition-transform duration-300 flex flex-col justify-center items-center hover:scale-105"
                        >
                            <img
                                className="w-20 rounded-full h-20 object-cover"
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s'}
                                alt={member.name}
                            />
                            <div className="p-6 flex flex-col justify-center items-center">
                                <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                                <p className="mt-1 text-indigo-600 font-medium">{member.position}</p>
                                <p className="mt-4 text-gray-500">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}