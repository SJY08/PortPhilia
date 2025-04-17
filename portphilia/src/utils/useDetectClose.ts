import { useState, useEffect } from "react"

const useDetectClose = (ref: any) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            window.addEventListener("click", handleClick)
        }

        return () => {
            window.removeEventListener("click", handleClick)
        }
    }, [isOpen, ref])

    return [isOpen, setIsOpen] as const
}

export default useDetectClose
