import PropTypes from 'prop-types';
import { useState } from 'react';
import './DogForm.css'

function DogForm({ data, onAdd}) {

    const [valid, setValid] = useState(false)
    const [newDog, setNewDog] = useState({
        id: data.length > 0 ? Math.max(...data.map(dog => dog.id)) + 1 : 1,
        name: '',
        breed: '',
        age: '',
    })
    const handleChange = (e) => {
        const source = e.target.name
        const val = e.target.value
        let updatedDog

        switch (source) {
            case 'name':
                updatedDog = { ...newDog, name: val }; // pokud je zmena ve vlastnostech tak se napuse nova hodnota, jinak beze zemny
                break;
            case 'breed':
                updatedDog = { ...newDog, breed: val };
                break;
            case 'age':
                updatedDog = { ...newDog, age: val };
                break;
            default:
                break;
        }
        setNewDog(updatedDog)
        validateData(updatedDog)
    }

    const validateData = (dog) => {
        if (dog.age === "" || parseInt(dog.age) > 25 || parseInt(dog.age) < 0) {
            setValid(false)
        } else if (dog.name.trim().length === 0 || dog.breed.trim().length === 0) {
            setValid(false)
        } else {
            setValid(true)
        }
    }

    const resetNewDog = () => {
        const temp = {
            id: newDog.id + 1,
            name: '',
            breed: '',
            age: '',
        }
        setNewDog(temp)
        validateData(temp)
    }
    return (
        <>
            <div className='dog-form' >
                <input
                    type="text"
                    name='name'
                    id='name'
                    placeholder='Name'
                    value={newDog.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name='breed'
                    id='breed'
                    placeholder='Breed'
                    value={newDog.breed}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name='age'
                    id='age'
                    placeholder='Age'
                    value={newDog.age}
                    onChange={handleChange}
                    min={0}
                />
                <button
                    disabled={!valid}
                    onClick={() => {
                        onAdd(newDog);
                        resetNewDog();
                    }}
                >
                    Pridej
                </button>
            </div>
        </>
    )
}

DogForm.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            breed: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
        })
    ).isRequired,
    onAdd: PropTypes.func.isRequired,
}
export default DogForm
