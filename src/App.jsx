import { useState } from 'react'
import './App.css'
import rawData from './dogsData.json'
import DogList from './components/DogList/DogList'
import DogForm from './components/DogForm/DogForm'

function App() {
  const [listOfDogs, setListOfDogs] = useState(rawData.dogs)
  const [shelterStorage, setShelterStorage] = useState({
    food: 35,
    vaccine: 15,
    pills: 20,
  })
  const [tempStorage, setTempStorage] = useState({
    food: '',
    vaccine: '',
    pills: '',
  })
  const dogRequirements = {
    food: 5,
    vaccine: 1,
    pills: 2,
  }
  const [activeTab, setActiveTab] = useState(1)
  const onDelete = (idToDelete) => {
    const temp = listOfDogs.filter(dog => dog.id != idToDelete)
    setListOfDogs(temp)
  }
  const handleAdd = (dogToAdd) => {
    const totalRequirements = {
      food: (listOfDogs.length+1) * dogRequirements.food,
      vaccine: (listOfDogs.length+1) * dogRequirements.vaccine,
      pills: (listOfDogs.length+1) * dogRequirements.pills,

    }
    if (totalRequirements.food <= shelterStorage.food 
      && totalRequirements.vaccine <= shelterStorage.vaccine 
      && totalRequirements.pills <= shelterStorage.pills) {
      setListOfDogs([...listOfDogs, dogToAdd])
    } else {
      alert('nedostatek zasob pro pridani noveho psa!')
    }
  }

  const handleStorage = (e) => {
    const source = e.target.name
    let val = e.target.value
    switch (source) {
      case 'food':
        setTempStorage({ ...tempStorage, food: val })
        break;
      case 'vaccine':
        setTempStorage({ ...tempStorage, vaccine: val })
        break;
      case 'pills':
        setTempStorage({ ...tempStorage, pills: val })
        break;
      default:
        break;
    }
    // const { name, value } = e.target;
    // setTempStorage((prev) => ({
    //   ...prev,
    //   [name]: Number(value), // Uloží číselnou hodnotu
    // }));
  }

  const handleAddToStorage=()=>{
    const storageToAdd = {
      food: tempStorage.food === '' ? 0 : parseInt(tempStorage.food),
      vaccine: tempStorage.vaccine === '' ? 0 : parseInt(tempStorage.vaccine),
      pills: tempStorage.pills === '' ? 0 : parseInt(tempStorage.pills),
    }
    setShelterStorage({
      food: shelterStorage.food + storageToAdd.food,
      vaccine: shelterStorage.vaccine + storageToAdd.vaccine,
      pills: shelterStorage.pills + storageToAdd.pills,
    })
    setTempStorage({
      food: "",
      vaccine: "",
      pills: "",
    })
  }
 
  return (
    <>
      <div className="page-container">
        <div className="page-toggler">
          <button
            className={`toggler-btn ${activeTab === 1 ? 'active' : ''}`}
            name='list-of-dogs'
            value={1}
            onClick={() => setActiveTab(1)}
          >
            Seznam psů
          </button>
          <button
            className={`toggler-btn ${activeTab === 2 ? 'active' : ''}`}
            name='shelter-storage'
            value={2}
            onClick={() => setActiveTab(2)}
          >
            Sklad útulku
          </button>
        </div>
        {activeTab === 1 && (
          <>
            <DogList data={listOfDogs}
              onDelete={onDelete}

            />
            <DogForm data={listOfDogs}
              onAdd={handleAdd}

            />
          </>
        )}
        {activeTab === 2 && (
          <>

            <h1>Aktuální zásoby</h1>
            <p>Jídlo: {shelterStorage.food} kg</p>
            <p>Vakcíny: {shelterStorage.vaccine} ks</p>
            <p>Tablety: {shelterStorage.pills} ks</p>

            <div className="shelter-form">

              <input
                type="number"
                name="food"
                id="food"
                placeholder='granule (kg)'
                value={tempStorage.food}
                min={0}
                onChange={handleStorage} />
              <input
                type="number"
                name="vaccine"
                id="vaccine"
                placeholder='vakciny (ks)'
                value={tempStorage.vaccine}
                min={0}
                onChange={handleStorage} />
              <input
                type="number"
                name="pills"
                id="pills"
                placeholder='medikamenty (ks)'
                value={tempStorage.pills}
                min={0}
                onChange={handleStorage} />
            </div>
            <button onClick={handleAddToStorage}>Doplň zásoby</button>
          </>
        )}

      </div>
    </>
  )
}

export default App
