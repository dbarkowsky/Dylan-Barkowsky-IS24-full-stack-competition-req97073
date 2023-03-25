import './App.css';
import ProductTable from './components/ProductTable';
import { useState } from 'react';

function App() {
  let testData = [{
    productId: 1,
    productName: "Cat Food",
    productOwnerName: "Felix",
    developers: [
      "NAME_1",
      "NAME_2",
      "NAME_3",
      "NAME_4",
      "NAME_5"
    ],
    scrumMasterName: "Garfield",
    startDate: "2018-12-10T13:49:51.141Z",
    methodology: "Agile"
  },
  {
    productId: 2,
    productName: "Dog Food",
    productOwnerName: "Rover",
    developers: [
      "NAME_1",
      "NAME_2",
      "NAME_3",
      "NAME_4",
      "NAME_5"
    ],
    scrumMasterName: "Lassie",
    startDate: "2019-12-10T13:49:51.141Z",
    methodology: "Waterfall"
  }];

  const [products, setProducts] = useState(testData);
  return (
    <div className="App">
      <ProductTable {...{ products }} />
    </div>
  );
}

export default App;
