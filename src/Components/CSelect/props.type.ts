export type CSelectProps = {
    options: Array<DataOption>;
    onChange: (id: number) => void;
    placeholder: string;
    iconPosition: 'left' | 'right';
}


export interface DataOption {
    id: number;
    value: string;
    active: boolean;
    icon?: string;
}

export interface SelectOption extends DataOption{
    onClick: (option:number) => void;
    iconPosition: 'left' | 'right';
}