import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setMyLocation} from "../MapPage/mapSlice";

import LoginForm from './LoginForm';
import Logo from './Logo';


export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [locationErrorOccurred, setlocationErrorOccurred] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUsernameValid = (username) => {
    const trimmedUsername = username.trim();
    console.log(trimmedUsername);
    return trimmedUsername.length > 0 && trimmedUsername.includes("");
  };


  const handleLogin = () => {
    navigate("/map");
  };

  const onSuccess = (position) => {
    console.log(position);
    dispatch(setMyLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }));
  }

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  const onError = (error) => {
    setlocationErrorOccurred(true);
    console.log(`${error} occurred when trying to get location`)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, locationOptions);
  }, []);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Logo/>
        <LoginForm 
        username={username} 
        setUsername={setUsername}
        onClickHandler={handleLogin}
        disabled={!isUsernameValid(username) || locationErrorOccurred}
        />
      </div>
    </>
  )
}
