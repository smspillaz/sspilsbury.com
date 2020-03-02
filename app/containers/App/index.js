/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import preset from '@rebass/preset';

import ContactPage from 'containers/ContactPage/Loadable';
import HomePage from 'containers/HomePage';
import HirePage from 'containers/HirePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PostsPage from 'containers/PostsPage/Loadable';
import PostPreviewsFetcher from 'containers/PostPreviews';
import ProjectsPage from 'containers/ProjectsPage/Loadable';
import ResearchPage from 'containers/ResearchPage/Loadable';
import ExperimentsPage from 'containers/ExperimentsPage/Loadable';
import { Navbar } from 'components/Navbar';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const navbarRoutes = [
  {
    name: 'Main',
    url: '/',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Research',
    url: '/research',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Experiments',
    url: '/experiments',
  },
  {
    name: 'Hire',
    url: '/hire',
  },
];

const theme = {
  ...preset,
  fonts: {
    ...preset.fonts,
    heading: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
};

export default function App() {
  return (
    <AppWrapper>
      <ThemeProvider theme={theme}>
        <Helmet titleTemplate="%s - Sam Spilsbury" defaultTitle="Sam Spilsbury">
          <meta name="description" content="Sam Spilsbury's Portfolio" />
        </Helmet>
        <Navbar items={navbarRoutes} />
        <PostPreviewsFetcher
          medium={{
            username: 'smspillaz',
            count: 10,
          }}
          wordpress={{
            domain: 'smspillaz.wordpress.com',
            count: 10,
          }}
        >
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/hire" component={HirePage} />
            <Route exact path="/research" component={ResearchPage} />
            <Route exact path="/posts" component={PostsPage} />
            <Route exact path="/experiments" component={ExperimentsPage} />
            <Route exact path="/projects" component={ProjectsPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </PostPreviewsFetcher>
        <GlobalStyle />
      </ThemeProvider>
    </AppWrapper>
  );
}
