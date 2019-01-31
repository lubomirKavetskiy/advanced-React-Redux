import React from 'react';
import { mount } from 'enzyme';

import Root from 'Root';
import CommentBox from 'components/CommentBox';


let wrapped;

// beforeEach #1
beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>)
});
// afterEach #1
afterEach(() => {
  wrapped.unmount();
});

it('has textarea and two buttons', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('textarea', () => {
  // beforeEach #2
  beforeEach(() => {
    wrapped.find('textarea').simulate('change', { target: { value: 'new comment' } });
    wrapped.update();
  });

  it('has textarea that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('when the input is submitted, textarea gets emptied', () => {
    wrapped.find('form').simulate('submit');
    wrapped.update();

    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});

// beforeEach #1
// 'has textarea and button'
// afterEach #1

// beforeEach #1
// beforeEach #2
// 'has textarea that users can type in'
// afterEach #1

// beforeEach #1
// beforeEach #2
// 'when the input is submitted, textarea gets emptied'
// afterEach #1



