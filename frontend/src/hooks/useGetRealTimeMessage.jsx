import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { getSocket } from "../socketClient";

const useGetRealTimeMessage = () => {
    // const {socket} = useSelector(store=>store.socket);
    const {messages} = useSelector(store=>store.message);
    const dispatch = useDispatch();
    // useEffect(()=>{
    //     socket?.on("newMessage", (newMessage)=>{
    //         dispatch(setMessages([...messages, newMessage]));
    //     });
    //     return () => socket?.off("newMessage");
    // },[setMessages, messages]);
    useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handler = newMessage => {
      dispatch(setMessages([...messages, newMessage]));
    };

    socket.on("newMessage", handler);
    return () => {
      socket.off("newMessage", handler);
    };
  }, [dispatch]);
};
export default useGetRealTimeMessage;