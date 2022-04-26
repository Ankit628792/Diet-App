import { useEffect, useState } from 'react'
const apiKey = '4331b387137c4e37a2388bf04971a06a';
// const apiKey = '';
function useGetDiet({ targetCalory }) {
    const [diet, setDiet] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        setIsFetching(true)
        const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=week&targetCalories=${targetCalory || 2000}`

        fetch(url)
            .then(res => res.json())
            .then(data => { if (data.code >= 400) { setIsError(true) }; setDiet(data?.week); setIsFetching(false) })
            .catch(e => { console.log(e); setIsFetching(false) })

    }, [targetCalory])
    return [diet, isFetching, isError]
}

export default useGetDiet