/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
  make: {
    id: 'conatiners.HomePage.header.make',
    defaultMessage: 'Make',
  },
  imagination: {
    id: 'conatiners.HomePage.header.imagination',
    defaultMessage: 'Imagination',
  },
  reality: {
    id: 'conatiners.HomePage.header.reality',
    defaultMessage: 'Reality',
  },
  posts: {
    id: 'containers.HomePage.posts.title',
    defaultMessage: 'Posts',
  },
  projects: {
    id: 'containers.HomePage.projects.title',
    defaultMessage: 'Projects',
  },
  talks: {
    id: 'containers.HomePage.talks.title',
    defaultMessage: 'Talks & Papers',
  },
});
