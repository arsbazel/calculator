import React, {Dispatch, SetStateAction, useState} from "react";
import s from "./Button.module.css"
import {stateTypes} from "../App";

type ButtonPropsType = {
    value: string
    calc: (v: string) => SetStateAction<stateTypes>
    setState: Dispatch<SetStateAction<stateTypes>>
}

export const Button: React.FC<ButtonPropsType> = (props:ButtonPropsType) => {

    let calc = props.calc


    const buttonHandler = (event: any) => props.setState(calc(event.target.innerHTML))
    return (
        <button onClick={buttonHandler} className={s.glowButton}>{props.value}</button>
    )
}