import React, { useState, useCallback,useEffect } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
const VideoChat = () => {
  const [username, setUsername] = useState('haseeb');
  const [roomName, setRoomName] = useState('room_2061');
  // const [roomName, setRoomName] = useState('room_'+localStorage.getItem("AppointmentID"));
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);


  useEffect(() =>handleSubmit(), []);
  const handleLogout = useCallback(event => {
    setToken(null);window.location = "#/TelemedicineAppointments/";
  }, []);
  const handleSubmit = useCallback(
    async event => {
     // event.preventDefault();
      const data = await fetch('http://192.168.30.106:3001/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      console.log(data);
      setToken(data.token);
    },
    [roomName, username]
  );

  let render;
  if (token) {
    render = (<Card style={{ width: "98%" ,height:"8%",marginTop:"5%"}}> <Room roomName={roomName} token={token}  handleLogout={handleLogout} /></Card>
     
    );
  } else {
    render = (
      <Card style={{ width: "98%" }}>
        </Card>
    );
  }
  return render;
};

export default VideoChat;
