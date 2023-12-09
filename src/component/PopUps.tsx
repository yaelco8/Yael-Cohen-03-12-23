import { useCallback, useEffect } from 'react'
import { BiErrorCircle } from "react-icons/bi"
import { BsCheckCircle } from "react-icons/bs"
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store'
import { popOn } from '../store/global/global-action'

export enum PopupType {
    Error, Success
}

const PopUps = () => {
    const { message } = useSelector((state: RootState) => state.global)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!message) return
        const id = setTimeout(() => {
            popOn(dispatch, undefined)
        }, 1000)
        return () => clearTimeout(id)
    }, [message])

    const IconElement = useCallback(() => {
        if (!message) return null
        switch (message.type) {
            case PopupType.Error:
                return <BiErrorCircle />
            case PopupType.Success:
                return <BsCheckCircle />
        }
    }, [message])
    if (!message) return null
    return (
        <section className='popup-section'>
            <div className='popup'>
                <IconElement />
                {message.content}
            </div>
        </section>
    )
}

export default PopUps
