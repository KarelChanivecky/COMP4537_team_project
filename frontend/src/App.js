import Layout from "./components/Layout";
import {BrowserRouter, Route} from 'react-router-dom';
import Login from "./pages/login";
import Register from "./pages/Register";
import Lists from "./pages/lists";
import Items from "./pages/items";
import Admin from "./pages/admin";
import {Paths} from "./lib/paths";

function App() {
  return (
    <div className="App">
        <Layout>
            <BrowserRouter>
                <Route path={Paths.LOGIN()} component={Login} exact/>
                <Route path={Paths.REGISTER()} component={Register} exact/>
                <Route path={Paths.ADMIN()} component={Admin} exact/>
                <Route path={Paths.LISTS()} component={Lists} exact/>
                <Route path={Paths.ITEMS(":listId")} component={Items} exact/>
            </BrowserRouter>
        </Layout>
    </div>
  );
}

export default App;
