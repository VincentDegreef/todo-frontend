import React, { useState } from 'react';
import Header from "@/components/Header";
import Head from "next/head";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { MdEdit } from "react-icons/md";
import UserService from '@/services/UserService';

const Profile: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [numberofTodos, setNumberofTodos] = useState<number>(0);

    const fetchUserProfile = async () => {
        if(sessionStorage.getItem('loggedInUserDetails') === null){
            return;
        }
        
        const userDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails') ?? '');

        const response = await UserService.getUserTodos(userDetails.id);
        if(!response.ok){
            setUsername(userDetails.username);
            setNumberofTodos(0);
            return;
        }
        const todos = await response.json();
        setNumberofTodos(todos.length);

        setUsername(userDetails.username);
        return userDetails;
    };

    const { data, isLoading, error } = useSWR('userProfile', fetchUserProfile)

    useInterval(() => {
        mutate('userProfile', fetchUserProfile());
    }, 2000);

    return (
        <>
            <Head>
                <title>Profile</title>
                <meta name="description" content="Profile page" />
            </Head>
            <Header />
            <main>
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold text-center mt-8 mb-4">Profile of {username}</h1>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {isLoading && <p>Loading...</p>}
                        {error && <p>Error loading profile</p>}
                        {data && (
                            <div>
                                <div className='flex justify-end'>
                                    <MdEdit size={25} className="text-blue-500 text-xl hover:text-blue-700 cursor-pointer"/>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                                    <p className="text-gray-900">{data.username}</p>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                    <p className="text-gray-900">{data.email}</p>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Tasks:</label>
                                    <p className="text-gray-900">{numberofTodos}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Profile;