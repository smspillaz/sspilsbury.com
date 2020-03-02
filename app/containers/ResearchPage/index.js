import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import { Flex, Box, Heading, Text } from 'rebass/styled-components';

import { CallToAction, Section } from 'react-landing-page';

import {
  faBook,
  faComments,
  faFileAlt,
  faPodcast,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'components/Link';
import H1 from 'components/H1';

import { ArticleContent } from 'components/ArticleContent';
import { Bio } from 'components/Bio';
import { MarkdownChildrenStyles } from 'components/MarkdownChildrenStyles';
import { ProjectPreview } from 'components/ProjectPreview';
import { ProjectPreviewImageCarousel } from 'components/ProjectPreviewImageCarousel';
import { LayoutTypes } from 'components/ResponsiveOrderedLayoutChild';

import messages from './messages';
import experimentMessages from '../ExperimentsPage/messages';

const ongoingResearch = [
  {
    key: 'whatever2vec',
    title: {
      defaultMessage: 'whatever2vec',
    },
    subtitle: {
      defaultMessage:
        'Thomas Spilsbury, Christabella Irwanto, Dimitrios Papatheodorou (2018)',
    },
    description: messages.whatever2vecDescription,
    images: [],
    source: 'http://github.com/smspillaz/whatever2vec',
    paper: '/whatever2vec.pdf',
  },
  {
    key: 'deeplab-dropout',
    title: experimentMessages.convDropoutTitle,
    subtitle: {
      defaultMessage: 'Thomas Spilsbury, Paavo Camps (2018)',
    },
    description: experimentMessages.convDropoutDescription,
    images: [
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-segmentation0.gif',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-segmentation1.gif',
      'https://s3.amazonaws.com/sspilsbury-com-images/experiment-segmentation2.gif',
    ],
    source: 'http://github.com/smspillaz/seg-reg',
    paper:
      'http://s3.amazonaws.com/sspilsbury-com-images/pdf/dropout-conv-paper.pdf',
  },
];

const Markdown = ({ content }) => (
  <MarkdownChildrenStyles>
    <ReactMarkdown
      source={content.defaultMessage}
      renderers={{
        paragraph: paragraphProps => <Text>{paragraphProps.children}</Text>,
      }}
    />
  </MarkdownChildrenStyles>
);

Markdown.propTypes = {
  content: PropTypes.shape({
    defaultMessage: PropTypes.string.isRequired,
  }).isRequired,
};

const ResearchProject = ({
  header,
  source,
  paper,
  subtitle,
  description,
  canRenderContractedPreview,
  renderContractedPreview,
  renderExpandedPreview,
}) => (
  <ProjectPreview
    header={header}
    subtitle={subtitle}
    url={source || paper}
    description={`${description}${paper ? ` [Working Paper](${paper})` : ''}`}
    renderContractedPreview={renderContractedPreview}
    renderExpandedPreview={renderExpandedPreview}
    canRenderContractedPreview={canRenderContractedPreview}
  />
);

ResearchProject.propTypes = {
  header: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  paper: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  canRenderContractedPreview: PropTypes.bool.isRequired,
  renderContractedPreview: PropTypes.func,
  renderExpandedPreview: PropTypes.func.isRequired,
};

const researchGroupPostings = [
  {
    key: 'epfl-dlab',
    project: {
      defaultMessage: 'Infogalactic',
    },
    university: 'Ecole Polytechnique Federale de Lausanne',
    group: 'IC-DLAB',
    groupLink: 'https://dlab.epfl.ch/',
    icon: faBook,
    description: messages.infogalacticDescription,
    supervisor: 'Robert West',
    supervisorLink: 'https://dlab.epfl.ch/people/west/',
  },
  {
    key: 'aalto-ssg',
    project: {
      defaultMessage: 'Writing style imitation via combinatorial paraphrasing',
    },
    university: 'Aalto University',
    group: 'Secure Systems Group',
    groupLink: 'https://ssg.aalto.fi',
    icon: faPodcast,
    description: messages.paraphrasingDescription,
    supervisor: 'N. Asokan',
    supervisorLink: 'https://asokan.org/asokan/',
    paper: {
      authors: 'Tommi Gröndahl, N. Asokan',
      link: 'https://arxiv.org/pdf/1905.13464.pdf',
    },
  },
  {
    key: 'aalto-mlbd',
    project: {
      defaultMessage: 'Feedback2Vec',
    },
    university: 'Aalto University',
    group: 'Machine Learning for Big Data Group',
    groupLink: 'https://research.cs.aalto.fi/MLBigDat/',
    icon: faComments,
    description: messages.feedback2vecDescription,
    supervisor: 'Alexander Jung',
    supervisorLink: 'https://users.aalto.fi/~junga1/',
  },
];

const ResearchGroupPosting = ({
  project,
  group,
  university,
  description,
  paper,
  supervisor,
  supervisorLink,
  icon,
}) => (
  <Box width={[1, 1, 1, 1]}>
    <Flex m={1}>
      <Flex width={[1 / 5, 1 / 8]} mr={1} alignItems="center">
        <FontAwesomeIcon icon={icon} size="4x" />
      </Flex>
      <Box width={[4 / 5, 7 / 8]}>
        <H1>{project}</H1>
        <Heading fontSize={[1, 2, 3]} color="black">
          {university}
        </Heading>
        <Heading fontSize={[1, 2, 3]} color="grey">
          {group}
        </Heading>
        {paper ? (
          <Link href={paper.link} color="black" hoverColor={paper && 'grey'}>
            <Flex p={1}>
              <Box mr={1}>
                <FontAwesomeIcon icon={faFileAlt} />
              </Box>
              <Box>
                <Text>{paper.authors}</Text>
              </Box>
            </Flex>
          </Link>
        ) : (
          <span />
        )}
        {supervisor ? (
          <Flex>
            <Markdown
              content={{
                defaultMessage: `**Supervisor**: [${supervisor}](${supervisorLink})`,
              }}
            />
          </Flex>
        ) : (
          <span />
        )}
        <Markdown content={description} />
      </Box>
    </Flex>
  </Box>
);

ResearchGroupPosting.propTypes = {
  project: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  university: PropTypes.string.isRequired,
  description: PropTypes.string,
  paper: PropTypes.string,
  supervisor: PropTypes.string,
  supervisorLink: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

/* eslint-disable react/prefer-stateless-function */
export class ResearchPage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {}

  render() {
    return (
      <article>
        <ArticleContent>
          <Section width={1}>
            <Bio
              photo="https://s3.amazonaws.com/sspilsbury-com-images/self.jpg"
              name={"Thomas Samuel ('Sam') Spilsbury"}
              title="Master Student, Aalto University"
              renderContributorChildren={() => (
                <Box>
                  <Flex justifyContent="center">
                    <CallToAction
                      mt={3}
                      href="https://sspilsbury-com-images.s3.amazonaws.com/pdf/sspilsbury-resume-research.pdf"
                      bg="lightgrey"
                      alignSelf="center"
                    >
                      CV
                    </CallToAction>
                  </Flex>
                </Box>
              )}
            >
              <Box width={[1, 1, 1, 1]}>
                <H1 width={[1, 1, 1, 1]}>Hi</H1>
                <Box>
                  <Markdown content={messages.aboutMeBlurb} />
                </Box>
                <br />
                <Box>
                  <Markdown content={messages.aBitMoreDetail} />
                </Box>
                <br />
                <Box>
                  <Markdown content={messages.theses} />
                </Box>
              </Box>
            </Bio>
          </Section>
          <Section width={1} heading="Research Experience Projects">
            {researchGroupPostings.map(posting => (
              <ResearchGroupPosting
                key={posting.key}
                project={posting.project.defaultMessage}
                paper={posting.paper}
                university={posting.university}
                group={posting.group}
                description={posting.description}
                icon={posting.icon}
                supervisor={posting.supervisor}
                supervisorLink={posting.supervisorLink}
              />
            ))}
          </Section>
          <Section width={1} heading="Ongoing Projects">
            {ongoingResearch.map((research, i) => (
              <ResearchProject
                key={research.key}
                header={research.title.defaultMessage}
                source={research.source}
                paper={research.paper}
                subtitle={research.subtitle && research.subtitle.defaultMessage}
                description={research.description.defaultMessage}
                layout={i % 2 === 0 ? LayoutTypes.LEFT : LayoutTypes.RIGHT}
                renderContractedPreview={() => (
                  <ProjectPreviewImageCarousel images={research.images} />
                )}
                renderExpandedPreview={research.expanded}
                canRenderContractedPreview={!!research.images.length}
              />
            ))}
          </Section>
        </ArticleContent>
      </article>
    );
  }
}

ResearchPage.propTypes = {};

export default ResearchPage;
