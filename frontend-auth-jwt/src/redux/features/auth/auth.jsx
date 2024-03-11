import {useSelector, useDispatch} from 'react-redux'
import { decrement, increment } from "./authSlice.js";
function Counter() {
    const counter = useSelector(state => state.counters.value)
    const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{counter}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
export default Counter;