import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Head from "next/head";
import { useRouter } from 'next/router';

const Home: React.FC = () => {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("loggedInUserDetails") === null) {
            setLoggedIn(false);
        }
        setLoggedIn(true);
    }, []);

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Welcome to our website" />
                <link rel="icon" href="public/favicon.ico" />
            </Head>
            <Header />
            <main className='grid grid-rows-3'>
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
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tracking Todo's</h3>
                                <p className="text-lg text-gray-700">Track your todo's in an overview and add / delete whenever</p>
                            </div>
                            <div className="p-8 w-full sm:w-1/2 md:w-1/3">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Make Project</h3>
                                <p className="text-lg text-gray-700">Make different project for different needs</p>
                            </div>
                            <div className="p-8 w-full sm:w-1/2 md:w-1/3">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Group projects</h3>
                                <p className="text-lg text-gray-700">The ability to add people to your existing projects</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-green-500 py-20 text-center">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
                        {!loggedIn && (<button onClick={() => router.push("/register")} className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Sign Up Now</button>)}
                        <button onClick={() => router.push("/todo/overview")} className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Tasks</button>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;