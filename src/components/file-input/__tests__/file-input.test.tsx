import React from 'react';
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer';
import { FileInput } from '../file-input';

it('renders without crashing', () => {
  render(<FileInput placeholder="Upload File" />)
});

it('renders correctly', () => {
  const tree = renderer
    .create(<FileInput placeholder="Upload File" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});