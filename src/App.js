import './App.css';
import Guru from './Components/Header/Header';
import SimpleBottomNavigation from './Components/Header/MainNav'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Trending from './Pages/Trending'
import Series from './Pages/Series'
import Movies from './Pages/Movies'
import { Container } from "@material-ui/core"
import Search from './Pages/Search'

function App() {
  return (
    <BrowserRouter>
      <Guru/>
      <div className="App">
        <Container>
          <Switch>
            <Route path="/" exact component={Trending} />
            <Route path="/Movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/Search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
