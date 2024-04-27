import Header from "@/components/Header";
import MyProjectsOverview from "@/components/projects/MyProjectOverview";
import Head from "next/head";


const MyProjectsPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Projects</title>
                <meta name="description" content="Projects page" />
            </Head>
            <Header />
            <main>
                <MyProjectsOverview></MyProjectsOverview>
            </main>
        </>
    )
};

export default MyProjectsPage;