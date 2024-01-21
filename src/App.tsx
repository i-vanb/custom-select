import './App.scss';
import CSelect from "./Components/CSelect";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {CSelectControl} from "./Components/CSelect/CSelectControl";
import {selectOption} from "./redux/selectSlice";

function App() {
    const dispatch = useDispatch();
    const {options, iconPosition} = useSelector((state:RootState)=>state.select);
    const selectOptionHandler = (id:number) => dispatch(selectOption(id));

    return (
        <>
            <h2>Custom select for lobox.com</h2>
            <p>used technologies: React, Typescript, ReduxTK, scss</p>
            <CSelectControl />
            <CSelect options={options} onChange={selectOptionHandler} placeholder='Science' iconPosition={iconPosition}/>
        </>
    );
}

export default App;
