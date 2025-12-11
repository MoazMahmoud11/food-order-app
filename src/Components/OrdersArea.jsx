// import { useContext } from "react";
// import  {MealsContext}  from "./ordersContext.jsx";
import MealsItem from './MealsItem.jsx';
import Error from './Error.jsx'; 
import useHttp from "../Hooks/useHttp.js"; // *New

const requestConfig = {}; // *New

export default function OrdersArea() {
    // const { meals, isLoading, error } = useContext(MealsContext);
    const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('https://6925873e82b59600d7240307.mockapi.io/FoodOrderAPI/meals', requestConfig, []); // *New


    if (isLoading){
        return <p className="center">Loading meals...</p>;
    } 

    if (error){
    return <Error title='Failed to fetch meals' message={error}/>; 
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealsItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}
