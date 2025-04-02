import { useContext, useState } from 'react';
import { Context } from '../ContextProvider';

const Daily = () => {

    const {dailyProtein, dailyCalories, subtractMacros, reset}:any = useContext(Context);
    const initForm = {calories: '', protein: ''};
    const [formData, setFormData] = useState(initForm);

    const handleChange = (e:any) => {
        const {name, value} = e.target
        setFormData((prevState:any) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        localStorage.removeItem('Daily Calories');
        localStorage.removeItem('Daily Protein');
        subtractMacros(formData['calories'], formData['protein']);
        setFormData(initForm);
    }

    return (
        <>
            <div className='daily'>
                <h1>Remaining</h1>
                <h3>Calories: <span>{dailyCalories}</span></h3>
                <h3>Protein: <span>{dailyProtein}</span></h3>
            </div>
            <form onSubmit={handleSubmit} className='dailyForm'>
                <input 
                    type="number" 
                    name='calories'
                    value={formData['calories']}
                    onChange={handleChange}
                    placeholder='Calories'
                    required
                />
                <input 
                    type="number" 
                    name='protein'
                    value={formData['protein']}
                    onChange={handleChange}
                    placeholder='Protein'
                    required
                />
                <button className='daily-btn'>Enter</button>
            </form>
            <button className='reset' onClick={reset}>Reset</button>
        </>
    )
}

export default Daily