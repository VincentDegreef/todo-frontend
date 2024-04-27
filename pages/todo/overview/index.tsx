import Header from "@/components/Header";
import CreateTodoPopup from "@/components/todo/CreateTodoPopup";
import TodoOverview from "@/components/todo/TodoOverview";
import Head from "next/head";
import { useState } from "react";


const OverviewPage: React.FC = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleCreateTaskClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <Head>
                <title>Todo Overview</title>
                <meta name="description" content="Todo Overview" />
            </Head>
            <Header></Header>
            <main>
                <h1 className="pageTitle">Todo Overview</h1>
                <div>
                    <button className="bg-green-500 p-3 rounded-md text-white font-bold m-4" onClick={handleCreateTaskClick}>
                        Create Task
                    </button>
                </div>
                <TodoOverview></TodoOverview>
                {isPopupOpen && <CreateTodoPopup handleClosePopup={handleClosePopup} />}

            </main>
        </>
    );
};

export default OverviewPage;