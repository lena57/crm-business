import './App.css';
import AllRoutes from "./routes";
import 'bootstrap/dist/css/bootstrap.css';


function App() {


  return (
    <div className="App">

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="/clients">Clients</a>
              <a className="nav-link" href="/services">Services</a>
              <a className="nav-link" href="/orders">Orders</a>
            </div>
          </div>
        </div>
      </nav>



      <AllRoutes/>


    </div>
  );
}

export default App;
