import Header from "@/components/Header";
import RegisterForm from "@/components/user/RegisterForm";
import Head from "next/head";

const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Register page" />
            </Head>
            <Header></Header>
            <main>
                <RegisterForm></RegisterForm>
            </main>
        </>
    )
};

export default Register;