import React from 'react';
import Wrapper from '@plone/volto/storybook';
import PluggableMenuSection from './PluggableMenuSection';
import BlockToolbarItem from './BlockToolbarItem';
import {
  PluggablesProvider,
  Plug,
} from '@plone/volto/components/manage/Pluggable';
import trashSVG from '@plone/volto/icons/delete.svg';
import hideSVG from '@plone/volto/icons/hide.svg';
import showSVG from '@plone/volto/icons/show.svg';

const PluggableMenuSectionStory = (args) => {
  return (
    <Wrapper>
      <PluggablesProvider>
        <PluggableMenuSection {...args} />
        <Plug id="show" pluggable={args.name} extra={{ group: 'slot' }}>
          {(options) => (
            <BlockToolbarItem icon={showSVG} label="Show" {...options} />
          )}
        </Plug>
        <Plug id="hide" pluggable={args.name}>
          {(options) => (
            <BlockToolbarItem icon={hideSVG} label="Hide" {...options} />
          )}
        </Plug>
        <Plug id="delete" pluggable={args.name}>
          {(options) => (
            <BlockToolbarItem icon={trashSVG} label="Delete" {...options} />
          )}
        </Plug>
      </PluggablesProvider>
    </Wrapper>
  );
};

export const Default = PluggableMenuSectionStory.bind({});

Default.args = {
  name: 'buttons',
  maxSizeBeforeCollapse: 1,
};

export default {
  title: 'Quanta/PluggableMenuSection',
  component: PluggableMenuSection,
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    maxSizeBeforeCollapse: {
      type: 'number',
    },
  },
};
