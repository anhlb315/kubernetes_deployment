import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { RoomService, UserService } from "../../services";
import { useUserState } from '../../middleware';
import { useNavigate } from "react-router-dom";

export function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const { user } = useUserState();
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getLeaderboard().then((result) => {
            setLeaders(result);
        });
    }, []);

    return <div className="leaderboard-container">
        <h1>Leaderboard</h1>

        <div className="leaderboard-content">
            <ul className="leaderboard-ul">
                {
                    leaders.length > 0 && leaders.map((leader) => (
                        <li className="leaderboard-li" key={leader._id}>
                            <div className="username">{leader.username}</div>

                            <div className="score">{leader.score}</div>

                            {
                                user?.username === leader.username
                                    ? <Button disabled>You</Button>
                                    : <Button onClick={() => {
                                        RoomService.createRoom(leader.username).then((result) => {
                                            navigate('/home/room', {
                                                state: {
                                                    room: result,
                                                }
                                            })
                                        })
                                    }}>Challenge</Button>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
}