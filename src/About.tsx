import '../src/css/about.css';

// https://www.w3schools.com/cssref/pr_background-position.asp
// https://www.w3schools.com/howto/howto_css_blurred_background.asp

function About() {
    // const style = {
    //     heroImage: {
    //           /* Add the blur effect */
    //         filter: "blur(8px)",
    //         -webkit-filter: blur(8px),

    //         backgroundImage: `url(https://raw.githubusercontent.com/DonRP/ABFD/master/game/gui/main_menu.webp)`,
    //         backgroundColor: "##000",
    //         backgroundPosition: "center",
    //         backgroundRepeat: "no-repeat",
    //         backgroundSize: "cover",
    //         height: "100vh",
    //         position: "relative",
    //         marginTop: '-70px',
    //         fontSize: '50px',

    //         // height: '100vh',
    //         // marginTop: '-70px',
    //         // fontSize: '50px',
    //         // backgroundSize: 'cover',
    //         // backgroundRepeat: 'no-repeat',    
    //     },
    // };
    return (
        <>
            <div className="bgImage"></div>
            <div >
                <h1>I am John Doe</h1>
                <p>And I'm a Photographer</p>
            </div>
        </>
    );
}

export default About;
