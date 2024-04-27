import Header from "@/components/Header";
import Head from "next/head";


const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Home page" />
            </Head>
            <Header></Header>
            <main>
                <h1 className="pageTitle">Home</h1>
                <p className="text-center"> Welcome to the home page</p>
            </main>
        </>
    );
}

export default Home;