import LogoImg from "../images/Logo.svg";

const Home = () => {
  return (
    <main>
      <div className="main-container">
        <div className="main-header">
          <h1>Welcome to TaskCat</h1>
        </div>
        <div className="main-text">
          <h3>
            A Web App to make and organize <br />
            your task in your daily life
          </h3>
        </div>
        <img src={LogoImg} className="logoImg" />
        <button className="btn">
          <a href="/register">Get Started</a>
        </button>
      </div>
    </main>
  );
};

export default Home;
