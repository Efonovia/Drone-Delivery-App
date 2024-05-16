import React from 'react';
import "../styles/home.css"

function Home() {


    return (
        <>
            <section className="services" id="services">
                <div className="container">
                    <h1>NAME OF <span className='home-span'>APP</span></h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        sit amet sem ligula. Mauris ut nisl a nibh luctus sodales.
                        Phasellus dictum egestas sem, in euismod odio condimentum
                        porttitor. Aenean diam sed neque ultricies, sit amet
                        pellentesque quam pulvinar. Integer non orci orci. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        mattis lorem at ligula euismod, gravida tincidunt nunc
                        euismod. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Morbi sed dolor ac magna tincidunt ornare a sit amet
                        dui. Sed euismod urna suscipit, luctus neque ut, ultrices
                        tellus.
                    </p>
                </div>
            </section>
            <section className="serv">
                <h1 style={{textAlign: "center", paddingBottom: "30px"}}>OUR DRONES</h1>
                <div className="container">
                    <div>
                        <img src="https://i.ibb.co/y4sTrtT/web-design.png" alt="Web Design" />
                        <h4>SMALL</h4>
                        <p>Max Capacity: <span className='home-span'>10KG</span></p>
                        <p>Price: <span className='home-span'>N10, 000</span></p>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/bdvKL6H/cheap-price.png" alt="Price" />
                        <h4>MEDIUM</h4>
                        <p>Max Capacity: <span className='home-span'>25KG</span></p>
                        <p>Price: <span className='home-span'>N25, 000</span></p>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/17W1hVy/performance.png" alt="Performance" />
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