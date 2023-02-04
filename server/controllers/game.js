const { createMatch, updateMatch } = require("../db/api/Match/mutations");
const { getActiveMatchInRoom, deleteMatchesInRoom, listMatchesForPlayer } = require("../db/api/Match/queries");
const { createMessage, deleteMessagesInRoom } = require("../db/api/Message/mutations");
const { listMessagesInRoom, getUserLastUserMoveFromMatch, getLastMoveFromMatch } = require("../db/api/Message/queries");
const { createRoom, deleteRoom, updateRoom } = require("../db/api/Room/mutations");
const { listRoomsForPlayer, getRoom } = require("../db/api/Room/queries");
const { giveUserOneScore } = require("../db/api/User/mutations");
const { listTopPlayers, getUser, getRandomPlayer } = require("../db/api/User/queries")

const getUserInfo = (req, res, next) => {
    const { username } = req.user;

    getUser(username).then((result) => {
        res.status(200).send({
            message: 'Get user',
            data: result
        })
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err
        })
    })
}

const leaderboard = (req, res, next) => {
    listTopPlayers().then((result) => {
        res.status(200).send({
            message: 'Get leaderboard',
            data: result
        })
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err
        })
    })
}

const connect = (req, res, next) => {
    const { player } = req.body; // username
    const { username } = req.user; // username
    if (player === username) {
        res.status(400).send({
            message: "Operation failed",
            err: 'Cannot challenge yourself'
        })
    } else {
        createRoom({ participants: [username, player] }).then((result) => {
            res.status(201).send({
                message: 'Room created',
                data: result,
            })
        }).catch(err => {
            console.log(err);
            res.status(400).send({
                message: "Operation failed",
                err
            })
        })
    }
}

const delRoom = async (req, res, next) => {
    const { room } = req.body;
    const { username } = req.user;
    try {
        const roomGet = await getRoom(room);
        if (!!roomGet && roomGet.participants.includes(username)) {
            await deleteRoom(room);
            await deleteMessagesInRoom(room);
            res.status(200).send({
                message: 'Room deleted',
                data: 'Delete OK',
            })
        } else {
            throw new Error("Not authorized");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err
        })
    }
}

const listRooms = (req, res, next) => {
    const { username } = req.user; // username
    listRoomsForPlayer(username).then((result) => {
        res.status(200).send({
            message: 'List rooms',
            data: result,
        })
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err
        })
    })
}

const listChat = (req, res, next) => {
    const { room } = req.query; // username
    const { username } = req.user;

    getRoom(room).then((result) => {
        // check user belongs to room
        if (!!result && result.participants.includes(username)) {
            listMessagesInRoom(room).then((result) => {
                res.status(200).send({
                    message: 'List chat',
                    data: result,
                })
            }).catch(err => {
                console.log(err);
                res.status(400).send({
                    message: "Operation failed",
                    err
                })
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err
        })
    });
}

const sendMessage = async (req, res, next) => {
    const { room, type, msg } = req.body;
    const { username } = req.user;

    try {
        const roomResult = await getRoom(room);

        if (!!roomResult && roomResult.active === false) {
            throw new Error("Room not active.");
        }

        if (!!roomResult && roomResult.participants.includes(username)) {
            if (type === 'move') {
                const activeMatch = await getActiveMatchInRoom(room);

                if (!!activeMatch) {
                    // has active match
                    const lastMove = await getUserLastUserMoveFromMatch(username, activeMatch._id);
                    if (!!lastMove) {
                        // user already moved
                        res.status(400).send({
                            message: "Operation failed",
                            err: "User already played"
                        })
                    } else {
                        // create a move
                        const data = await createMessage({
                            type, from: username, to: room, match: activeMatch._id, msg
                        });
                        // TODO: check all moved, decide winner
                        const opLastMove = await getLastMoveFromMatch(activeMatch._id);

                        const userMove = msg;
                        const opMove = opLastMove.msg;

                        let result = "";
                        if (
                            (userMove === "rock" && opMove === "scissors") ||
                            (userMove === "scissors" && opMove === "paper") ||
                            (userMove === "paper" && opMove === "rock")
                        ) {
                            await updateMatch(activeMatch._id, {
                                winner: username,
                                losers: [
                                    opLastMove.from,
                                ],
                                active: false,
                            });
                            await giveUserOneScore(username);
                            result = "You won";
                        } else if (
                            (opMove === "rock" && userMove === "scissors") ||
                            (opMove === "scissors" && userMove === "paper") ||
                            (userMove === "paper" && opMove === "rock")
                        ) {
                            await updateMatch(activeMatch._id, {
                                winner: opLastMove.from,
                                losers: [
                                    username,
                                ]
                            });
                            await giveUserOneScore(opLastMove.from);
                            result = "You lose";
                        } else {
                            // draw
                            await updateMatch(activeMatch._id, {
                                winner: "CONST_DRAW",
                                losers: [
                                    username,
                                    opLastMove.from,
                                ]
                            });
                            result = "Draw";
                        }

                        // set inactive room
                        await updateRoom(room, {
                            active: false,
                        });

                        res.status(200).send({
                            message: 'Send message',
                            data: {
                                ...data,
                                result
                            },
                        })
                    }
                } else {
                    // no active match
                    const newMatch = await createMatch({ room });
                    const data = await createMessage({
                        type, from: username, to: room, match: newMatch._id, msg
                    });
                    res.status(200).send({
                        message: 'Send message',
                        data,
                    })
                }
            } else if (type === 'message') {
                // normal message
                const data = await createMessage({
                    type, from: username, to: room, msg
                });
                res.status(200).send({
                    message: 'Send message',
                    data,
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err
        })
    }
}

const getMatchC = async (req, res, next) => {
    const { room } = req.query; // username

    try {
        const match = await getActiveMatchInRoom(room);

        res.status(200).send({
            message: 'get match',
            data: match,
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err
        })
    }
}

const listMatchesC = async (req, res, next) => {
    const { username } = req.user;

    try {
        const result = await listMatchesForPlayer(username);

        res.status(200).send({
            message: 'list match',
            data: result,
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err
        })
    }
}

const random = async (req, res, next) => {
    const { username } = req.user;
    try {
        let ok = false;
        let opponent = null;
        while (!ok) {
            opponent = (await getRandomPlayer())[0];
            if (opponent.username === username) {
                continue;
            }
            ok = true;
        }
        createRoom({ participants: [username, opponent.username] }).then((result) => {
            res.status(201).send({
                message: 'Room created',
                data: result,
            })
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Operation failed",
            err
        })
    }
}

module.exports = {
    getUserInfo,
    leaderboard,
    connect,
    listRooms,
    listChat,
    sendMessage,
    delRoom,
    getMatchC,
    listMatchesC,
    random,
}
