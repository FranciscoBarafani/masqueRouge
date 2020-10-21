import React from 'react';
import renderer from 'react-test-renderer';
import CartList from './components/CartList';


//Components Rendering Correctly
test('CartList renders correctly', () => {
  const component = renderer.create(
    <CartList />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
