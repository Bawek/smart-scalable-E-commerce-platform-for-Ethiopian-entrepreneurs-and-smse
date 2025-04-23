"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SwapHorizontalCircle } from "@mui/icons-material";
import { ArrowDown, Paintbrush, RocketIcon } from "lucide-react";
import Link from "next/link";
import { FaBoxes, FaChartLine, FaCreditCard, FaStore } from "react-icons/fa";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function AboutPage() {
    const team = [
        {
            name: 'Amare Zewudie',
            role: 'CEO & Founder',
            bio: 'Visionary leader driving digital transformation',
            initials: 'AZ',
            image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7-KnN6YFT_m8dHeRsqR1YZvf2BV1PZTtJw&s'
        },
        {
            name: 'Mebrat Matebie',
            role: 'CTO',
            bio: 'Tech architect behind our platform',
            initials: 'MM'
            ,
            image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7-KnN6YFT_m8dHeRsqR1YZvf2BV1PZTtJw&s'
        },
        {
            name: 'Baweke Mekonnen',
            role: 'COO',
            bio: 'Operations excellence strategist',
            initials: 'BM',
            image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7-KnN6YFT_m8dHeRsqR1YZvf2BV1PZTtJw&s'
        },
        {
            name: 'Birihanu Tadele',
            role: 'CFO',
            bio: 'Financial stewardship expert',
            initials: 'BT',
            image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7-KnN6YFT_m8dHeRsqR1YZvf2BV1PZTtJw&s'
        }
    ];

    return (
        <>
            <section className="header relative flex h-screen max-h-860-px">
                <div className="container mx-auto flex flex-wrap">
                    <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
                        <div className="container px-4 mx-auto text-center space-y-6">
                            <Badge variant="secondary" className="text-sm px-4 py-1">
                                Since 2017
                            </Badge>
                            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight max-w-3xl mx-auto">
                                Empowering Ethiopian Commerce Through Innovation
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Join hundreds of entrepreneurs in our journey to digital transformation
                            </p>
                            <Button size="lg" className="rounded-full bg-orange-700 px-8 gap-2">
                                <RocketIcon className="h-4 w-4" />
                                Start Your Journey
                            </Button>
                        </div>
                    </div>
                </div>
                <img
                    className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVo5Ilmuy0_5TOWLIdmkTobRB8CxAqaicbg&s"
                    alt="..."
                />
            </section>

            <section className="relative bg-blueGray-100">
                <div
                    className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
                    style={{ transform: "translateZ(0)" }}
                >
                    <ArrowDown className="w-6 h-6 text-blue-500" />

                </div>
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg">
                                <img
                                    alt="..."
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                                    className="w-full align-middle rounded-t-lg"
                                />
                                <blockquote className="relative p-8 mb-4">
                                    <SwapHorizontalCircle className="w-6 h-6 text-blue-500" />

                                    <h4 className="text-xl font-bold text-gray-900">
                                        Great for your awesome
                                    </h4>
                                    <p className="text-md font-light mt-2 text-gray-950">
                                        Since 2017, we've been dedicated to transforming the digital landscape
                                        for Ethiopian businesses. Our platform combines cutting-edge technology
                                        with local market understanding to drive real results.
                                    </p>
                                </blockquote>
                            </div>
                        </div>

                        <div className="w-full md:w-6/12 px-4">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-6/12 px-4">
                                    <div className="relative flex flex-col mt-4">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                <FaStore className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <h6 className="text-xl mb-1 font-semibold">
                                                Custom Storefronts
                                            </h6>
                                            <p className="mb-4 text-blueGray-500">
                                                Create unique digital storefronts with drag-and-drop builder and customizable templates.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col min-w-0">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                <FaCreditCard className="w-6 h-6 text-green-500" />
                                            </div>
                                            <h6 className="text-xl mb-1 font-semibold">
                                                Payment Integration
                                            </h6>
                                            <p className="mb-4 text-blueGray-500">
                                                Secure payment processing with CBE Birr integration and real-time transaction monitoring.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-6/12 px-4">
                                    <div className="relative flex flex-col min-w-0 mt-4">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                <FaBoxes className="w-6 h-6 text-purple-500" />
                                            </div>
                                            <h6 className="text-xl mb-1 font-semibold">
                                                Inventory Management
                                            </h6>
                                            <p className="mb-4 text-blueGray-500">
                                                Real-time stock tracking with automated alerts and multi-warehouse support.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col min-w-0">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                <FaChartLine className="w-6 h-6 text-orange-500" />
                                            </div>
                                            <h6 className="text-xl mb-1 font-semibold">
                                                Merchant Dashboard
                                            </h6>
                                            <p className="mb-4 text-blueGray-500">
                                                Comprehensive sales analytics and order management system with real-time insights.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto overflow-hidden pb-20">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto">
                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <Paintbrush className="text-xl text-purple-500 w-6 h-6" />
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                Shop Builder Features
                            </h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                Empower merchants with intuitive tools to create professional online stores.
                                All builder components are designed for seamless integration and brand customization.
                            </p>
                            <div className="block pb-6">
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Template Gallery
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Drag-and-Drop Editor
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Mobile Preview
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Color Themes
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Product Widgets
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    SEO Tools
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Analytics Integration
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Multi-language Support
                                </span>
                            </div>
                            <Link
                                href="/builder-documentation"
                                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
                            >
                                Explore Builder Tools
                                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
                            </Link>
                        </div>

                        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
                            <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                                <img
                                    alt="..."
                                    src="/img/component-btn.png"
                                    className="w-full align-middle rounded absolute shadow-lg max-w-100-px left-145-px -top-29-px z-3"
                                />
                                <img
                                    alt="..."
                                    src="/img/component-profile-card.png"
                                    className="w-full align-middle rounded-lg absolute shadow-lg max-w-210-px left-260-px -top-160-px"
                                />
                                <img
                                    alt="..."
                                    src="/img/component-info-card.png"
                                    className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px left-40-px -top-225-px z-2"
                                />
                                <img
                                    alt="..."
                                    src="/img/component-info-2.png"
                                    className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                                />
                                <img
                                    alt="..."
                                    src="/img/component-menu.png"
                                    className="w-full align-middle rounded absolute shadow-lg max-w-580-px -left-20-px top-210-px"
                                />
                                <img
                                    alt="..."
                                    src="/img/component-btn-pink.png"
                                    className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex flex-wrap items-center pt-32">
                        <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
                            <div className="justify-center flex flex-wrap relative">
                                <div className="my-4 w-full lg:w-6/12 px-4">
                                    <Link
                                        href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                                        target="_blank"
                                    >
                                        <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                                            <img
                                                alt="..."
                                                className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/svelte.jpg"
                                            />
                                            <p className="text-lg text-white mt-4 font-semibold">
                                                Svelte
                                            </p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index"
                                        target="_blank"
                                    >
                                        <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                                            <img
                                                alt="..."
                                                className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg"
                                            />
                                            <p className="text-lg text-white mt-4 font-semibold">
                                                ReactJS
                                            </p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index"
                                        target="_blank"
                                    >
                                        <div className="bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8">
                                            <img
                                                alt="..."
                                                className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg"
                                            />
                                            <p className="text-lg text-white mt-4 font-semibold">
                                                NextJS
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                                    <Link
                                        href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index"
                                        target="_blank"
                                    >
                                        <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                                            <img
                                                alt="..."
                                                className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/js.png"
                                            />
                                            <p className="text-lg text-white mt-4 font-semibold">
                                                JavaScript
                                            </p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index"
                                        target="_blank"
                                    >
                                        <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8">
                                            <img
                                                alt="..."
                                                className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg"
                                            />
                                            <p className="text-lg text-white mt-4 font-semibold">
                                                Angular
                                            </p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index"
                                        target="_blank"
                                    >
                                        <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                                            <img
                                                alt="..."
                                                className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg"
                                            />
                                            <p className="text-lg text-white mt-4 font-semibold">
                                                Vue.js
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <i className="fas fa-drafting-compass text-xl"></i>
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                Javascript Components
                            </h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                In order to create a great User Experience some components
                                require JavaScript. In this way you can manipulate the elements
                                on the page and give more options to your users.
                            </p>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                We created a set of Components that are dynamic and come to help
                                you.
                            </p>
                            <div className="block pb-6">
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Alerts
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Dropdowns
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Menus
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Modals
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Navbars
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Popovers
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Tabs
                                </span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                    Tooltips
                                </span>
                            </div>
                            <Link
                                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=nnjs-index"
                                target="_blank"
                                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
                            >
                                View all{" "}
                                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
                            </Link>
                        </div>
                    </div> */}
                </div>


                {/* Leadership Section */}
                <section className="bg-accent/50">
                    <div className="container px-4 mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Visionary Leadership
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Meet the team driving Ethiopia's digital commerce revolution
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member) => (
                                <Card key={member.name} className="group hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6 flex flex-col items-center text-center">
                                        <Avatar className="h-24 w-24 mb-6">
                                            <AvatarImage src={member.image} />
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {member.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <CardTitle className="text-xl font-semibold">{member.name}</CardTitle>
                                        <Badge variant="outline" className="mt-2 mb-3">
                                            {member.role}
                                        </Badge>
                                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </section>

            {/* <section className="block relative z-1 bg-blueGray-600">
                <div className="container mx-auto">
                    <div className="justify-center flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4  -mt-24">
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4">
                                    <h5 className="text-xl font-semibold pb-4 text-center">
                                        Login Page
                                    </h5>
                                    <Link href="/auth/login">
                                        <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                                            <img
                                                alt="..."
                                                className="align-middle border-none max-w-full h-auto rounded-lg"
                                                src="/img/login.jpg"
                                            />
                                        </div>
                                    </Link>
                                </div>

                                <div className="w-full lg:w-4/12 px-4">
                                    <h5 className="text-xl font-semibold pb-4 text-center">
                                        Profile Page
                                    </h5>
                                    <Link href="/profile">
                                        <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                                            <img
                                                alt="..."
                                                className="align-middle border-none max-w-full h-auto rounded-lg"
                                                src="/img/profile.jpg"
                                            />
                                        </div>
                                    </Link>
                                </div>

                                <div className="w-full lg:w-4/12 px-4">
                                    <h5 className="text-xl font-semibold pb-4 text-center">
                                        Landing Page
                                    </h5>
                                    <Link href="/landing">
                                        <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                                            <img
                                                alt="..."
                                                className="align-middle border-none max-w-full h-auto rounded-lg"
                                                src="/img/landing.jpg"
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}