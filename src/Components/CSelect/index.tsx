import './Select.scss';
import {CSelectProps, SelectOption} from "./props.type";
import {useState, useRef, useEffect} from "react";


function CSelect(props:CSelectProps) {
    const {onChange, options, placeholder, iconPosition} = props;

    const [isActive, setIsActive] = useState<boolean>(false);
    const openDropdown = () => setIsActive(true);

    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (e:any) => {
            if (isActive && ref.current && !ref.current.contains(e.target)) {
                setIsActive(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [isActive]);


    return (
        <div className="c-select">
            <button className={`c-select__button ${isActive ? ' active' : ''}`}
                    onMouseDownCapture={e=>e.stopPropagation()}
                    onClick={openDropdown}
            >{placeholder}</button>
            <ul ref={ref} className={`c-select__options ${isActive ? ' open' : ''}`}>
                {options.map((option) =>
                    <Option key={option.id}
                            id={option.id}
                            value={option.value}
                            onClick={onChange}
                            icon={option.icon}
                            iconPosition={iconPosition}
                            active={option.active}
                    />
                )}
            </ul>
        </div>
    );
}

const Option = ({ id, value, onClick, icon, iconPosition, active }:SelectOption) => {

    const onClickHandler = () => {
        onClick(id);
    };

    const className = `c-select__option ${active ? ' active' : ''}`;
    const iconClassName = `c-select__option__icon ${iconPosition}`;

    return (
        <li className={className} onClick={onClickHandler}>
            <span className="c-select__option__label">{value}</span>
            {icon && <img className={iconClassName} src={icon} alt="icon"/>}
        </li>
    );
};

export default CSelect;