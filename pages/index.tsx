import React from 'react';
import Header from "@/components/Header";
import Head from "next/head";
import { useRouter } from 'next/router';

const Home: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Welcome to our website" />
            </Head>
            <Header />
            <main>
                <section className="bg-gray-100 py-20 text-center">
                    <div className="container mx-auto">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the ToDO-Project</h1>
                        <p className="text-lg text-gray-700">Explore our services to find what you need</p>
                    </div>
                </section>
                <section className="py-20 text-center">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Features</h2>
                        <div className="flex flex-wrap justify-center">
                            <div className="p-8 w-full sm:w-1/2 md:w-1/3">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy to Use</h3>
                                <p className="text-lg text-gray-700">Our website is designed with simplicity in mind, making it easy for you to navigate.</p>
                            </div>
                            <div className="p-8 w-full sm:w-1/2 md:w-1/3">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsive</h3>
                                <p className="text-lg text-gray-700">Enjoy a seamless experience on any device, whether it's a desktop, tablet, or smartphone.</p>
                            </div>
                            <div className="p-8 w-full sm:w-1/2 md:w-1/3">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast Loading</h3>
                                <p className="text-lg text-gray-700">Experience lightning-fast loading times, ensuring you can access the information you need quickly.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-green-500 py-20 text-center">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
                        <button onClick={() => router.push("/register")} className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Sign Up Now</button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;