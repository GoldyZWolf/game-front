import React from 'react'
import authService from '../services/auth.service'
import {useState} from 'react';

const Home = () => {
   const [test, setTest] = useState(" ")

   const y = (() => {
    authService.home()
        .then((res) => {
            //success:
            console.log(res);
            setTest(res.data)
        }).catch((e) => {
            console.log("Error: "+e);
            setTest("Error: "+e);
        })
        return;
});


    return (
        <>
            <h2>Home</h2>
            <button onClick={y}>Test</button>
            <br/>{test}
        </>
    )
}
export default Home