import './App.css';
import Typeahead from './component/Typeahead';

function App() {
  const handleUserSelect = (selectedUser: any) => {
    console.log('Selected user:', selectedUser);
    // You can perform additional actions when a user is selected
  };
  return (
    <div className="App">
      <Typeahead onSelect={handleUserSelect} />
    </div>
  );
}

export default App;
