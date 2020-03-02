import { defineMessages } from 'react-intl';

export default defineMessages({
  aboutMeBlurb: {
    id: 'containers.ResearchPage.aboutMeBlurb',
    defaultMessage: `I'm Sam. I'm an aspiring Computer Science Researcher. My main interests
      are [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing),
      [natural signals processing](https://en.wikipedia.org/wiki/Signal_processing) and
      [machine learning](https://en.wikipedia.org/wiki/Machine_learning). What I'm most interested in,
      however, is figuring out how we can use computers to learn more about ourselves.`,
  },
  aBitMoreDetail: {
    id: 'containers.ResearchPage.aBitMoreDetail',
    defaultMessage: `I am a Master student in Computer Science at Aalto University and as a participant on the [Doctoral Track](https://www.aalto.fi/en/department-of-computer-science/doctoral-track-combines-masters-and-doctoral-studies),
      I have the opportunity to complete research concurrently with my studies.
      I completed my Bachelor of Science at the [University of Western Australia](https://uwa.edu.au) in 2016.
      I also hold a Bachelor of Laws and Bachelor of Arts (Communication Studies) from the same univeristy,
      completed in 2015 and 2013 respectively.`,
  },
  theses: {
    id: 'containers.ResearchPage.theses',
    defaultMessage: `A thesis is not mandatory for a Bachelor degree in Australia, but my main degree project
      for my Bachelor of Science was using
      [graph databases and web scraping to make sense of retractions on PubMed](https://github.com/smspillaz/pubmed-retraction-analysis)
      and my capstone paper for the Bachelor of Arts was on the factors that motivate
      contributors in successful open source projects.`,
  },
  whatever2vecDescription: {
    id: 'containers.ResearchPage.whatever2vecDescription',
    defaultMessage: `With the advent of neural-network language models, there are now many ways to
      generate vector-space representations of words and symbols. There is interest in
      using these vector-space representations learned as a byproduct of training language
      models for downstream tasks. This work measures these representations against
      baselines generated by traditional methods to determine the areas in which language-model
      generated embeddings are better suited.`,
  },
  infogalacticDescription: {
    id: 'containers.ResearchPage.infogalacticDescription',
    defaultMessage: `Infogalactic is a fork of Wikipedia. This presents an interesting dataset -
      is there anything we can see about how a community behaves after a fork
      when maintaining a large scale resource like Wikipedia? We find that community
      behaviour can be modelled primarily by topic interest and the underlying graph structure
      of the existing corpus.`,
  },
  paraphrasingDescription: {
    id: 'containers.ResearchPage.paraphrasingDescription',
    defaultMessage: `Recent advances in stylometry have shown the possibility to identify the
      author of anonymous writing given a sufficient corpus of writing from that
      author. This work examines a mechanism to defeat stylometry by running a
      local instance of the stylometry process in *reverse* - generating semantically
      equivalent paraphrases and changes to text, then optimizing paraphrase
      selection using a much simpler *surrogate* model to mimic another author. We
      were able to defeat state-of-the-art classifiers and maintain superior scores in
      subjective semantic retainment according to NLG metrics and human evaluators.`,
  },
  feedback2vecDescription: {
    id: 'containers.ResearchPage.feedback2vecDescription',
    defaultMessage: `Administrators of educational courses depend on feedback from students in order to
      determine areas for improvement or change within the course. However, making sense
      of this feedback once course attendance runs into the hundreds can become intractable.
      This project looked at ways to *cluster* unstructured text data, by creating a vector
      space representations of its features. We came up with ways to generate clusters that
      human evaluators were much more easily able to annotate compared to a baseline of random
      clustering.`,
  },
});