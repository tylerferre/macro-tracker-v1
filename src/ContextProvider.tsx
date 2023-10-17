import { createContext, useEffect, useState } from 'react'

const Context = createContext({})

const ContextProvder = (props:any) => {

    const [goal, setGoal] = useState({calories: localStorage.getItem('Calorie Goal') || '0', protein: localStorage.getItem('Protein Goal') || '0'})
    const [daily, setDaily] = useState({dailyCalories: localStorage.getItem('Daily Calories') || '0', dailyProtein: localStorage.getItem('Daily Protein') || '0'})

    const subtractMacros = (num1:string, num2:string) => {
        const calories = parseInt(num1)
        const protein = parseInt(num2)
        setDaily((prevState:any) => ({
            ...prevState,
            dailyCalories: prevState['dailyCalories'] - calories,
            dailyProtein: prevState['dailyProtein'] - protein
        }))
    }

    useEffect(()=> {
        localStorage.setItem('Daily Calories', daily['dailyCalories'])
        localStorage.setItem('Daily Protein', daily['dailyProtein'])
    },[daily])


    const reset = () => {
        setDaily({dailyCalories: goal['calories'], dailyProtein: goal['protein']})
        localStorage.setItem('Daily Calories', goal['calories'])
        localStorage.setItem('Daily Protein', goal['protein'])
    }

    return (
        <Context.Provider
            value={{
                ...goal,
                ...daily,
                setGoal,
                setDaily,
                subtractMacros,
                reset
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export {Context, ContextProvder}