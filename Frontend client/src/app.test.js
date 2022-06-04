
import LoginComponent from './components/LoginComponent';
import ReactDOM from 'react-dom';
import StudentSubmissions from './components/StudentSubmissions';
import RequestTopic from './components/RequestTopic';


//Login page render component test by Shashika
test('Renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoginComponent></LoginComponent>, div)
});


//Staff Submission component test by Bhashitha
test('Renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<StudentSubmissions></StudentSubmissions>, div)
});

//Topic request component test by Tharuka
test('Renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<RequestTopic></RequestTopic>, div)
});
