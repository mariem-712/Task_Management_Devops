import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom';

export default class Layout extends Component {
    render() {
        return <>
            <Navbar />

            <Outlet/>


            {/* <footer className="bg-dark text-white text-center p-3 fixed-bottom">
                <h3>
                    footer
                </h3>
            </footer> */}


        </>
    }
}
