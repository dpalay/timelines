import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import {RecoilRoot} from 'recoil';

import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import Compare from '../routes/compare';
import { Difficulties, EventCategories } from '../Model';

const App: FunctionalComponent = () => {
    return (
        <RecoilRoot>
        <div id="preact_root">
            <Header />
            <Router>
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
                <Route path="/compare/" component={Compare} category={EventCategories.VideoGames + EventCategories.Movies} difficulty={Difficulties.Easy} />

                <NotFoundPage default />
            </Router>
        </div>
        </RecoilRoot>
    );
};

export default App;
