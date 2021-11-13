import { useState } from 'react';
import { fillings } from '../utils/fillings';

function Body() {
    const getFormattedPrice = price => `£${price.toFixed(2)}`;
    const [checkedState, setCheckedState] = useState(new Array(fillings.length).fill(false));

    const [total, setTotal] = useState(0);
  
    const handleOnChange = (checkboxID) => {
      const updatedCheckedState = checkedState.map((filling, index) => index === checkboxID ? !filling : filling);
      setCheckedState(updatedCheckedState);
  
      const totalPrice = updatedCheckedState.reduce((sum, currentState, index) => {
          if (currentState === true) {
            return sum + fillings[index].price;
          } else {
            return sum;
          }
        },
        0
      );
  
      setTotal(totalPrice);
    };
    return (
        <ul className='fillings-list'>
        {fillings.map(({ name, price }, index) => {
          return (
            <li key={index}>
              <div className='filling-list-item'>
                <div className='filling-section'>
                  <input 
                    type='checkbox'
                    id={`checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`checkbox-${index}`}>{name}</label>
                </div>
                <div className='price-section'>{getFormattedPrice(price)}</div>
              </div>
            </li>
          );
        })}
        <li>
        <div className='separate-total-from-filling'></div>
          <div className='filling-list-item'>
            <div className='total-section'>Total:</div>
            <div className='total-section'>{getFormattedPrice(total)}</div>
          </div>
        </li>
      </ul>
    )
}

export default Body;