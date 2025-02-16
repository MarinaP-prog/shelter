import PropTypes from 'prop-types';
import  './DogList.css'

function DogList({data, onDelete}) {

  return (
    <div className='list'>
        {data.map((dog) => {
            return (
      <div className="item" key={dog.id}>
        <span>
            {dog.name} / {dog.breed} / {dog.age}
            </span>
        <button className='btn-delete' onClick={() => onDelete(dog.id)}>XX</button>
        </div>
    )
    })}
    </div>
  )
}

DogList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired, 
            name: PropTypes.string.isRequired, 
            breed: PropTypes.string.isRequired, 
            age: PropTypes.number.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
}
export default DogList
