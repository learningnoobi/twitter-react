import { useState } from 'react'

const usePaginate = () => {
    const [page, setPage] = useState(1)
    const [next_page, setnext_page] = useState('')
    const [prev_page, setPrev_page] = useState('')
    const next = async () => {
        if (next_page === null) return;
        setPage(prev => prev + 1)
    }

    const prev = async () => {
        if (prev_page === null) return;
        setPage(prev => prev - 1)
    }

    return { page, setnext_page, setPrev_page, next, prev }
}

export default usePaginate