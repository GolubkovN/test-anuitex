import React from 'react';
import './form.scss';

const MAX_LENGTH_NUMBER: number = 16;
const MAX_LENGTH_MONTH: number = 2;
const MAX_LENGTH_YEAR: number = 2;
const MAX_LENGTH_CVV: number = 3;

const styleOptions = {
    succesNum: {
        color: 'rgba(123,132,191,1)',
        marginBottom: '15px',
        fontWeight: 'bold',
    } ,
    failNum: {
        color: '#ff1616',
        marginBottom: '15px',
        fontWeight: 'extra-bold',
    },
    succesInput: {
        border: '5px solid rgba(123,132,191,1)'
    },
    failInput: {
        border: '5px solid #ff1616'
    }
};

const Form: React.FC = () => {
    const [numberCard, setNumberCard] = React.useState<string>('');
    const [numberCardDirty, setNumberCardDirty] = React.useState<boolean>(false);
    const [numberMessageStyle, setnumberMessageStyle] = React.useState<any>('');
    const [message, setMessage] = React.useState<string>('');

    const [monthInput, setMonthInput] = React.useState<string>('');
    const [yearInput, setYearInput] = React.useState<string>('');
    const [cvv, setCvv] = React.useState<string>('');
    const [outlineMonth, setOutlineMonth] = React.useState<any>();
    const [outlineYear, setOutlineYear] = React.useState<any>();
    const [outlineCvv, setOutlineCvv] = React.useState<any>();

    const blurHanler = (evt: React.FocusEvent<HTMLInputElement>): void =>{
        switch (evt.target.name) {
            case 'number':
                setNumberCardDirty(true);
                break;
        }
    };

    const numberHandler = (evt: React.FormEvent<HTMLInputElement>): void => {
        setNumberCard(evt.currentTarget.value.replace(/[^\d]/g, ''))
        const validNumber: string = '1111222233334444';
        if (evt.currentTarget.value.length < MAX_LENGTH_NUMBER || evt.currentTarget.value !== validNumber) {
            setMessage(`Некорректный номер!`)
            setnumberMessageStyle(styleOptions.failNum);
            evt.currentTarget.setCustomValidity(`Некорректный номер!`);
        } else {
            setMessage(`Корректный номер!`)
            setnumberMessageStyle(styleOptions.succesNum);
            evt.currentTarget.setCustomValidity('');
        }

    };

    const monthHandler = (evt: React.FormEvent<HTMLInputElement>): void => {
        setMonthInput(evt.currentTarget.value.replace(/[^\d]/g, ''));
        if (evt.currentTarget.value.length < MAX_LENGTH_MONTH) {
            setOutlineMonth(styleOptions.failInput)
            evt.currentTarget.setCustomValidity(`ещё ${MAX_LENGTH_MONTH - evt.currentTarget.value.length} символов`)
        } else {
            setOutlineMonth(styleOptions.succesInput)
            evt.currentTarget.setCustomValidity('');
        }
    };

    const yearHandler = (evt: React.FormEvent<HTMLInputElement>): void => {
        setYearInput(evt.currentTarget.value.replace(/[^\d]/g, ''));
        if (evt.currentTarget.value.length < MAX_LENGTH_YEAR) {
            setOutlineYear(styleOptions.failInput)
            evt.currentTarget.setCustomValidity(`ещё ${MAX_LENGTH_YEAR - evt.currentTarget.value.length} символов`)
        } else {
            setOutlineYear(styleOptions.succesInput)
            evt.currentTarget.setCustomValidity('');
        }
    };

    const cvvHandler = (evt: React.FormEvent<HTMLInputElement>): void => {
        setCvv(evt.currentTarget.value.replace(/[^\d]/g, ''));
        if (evt.currentTarget.value.length < MAX_LENGTH_CVV) {
            setOutlineCvv(styleOptions.failInput)
            evt.currentTarget.setCustomValidity(`ещё ${MAX_LENGTH_CVV - evt.currentTarget.value.length} символов`)
        } else {
            setOutlineCvv(styleOptions.succesInput)
            evt.currentTarget.setCustomValidity('');
        }
    };

    return (
        <form className="form">
            <div className="form__wrapper">
                <div className="form__group">
                    <label className="form__label" htmlFor="number">Введите номер карты</label>
                    {(numberCardDirty && message) && <div style={numberMessageStyle}>{message}</div>}
                    <input 
                        onChange={(evt) => numberHandler(evt)}
                        onBlur={(evt) => blurHanler(evt)} 
                        value={numberCard}
                        id="number" 
                        name="number" 
                        type="text" 
                        className="form__card-number" 
                        maxLength={MAX_LENGTH_NUMBER} 
                        placeholder="0123 4567 8910 1112" 
                        required />
                </div>
                <div className="form__group-wrapper">
                    <div className="form__group">
                        <label className="form__label" htmlFor="month">
                            Месяц
                        </label>
                        <input 
                            onChange={(evt) => monthHandler(evt)}
                            style={outlineMonth}
                            value={monthInput}
                            id="month"
                            name="month" 
                            type="text" 
                            placeholder="11" 
                            maxLength={MAX_LENGTH_MONTH} 
                            required />
                    </div>
                    <span>/</span>
                    <div className="form__group">
                        <label className="form__label" htmlFor="year">
                            Год
                        </label>
                        <input 
                            onChange={(evt) => yearHandler(evt)}
                            style={outlineYear}
                            value={yearInput}
                            id="year" 
                            name="year" 
                            type="text" 
                            placeholder="20" 
                            maxLength={MAX_LENGTH_YEAR} 
                            required />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="cvv">
                            СVV2
                        </label>
                        <input 
                            onChange={(evt) => cvvHandler(evt)}
                            style={outlineCvv}
                            value={cvv}
                            id="cvv" 
                            name="cvv" 
                            type="text" 
                            placeholder="123" 
                            maxLength={MAX_LENGTH_CVV} 
                            required />
                    </div>
                </div>
                <div className="footer">
                <button type="submit" className="submit" >Оплатить</button>
                </div>
            </div>
        </form>
    );
};

export default Form;