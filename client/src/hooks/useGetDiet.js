import { useEffect, useState } from 'react'
const apiKey = '4331b387137c4e37a2388bf04971a06a';
// const apiKey = '';
function useGetDiet({ targetCalory }) {
    const [diet, setDiet] = useState(null);
    useEffect(() => {
        const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=week&targetCalories=${targetCalory || 2000}`

        fetch(url)
            .then(res => res.json())
            .then(data => setDiet(data?.week))
            .catch(e => console.log(e))
    }, [targetCalory])
    return diet
}

export default useGetDiet