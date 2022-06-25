import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Audity</h1>
      </header>
      <body>
        <div>MAP</div>
        <div>PLAYER</div>
        <h2>Welcome to Audity. Create an account and listen to your city.</h2>
        <Link to={'/register'}>Register</Link>
        <Link to={'/log-in'}>Sign in</Link>
        <footer>Lorem ipsum dolor sit amet</footer>
      </body>
    </div>
  );
};

export default HomePage;
