import React from 'react';

import { Section } from 'react-landing-page';

import { ArticleContent } from 'components/ArticleContent';
import { ProjectPreview } from 'components/ProjectPreview';
import { ProjectPreviewImageCarousel } from 'components/ProjectPreviewImageCarousel';
import { LayoutTypes } from 'components/ResponsiveOrderedLayoutChild';

import { projects } from '../../content/projects';

/* eslint-disable react/prefer-stateless-function */
export class ProjectsPage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {}

  render() {
    return (
      <article>
        <ArticleContent>
          <Section width={1}>
            {projects.map((project, i) => (
              <ProjectPreview
                header={project.title}
                subtitle={project.subtitle}
                client={project.client}
                description={project.short}
                layout={i % 2 === 0 ? LayoutTypes.LEFT : LayoutTypes.RIGHT}
                url={project.url}
                key={project.key}
                renderContractedPreview={() => (
                  <ProjectPreviewImageCarousel
                    images={project.images}
                    imageStyleProps={project.imageStyleProps || {}}
                  />
                )}
              />
            ))}
          </Section>
        </ArticleContent>
      </article>
    );
  }
}

ProjectsPage.propTypes = {};

export default ProjectsPage;
