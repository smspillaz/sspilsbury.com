import { defineMessages } from 'react-intl';

export default defineMessages({
  trinityTitle: {
    id: 'containers.ExperimentsPage.trintyTitle',
    defaultMessage: `Trinity`,
  },
  trinityDescription: {
    id: 'containers.ExperimentsPage.trintyDescription',
    defaultMessage: `A pleasing visual from rotating sine waves`,
  },
  towersTitle: {
    id: 'containers.ExperimentsPage.towersTitle',
    defaultMessage: `Towers`,
  },
  towersDescription: {
    id: 'containers.ExperimentsPage.fmvDescription',
    defaultMessage:
      `This piece is based on the idea of travelling through an abstract, infinite desert. ` +
      `I used the [pinnacles](https://en.wikipedia.org/wiki/The_Pinnacles_(Western_Australia)) ` +
      `as inspiration. The fading in and out as the towers approach ` +
      `the camera is based on a polynomial curve with an X intercept of the camera distance. ` +
      `An offset is applied based on the height of each block in the tower to have the blocks ` +
      `fade towards the top.`,
  },
  fmvTitle: {
    id: 'containers.ExperimentsPage.fmvTitle',
    defaultMessage: `Floor Music Visualizer`,
  },
  fmvDescription: {
    id: 'containers.ExperimentsPage.fmvDescription',
    defaultMessage:
      `The idea behind this music visualiser was to think of the “dance floor” ` +
      `in Dance Dance Revolution. I was thinking of something that was vibrant ` +
      `and sleek, with clear outlines for each of the tiles. The idea expanded as ` +
      `I added motion to the floor as something that reacted dynamically to what ` +
      `was playing, almost like a cloth in the wind.\n` +
      `The outlines on the bars are achieved by providing barymetric co-ordinates ` +
      `to the vertex shader. Pixels that are close to edges of the barymetric ` +
      `outline are colored with a solid color, other pixels are semitransparent ` +
      `based on the height of the bar. Try it by dragging an audio file on top of the visualization.`,
  },
  coconotTitle: {
    id: 'containers.ExperimentsPage.coconotTitle',
    defaultMessage: `Coconot`,
  },
  coconotDescription: {
    id: 'containers.ExperimentsPage.coconotDescription',
    defaultMessage:
      `Using a Convolutional Neural Network to detect and create a map of road ` +
      `signs and assets along Western Australian highways. 3rd Place at inaugural ` +
      `Western Australia Ministry of Data Hackathon`,
  },
  convDropoutTitle: {
    id: 'containers.ExperimentsPage.convDropoutTitle',
    defaultMessage: `Dropout for Fully Convolutional Image Segmentation Networks`,
  },
  convDropoutDescription: {
    id: 'containers.ExperimentsPage.convDropoutDescription',
    defaultMessage:
      `Comparing different dropout methods for fully convolutional image segmentation ` +
      `networks and measuring validation set performance with only 10% of training data available.`,
  },
  ecofaiTitle: {
    id: 'containers.ExperimentsPage.ecofaiTitle',
    defaultMessage: `ecof.ai`,
  },
  ecofaiDescription: {
    id: 'containers.ExperimentsPage.ecofaiDescription',
    defaultMessage:
      `Don't fly everyone halfway around the world for no reason! A tool for conference ` +
      `organizers to plan cost and emissions pareto-optimal conferences, by asking ` +
      `where prospective guests are coming from first, then using the HipMunk API to work ` +
      `out likely flight paths on that day.`,
  },
});
