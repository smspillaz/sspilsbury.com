import React from 'react';

import { Section } from 'react-landing-page';

import { ArticleContent } from 'components/ArticleContent';
import { ProjectPreview } from 'components/ProjectPreview';
import { ProjectPreviewImageCarousel } from 'components/ProjectPreviewImageCarousel';
import { LayoutTypes } from 'components/ResponsiveOrderedLayoutChild';

import { FMVView } from '../../experiments/FMV';
import { Trinity } from '../../experiments/Trinity';
import { TowersView } from '../../experiments/Towers';

import messages from './messages';

const experiments = [
  {
    key: 'trinity',
    title: messages.trinityTitle,
    subtitle: null,
    description: messages.trinityDescription,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-trinity.png',
    ],
    // eslint-disable-next-line
    expanded: ({ selected }) => (
      <Trinity
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '1em',
        }}
        animating={selected}
      />
    ),
    url: null,
  },
  {
    key: 'towers',
    title: messages.towersTitle,
    subtitle: null,
    description: messages.towersDescription,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-towers.png',
    ],
    // eslint-disable-next-line
    expanded: ({ selected }) => (
      <TowersView
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '1em',
        }}
        animating={selected}
      />
    ),
  },
  {
    key: 'fmv',
    title: messages.fmvTitle,
    subtitle: null,
    description: messages.fmvDescription,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-fmv.png',
    ],
    // eslint-disable-next-line
    expanded: ({ selected }) => (
      <FMVView
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '1em',
        }}
        animating={selected}
      />
    ),
  },
  {
    key: 'coconot',
    title: messages.coconotTitle,
    subtitle: null,
    description: messages.coconotDescription,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-coconot-1.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-coconot-2.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-coconot-3.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-coconot-4.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-coconot-5.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-coconot-6.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-coconot-7.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-coconot-8.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-coconot-9.png',
    ],
    url: 'http://coconot.herokuapp.com',
  },
  {
    key: 'deeplab-dropout',
    title: messages.convDropoutTitle,
    subtitle: null,
    description: messages.convDropoutDescription,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-segmentation0.gif',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-segmentation1.gif',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-segmentation2.gif',
    ],
    url:
      'http://s3.amazonaws.com/sspilsbury-com-images/pdf/dropout-conv-paper.pdf',
  },
  {
    key: 'ecof.ai',
    title: messages.ecofaiTitle,
    subtitle: null,
    description: messages.ecofaiDescription,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-ecofai-1.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-ecofai-2.png',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-ecofai-3.png',
    ],
    url: 'http://ecofai.herokuapp.com',
  },
];

/* eslint-disable react/prefer-stateless-function */
export class ExperimentsPage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {}

  render() {
    return (
      <article>
        <ArticleContent>
          <Section width={1}>
            {experiments.map((experiment, i) => (
              <ProjectPreview
                key={experiment.key}
                header={experiment.title.defaultMessage}
                url={experiment.url}
                subtitle={
                  experiment.subtitle && experiment.subtitle.defaultMessage
                }
                description={experiment.description.defaultMessage}
                layout={i % 2 === 0 ? LayoutTypes.LEFT : LayoutTypes.RIGHT}
                renderContractedPreview={() => (
                  <ProjectPreviewImageCarousel images={experiment.images} />
                )}
                renderExpandedPreview={experiment.expanded}
              />
            ))}
          </Section>
        </ArticleContent>
      </article>
    );
  }
}

ExperimentsPage.propTypes = {};

export default ExperimentsPage;
