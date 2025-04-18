import { useContext, useState } from "react";
import { Context } from "../ContextProvider";

const Goal = () => {

    interface InputState {
        protein: string;
        calories: string;
    };

    const {setGoal, protein, calories, setDaily}:any = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState<InputState>({protein: protein || "", calories: calories || ""});

    const handleChange = (e:any) => {
        const {name, value} = e.target
        setInput(prevState => ({
            ...prevState,
            [name]:value
        }))
    };

    const handleSubmit = () => {
        setGoal((prevState:object) => ({
            ...prevState,
            calories: input['calories'],
            protein: input['protein']
        }));
        localStorage.setItem('Calorie Goal', input['calories']);
        localStorage.setItem('Protein Goal', input['protein']);

        setDaily((prevState:object) => ({
            ...prevState,
            dailyCalories: input['calories'],
            dailyProtein: input['protein']
        }));
        localStorage.setItem('Daily Calories', input['calories']);
        localStorage.setItem('Daily Protein', input['protein']);
        setEdit(false);
    };

    return (
        <div className="goal">
            <button className="edit" onClick={()=> setEdit(prev => !prev)}>{!edit ? <span>Edit Goal</span> : <span className="material-symbols-rounded">close</span>}</button>
            <h1>GOAL</h1>
            <h3>Calories: 
                {!edit ? <span> {calories}</span> 
                : 
                <input 
                    type="number"
                    name="calories"
                    value={input['calories']}
                    onChange={handleChange}
                    placeholder="Calories"
                    required
                />}
            </h3>
            <h3>Protein: 
                {!edit ? <span> {protein}</span> 
                : 
                <input 
                    type="number"
                    name="protein"
                    value={input['protein']}
                    onChange={handleChange}
                    placeholder="Protein"
                    required
                />}
            </h3>
            {edit && <button className="daily-btn" onClick={handleSubmit}>SET</button>}
        </div>
    )
}

export default Goal;