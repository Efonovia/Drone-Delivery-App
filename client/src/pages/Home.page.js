import React from 'react';
import "../styles/home.css"
import { dronePic } from '../utils/utils';
function Home() {


    return (
        <>
            <section className="services" id="services">
                <div className="container">
                    <h1><span className='home-span'>FLY-BY</span>DELIVERIES</h1>
                    <p>
                    Welcome to our innovative drone delivery platform, where efficiency meets convenience! Say goodbye to traditional delivery methods and embrace the future of logistics. Our platform empowers users like you to revolutionize how goods are transported, offering a seamless and reliable solution for all your delivery needs. Whether you're a business looking to optimize your supply chain or an individual seeking swift and eco-friendly delivery options, our platform has you covered. With a diverse selection of drones and advanced technology at your fingertips, you can effortlessly schedule, track, and manage deliveries with ease. Join us as we soar to new heights in the world of unmanned aerial delivery.
                    </p>
                </div>
            </section>
            <section className="serv">
                <h1 style={{textAlign: "center", paddingBottom: "30px"}}>OUR DRONES</h1>
                <div className="container">
                    <div>
                        <img src={dronePic.small} alt="Small drone" />
                        <h4>SMALL</h4>
                        <p>Max Capacity: <span className='home-span'>10KG</span></p>
                        <p>Price: <span className='home-span'>N10, 000</span></p>
                    </div>
                    <div>
                        <img src={dronePic["medium"]} alt="Price" />
                        <h4>MEDIUM</h4>
                        <p>Max Capacity: <span className='home-span'>25KG</span></p>
                        <p>Price: <span className='home-span'>N25, 000</span></p>
                    </div>
                    <div>
                        <img src={dronePic.large} alt="Performance" />
                        <h4>LARGE</h4>
                        <p>Max Capacity: <span className='home-span'>40KG</span></p>
                        <p>Price: <span className='home-span'>N40, 000</span></p>
                    </div>
                </div>
            </section>
            <section className="nums">
                <h1 style={{textAlign: "center", padding: "30px"}}>HOW TO MAKE A DRONE DELIVERY</h1>
                <div className="container">
                    <div>
                        <p>1</p>
                        Select a drone and fill in the necessary delivery details
                    </div>
                    <div>
                        <p>2</p>
                        Confirm with the delivery recipient
                    </div>
                    <div>
                        <p>3</p>
                        MAke the payment
                    </div>
                    <div>
                        <p>4</p>
                        Confirm with us
                    </div>
                    <div>
                        <p>5</p>
                        Your delivery gets made
                    </div>
                </div>
            </section>
        </>
    )
}


export default Home