import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Leaderboard, Profile, Room, Rooms } from "../../components";
import { Footer, Header, SideBar } from "../../layout";
import { useUserState } from "../../middleware";
import { UserService } from "../../services";

export function Home() {
    const {setUser} = useUserState();

    useEffect(() => {
        UserService.getUserInfo().then((result) => {
            setUser(result);
        })
    }, []);

    return <div className="page-container home-page">
        <SideBar />

        <Header />

        <div className="home-container">
            <Routes>
                <Route path="profile" element={<Profile />} />
                <Route path="rooms" element={<Rooms />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="room"  element={<Room />}/>
            </Routes>
        </div>

        <Footer />
    </div>
}