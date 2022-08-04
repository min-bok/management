import logo from "./logo.svg";
import "./App.css";
import Customer from "./components/Customer";

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "나동빈",
    birthday: "961222",
    gender: "남자",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "이혜영",
    birthday: "980810",
    gender: "여자",
    job: "대학생",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "김범진",
    birthday: "970730",
    gender: "남자",
    job: "대학생",
  },
];

function App() {
  return (
    <div>
      {customers.map((customer) => {
        return (
          <Customer
            key={customer.id}
            id={customer.id}
            image={customer.image}
            name={customer.name}
            birthday={customer.birthday}
            gender={customer.gender}
            job={customer.job}
          />
        );
      })}
    </div>
  );
}

export default App;
