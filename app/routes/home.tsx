import type {Route} from "./+types/home";
import Navbar from "~/componets/Navbar";
import {resumes} from "~/routes/constants";
import ResumeCard from "~/componets/ResumeCard";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {usePuterStore} from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Resumind"},
        {name: "description", content: "Smart feedback for your dream job!"},
    ];
}

export default function Home() {

    const { auth } = usePuterStore();

    //User access to navigate
    const navigate = useNavigate();


    //If user is not authenticated, redirect to auth page
    useEffect (() => {
        if (!auth.isAuthenticated) {
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated])


    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar/>

            <section className="main-section">
                <div className="page-heading">
                    <h1>Track Your Applications & Resume Ratings</h1>
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                </div>

                {resumes.length > 0 && (
                    <div className="resumes-section">
                        {resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume}/>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};