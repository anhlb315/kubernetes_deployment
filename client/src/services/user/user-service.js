import { getLeaderboardAPI, getUserInfoAPI, listLastMatchesAPI } from "../../api"

const getUserInfo = async () => {
    return getUserInfoAPI().then((result) => {
        // console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

const getLeaderboard = async () => {
    return getLeaderboardAPI().then((result) => {
        // console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

const getMatchHistory = async () => {
    return listLastMatchesAPI().then((result) => {
        console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

export const UserService = {
    getUserInfo,
    getLeaderboard,
    getMatchHistory,
}
