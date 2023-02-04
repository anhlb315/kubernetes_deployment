import { useDispatch, useSelector } from "react-redux"
import { setUserAction } from "../slices/userSlice";

export const useUserState = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const setUser = (user) => dispatch(setUserAction(user))
    return { user, setUser };
}