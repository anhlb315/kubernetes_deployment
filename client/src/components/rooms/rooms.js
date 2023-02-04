import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../middleware";
import { RoomService } from "../../services";

export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const { user } = useUserState();
    const navigate = useNavigate();

    useEffect(() => {
        RoomService.listRooms().then((result) => {
            setRooms(result.filter((r) => r.active));
        })
    }, []);

    const deleteRoom = async (room) => {
        await RoomService.deleteRoom(room);
        RoomService.listRooms().then((result) => {
            setRooms(result.filter((r) => r.active));
        });
    }

    return <div className="rooms-container">
        <h2>Rooms</h2>

        <div className="rooms-content">
            {
                rooms.length > 0 && rooms.map((room) => (
                    <div className="room-item" key={room._id}>
                        <div className="room-title">
                            Match with {room.participants.filter(
                                participant => participant !== user?.username
                            )}
                        </div>

                        <div className="btns">
                            <Button onClick={() => navigate('/home/room', {
                                state: {
                                    room
                                }
                            })}>Enter</Button>
                            <Button onClick={() => deleteRoom(room._id)}>Delete</Button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
}