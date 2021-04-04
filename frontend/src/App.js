import Layout from "./components/Layout";
import {BrowserRouter, Route} from 'react-router-dom';
import Login from "./pages/login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
        <Layout>
            <BrowserRouter>
                <Route path="/" component={Login} exact/>
                <Route path="/register" component={Register} exact/>
            </BrowserRouter>
        </Layout>
    </div>
  );
}

export default App;
