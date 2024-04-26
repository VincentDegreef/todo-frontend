import Header from "@/components/Header";
import LoginForm from "@/components/user/LoginForm";
import Head from "next/head";


const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login page" />
            </Head>
            <Header></Header>
            <main>
                <LoginForm></LoginForm>
            </main>
        </>
    )
};

export default Login;