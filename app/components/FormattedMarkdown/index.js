import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactMarkdown from 'react-markdown';

export const FormattedMarkdown = ({ ...props }) => (
  <FormattedMessage {...props}>
    {txt => (
      <ReactMarkdown
        source={txt}
        renderers={{
          paragraph: paragraphProps => (
            <div>
              <span>{paragraphProps.children}</span>
            </div>
          ),
        }}
      />
    )}
  </FormattedMessage>
);
