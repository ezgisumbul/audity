import { tags } from './../utils/tags';
import './TagsCheckboxComponent.scss';

const TagsCheckboxComponent = ({
  checkedStateArray,
  onhandleTagListChange
}) => {
  return (
    <div className="tags-list">
      <div className="wrapper">
        {tags.map((name, index) => {
          return (
            <div key={index}>
              <div className="tags-list-item" id="ck-button">
                <div class="single-button">
                  <label htmlFor={`custom-checkbox-${index}`}>
                    <input
                      type="checkbox"
                      hidden
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedStateArray[index]}
                      onChange={() => onhandleTagListChange(index)}
                    />
                    <span>{name}</span>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagsCheckboxComponent;

/* 
      <div id="ck-button">
        <div class="single-button">
          <label>
            <input type="checkbox" hidden name="genres" value="Media" class="dropdown-item"{{#if filters.media}}checked {{/if}}/><span>Media</span>
          </label>
        </div>
      </div>
*/
