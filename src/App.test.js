import { render, screen, fireEvent, within } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component renders', () => {
  render(<App />, container);
});

test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const addButton = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.click(addButton);
  const task = screen.getByText(/History Test/i);
  expect(task).toBeInTheDocument();
  expect(inputTask.value).toBe('');
});

test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const addButton = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.click(addButton);
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.click(addButton);
  const tasks = screen.getAllByText(/History Test/i);
  expect(tasks.length).toBe(1);
});

test('test that App component doesn\'t add a blank task', () => {
  render(<App />);
  const addButton = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(addButton);
  const noTodosText = screen.getByText(/You have no todo's left/i);
  expect(noTodosText).toBeInTheDocument();
});

test('test that App component can be deleted thru checkbox', async () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const addButton = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.click(addButton);
  const task = await screen.findByText(/History Test/i);
  expect(task).toBeInTheDocument();
  const checkbox = within(task).getByRole('checkbox');
  fireEvent.click(checkbox);
  const noTodosText = await screen.findByText(/You have no todo's left/i);
  expect(noTodosText).toBeInTheDocument();
});
