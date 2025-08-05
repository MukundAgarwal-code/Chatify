import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";

const useGetRealTimeMessage = () => {
    const socket = io(`${BASE_URL}`, { withCredentials: true });

    const {messages} = useSelector(store=>store.message);
    const dispatch = useDispatch();
    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            dispatch(setMessages([...messages, newMessage]));
        });
        return () => socket?.off("newMessage");
    },[setMessages, messages]);
};
export default useGetRealTimeMessage;