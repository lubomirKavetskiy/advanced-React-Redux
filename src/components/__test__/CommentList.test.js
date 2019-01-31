import React from 'react';
import { mount } from 'enzyme';

import Root from 'Root';
import CommentList from 'components/CommentList';

let wrapped;

const initialState = {
  comments: ['Commnet 1', 'Comment 2', 'Comment 3', 'Comment 4']
}

// beforeEach
beforeEach(() => {
  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>)
});

it('creates one LI per comment', () => {
  expect(wrapped.find('li').length).toEqual(initialState.comments.length);
});

it('shows the text for each comment', () => {
  // for (const el of initialState.comments) {
  //   expect(wrapped.render().text()).toContain(el);
  // }
  for (const el in initialState.comments) {
    expect(wrapped.render().text()).toContain(initialState.comments[el]);
  }
});
