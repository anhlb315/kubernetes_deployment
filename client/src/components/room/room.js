import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { cuteCat, cuteDog, handPaper, handRock, handScissors } from "../../assets/images/images";
import { useUserState } from "../../middleware";
import { GameService, RoomService } from "../../services";

export function Room() {
    const { state } = useLocation();
    const { user } = useUserState();
    const [disabled, setDisabled] = useState(false);
    const [chat, setChat] = useState(undefined);
    const [matchResult, setMatchResult] = useState(undefined);

    useEffect(() => {
        checkRoomState();
        const interval = setInterval(checkRoomState, 5000);

        return () => clearInterval(interval);
    }, [])

    const play = async (move) => {
        if (!!state.room) {
            await GameService.play({ room: state.room._id, move });
            checkRoomState();
            setDisabled(true);
        }
    }
    const checkRoomState = async () => {
        RoomService.listRoomChat(state.room?._id)
            .then((result) => {
                setChat(result)
                if (result.filter((c) => c.from === user?.username).length > 0) {
                    setDisabled(true);
                }
                if (result.length >= 2) {
                    RoomService.getActiveMatch(state.room?._id).then((result) => {
                        if (result.winner === "CONST_DRAW") {
                            setMatchResult("Draw");
                        } else if (result.winner === user?.username) {
                            setMatchResult("You won");
                        } else {
                            setMatchResult("You lose");
                        }
                    });
                }
            });
    };

    if (!!state?.room) {
        const room = state.room;

        return <div className="room-container">
            <h2>Match with {room.participants.filter(
                participant => participant !== user?.username
            )}</h2>

            <div className="chat-container">
                <div className="chat-item">
                    <img src={cuteDog} width="300" height="300" className={!!chat && chat.filter((c) => c.from === room.participants.filter(
                        participant => participant !== user?.username
                    )[0]).length > 0 && "played-img"} />

                    <div>
                        {room.participants.filter(
                            participant => participant !== user?.username
                        )}
                    </div>

                    {
                        !!chat && chat.filter((c) => c.from === room.participants.filter(
                            participant => participant !== user?.username
                        )[0]).length > 0 && (<div className="overlay">PLAYED</div>)
                    }
                </div>

                <div className="chat-item">
                    <img src={cuteCat} width="300" height="300" className={
                        !!chat && chat.length > 0 && chat.filter((c) => c.from === user?.username).length > 0 ? "played-img" : ""
                    } />

                    <div>You</div>

                    {
                        !!chat && chat.length > 0 && chat.filter((c) => c.from === user?.username).length > 0 ? (<div className="overlay">PLAYED</div>) : <></>
                    }
                </div>

                <div className="chat-status">

                </div>
            </div>

            {
                !!matchResult ? <div className="match-result">{matchResult}</div> : <div className="options">
                    <img onClick={() => play("rock")} className={`option ${disabled && 'disabled'}`} src={handRock} />
                    <img onClick={() => play("scissors")} className={`option ${disabled && 'disabled'}`} src={handScissors} />
                    <img onClick={() => play("paper")} className={`option ${disabled && 'disabled'}`} src={handPaper} />
                </div>
            }
        </div>
    }
    return <Navigate replaca to="/home/rooms" />
}