import React from "react"

const Home = () => {
  return (
    <div>
      <div className="Home-Wrapper">
        <div className="homeLeftDiv">
        <div className="home-img-div d-flex align-items-center justify-content-center">
            <img src="../resources/trainer.png" alt="Trainer-profile" className="profileImg"/>
            <div className="profileImgText">
                <p> Gold medalist  M.tech NSIT Delhi University</p>
            </div>
        </div>
        </div>
        <div className="homeRightDiv">
        <div className="home-content-div d-flex align-items-center justify-content-center">
            <div className="rightDivContent d-flex align-items-center justify-content-center">
              <div className="innerRightDiv">
              <h2>Welcome to the <span className="online">Online</span> Learning Center</h2>
              <div className="achievement">
                <div className="achievementIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                   <path d="M20.4 36.5C19.5 36.7 17.5 37.8 15.9 37.5C14.4 40.3 12.8 42.7 11.3 44C13.4 44.7 15.6 44.6 17.7 44C18.5 45.7 19.3 47.2 20.1 49C21.7 46.3 23.3 43 24.8 39.8C22.5 39.6 21.2 37.2 20.4 36.5ZM29.6 36.5C28.7 37.2 27.5 39.6 25.3 39.8C26.9 43 28.5 46.3 30 49C30.8 47.2 31.6001 45.6 32.4001 44C34.5001 44.6 36.7 44.8 38.8 44C37.3 42.7 35.7001 40.3 34.2001 37.5C32.4001 37.8 30.6 36.7 29.6 36.5ZM25 8.39999C19 8.39999 14 13.3 14 19.4C14 25.5 18.9 30.4 25 30.4C31.1 30.4 36 25.5 36 19.4C36 13.4 31.1 8.39999 25 8.39999ZM28.3 21.3L30.3 27.5L25 23.7L19.7 27.5L21.7 21.3L16.4 17.5H23L25 11.3L27 17.5H33.5L28.3 21.3Z" fill="#5F2DED"/>
                   <path d="M41 10.2C40.2 8.9 37.2 9.4 36.1 8.3C35 7.2 35.5 4.2 34.2 3.4C32.9 2.7 30.5 4.6 29 4.2C27.7 3.9 26.5 1 25 1C23.5 1 22.4 3.9 20.9 4.3C19.4 4.7 17 2.8 15.8 3.5C14.5 4.2 15 7.3 13.9 8.4C12.8 9.5 9.8 9 9 10.3C8.3 11.6 10.2 14 9.8 15.5C9.4 16.9 6.5 18 6.5 19.6C6.5 21.1 9.4 22.3 9.8 23.7C10.2 25.2 8.3 27.6 9 28.9C9.8 30.2 12.8 29.7 13.9 30.8C15 31.9 14.5 34.9 15.8 35.7C17.1 36.4 19.5 34.5 20.9 34.9C22.3 35.3 23.4 38.2 25 38.2C26.5 38.2 27.7 35.3 29.1 34.9C30.6 34.5 33 36.4 34.2 35.7C35.5 34.9 35 31.9 36.1 30.8C37.2 29.7 40.2 30.2 41 28.9C41.7 27.6 39.8 25.2 40.2 23.7C40.6 22.3 43.5 21.2 43.5 19.6C43.5 18.1 40.6 16.9 40.2 15.5C39.8 13.9 41.7 11.5 41 10.2ZM25 32.3C17.9 32.3 12.1 26.5 12.1 19.4C12.1 12.3 17.9 6.5 25 6.5C32.1 6.5 37.9 12.3 37.9 19.4C37.9 26.5 32.1 32.3 25 32.3Z" fill="#5F2DED"/>
                </svg>
                </div>
                <div className="achievementContent">
                    <p>14+ Years Experience In <span>this game, Means Teaching.</span></p>
                </div>
              </div>
              <p className="achievementOtherDetails">I love to work in User Experience & User Interface designing.
                   Because I love to solve the design problem and find easy and better solutions to solve it.
              </p>
            </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
