import { useEffect, useState } from "react";
import { cuteCat } from "../../assets/images/images";
import { useUserState } from "../../middleware";
import { UserService } from "../../services";

export function Profile() {
    const { user } = useUserState();
    const [history, setHistory] = useState();

    useEffect(() => {
        UserService.getMatchHistory().then((result) => setHistory(result));
    }, []);

    const getTimestamp = (t) => {
        const d = new Date(t);
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
    }

    const getMatchResult = (match) => {
        if (match.winner === "CONST_DRAW") {
            return "Draw";
        } else if (match.winner === user?.username) {
            return "You won";
        } else {
            return "You lose";
        }
    }

    return <div className="profile-container">
        <div className="inner">
            <div className="info-col">
                <div className="username">
                    <h4>Username:</h4>

                    <h4>{user?.username}</h4>
                </div>

                <h5>
                    Score: {user?.score}
                </h5>

                <h5>
                    Coin: {user?.coin}
                </h5>
            </div>

            <div className="avatar-col">
                <img src={cuteCat} width="300" height="300" />
            </div>
        </div>

        {/* match history herer */}
        <div className="match-history">
            <h4>Match history</h4>

            <div className="inner">
                {
                    !!history && history.length > 0 && history.map((m) => (
                        <div className="match-item" key={m._id}>
                            <div>{getTimestamp(m.updatedAt)}:</div>

                            <div>{getMatchResult(m)}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
}