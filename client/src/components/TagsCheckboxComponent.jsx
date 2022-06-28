import { tags } from './../utils/tags'

const TagsCheckboxComponent = ({checkedStateArray, onhandleTagListChange}) => {
  return (
    <ul className="tags-list">
        {tags.map(( name , index) => {
          return (
            <li key={index}>
              <div className="tags-list-item">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedStateArray[index]}
                    onChange={() => onhandleTagListChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
              </div>
            </li>
          );
        })}
      </ul>
  )
}

export default TagsCheckboxComponent