import React from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page/Page";

const NotFound = () => (
  <Page title="Page Not Found" noCrawl id="not-found">
    <h1>Page can't be found...</h1>
    <Link to="/">Go home?</Link>
  </Page>
);

export default NotFound;
