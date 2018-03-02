import React from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import Movie from "./Movie/Movie";

import NotFound from "./NotFound/NotFound";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/movie/:imdbid" component={Movie} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
