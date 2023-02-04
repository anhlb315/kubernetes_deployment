import { joinRandomMatchAPI, playAPI } from "../../api"

const play = async ({ room, move }) => {
    return playAPI({ room, move }).then((result) => {
        // console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

const joinRandomMatch = async () => {
    return joinRandomMatchAPI().then((result) => {
        console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

export const GameService = {
    play,
    joinRandomMatch,
}