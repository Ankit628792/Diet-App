import { useEffect, useState } from 'react'
// const apiKey = '4331b387137c4e37a2388bf04971a06a';
const apiKey = '';
function useDietDetail({ id }) {
    const [dietDetail, setDietDetail] = useState(null);
    useEffect(() => {
        const url = `https://api.spoonacular.com/food/menuItems/${id}?apiKey=${apiKey}`
        if (id) {
            fetch(url)
                .then(res => res.json())
                .then(data => setDietDetail(data))
                .catch(e => console.log(e))
        }
    }, [id])
    return dietDetail
}

export default useDietDetail