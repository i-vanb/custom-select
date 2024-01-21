import {Modal} from "../Modal/Modal";
import {useState, ChangeEvent, SyntheticEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {push, switchIconPosition, unselectAll} from "../../redux/selectSlice";

export const CSelectControl = () => {
    const {example} = useSelector((state:RootState) => state.select);
    const dispatch = useDispatch();

    const [showAddModal, setShowAddModal] = useState(false);
    const [value, setValue] = useState<string>('');
    const [icon, setIcon] = useState<string>('');

    const openModal = () => setShowAddModal(true);
    const closeModal = () => {
        setShowAddModal(false);
        clearForm();
    };
    const clearForm = () => {
        setValue('');
        setIcon('');
    };

    const changeIconPosition = () => dispatch(switchIconPosition());
    const setNameHandler = (e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    const setIconHandler = (e:ChangeEvent<HTMLTextAreaElement>) => setIcon(e.target.value);

    const exampleAdding = (e:SyntheticEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        example?.value && setValue(example.value);
        example?.icon && setIcon(example.icon);
    };

    const unselect = () => {
        dispatch(unselectAll());
    };
    
    const saveHandler = () => {
        closeModal();
        dispatch(push({value, icon}));
    };

    return(
        <>
            <div className="c-select__control">
                <button className="c-select__control__btn btn" onClick={openModal}>add option</button>
                <button title="position in option (left/right)" className="c-select__control__btn btn" onClick={changeIconPosition}>switch icon position</button>
                <button className="c-select__control__btn btn" onClick={unselect}>unselect all</button>
            </div>
            <Modal isOpen={showAddModal} close={closeModal}>
                <div className="form">
                    <div className="form__row">
                        <label>enter name</label>
                        <input type="text" value={value} onChange={setNameHandler} />
                    </div>
                </div>
                <div className="form">
                    <div className="form__row">
                        <label>enter icon in base64 (optional)</label>
                        <textarea value={icon} onChange={setIconHandler} cols={6} rows={200} />
                    </div>
                </div>
                {example &&
                    <div className="form">
                        <div className="form__row">
                            <a href="#" onClick={exampleAdding}>use 'food' for example</a>
                        </div>
                    </div>
                }
                <div className="form">
                    <div className="form__row">
                        <button className="form__row__btn btn" onClick={saveHandler}>save</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};