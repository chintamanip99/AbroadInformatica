import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Posts from './components/posts';
import MainContent from './components/maincontent';
import TopNavigation from './components/topnavigation';
import Channels from './components/channels';
import PostDetails from './components/postdetails';
import Detailed from './components/detailed.js';
import * as serviceWorker from './serviceWorker';
import {Route,BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

const routing=(
  <div>
    <TopNavigation/>
  <BrowserRouter>
    <CookiesProvider>
    <Route exact path="/" component={MainContent}></Route>
    <Route  exact path="/posts" component={Posts}></Route>
    <Route exact  path="/channels" component={Channels}></Route>
    <Route exact path="/:type/:id" component={Detailed}></Route>
    <Route exact path="/postdetails/:id" component={PostDetails}></Route>
    </CookiesProvider>
   
  </BrowserRouter>
  </div>
)

ReactDOM.render(
 
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
