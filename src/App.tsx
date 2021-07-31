import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from "./components/Button";
import {v1} from "uuid";


export type stateTypes = string[]

function App() {

    const initialState = ['0']
    const [state, setState] = useState<stateTypes>(initialState)
    const [result, setResult] = useState([''])

    const calc = (v: string) => {
        let cur = state.length - 1
        let copy = [...state]
        if (isFinite(+v) && (state.length % 2)) {
            if (state[cur] === '0') {
                copy[cur] = v
                return copy
            } else {
                copy[cur] += v
                return copy
            }
        }
        if ((state.length % 2) && v === '.' && !copy[cur].includes('.')) {
            copy[cur] += '.'
            return copy
        }

        if (isFinite(+v) && !(state.length % 2)) {
            copy.push(v)
            return copy
        }
        if ((v === '+' || v === '-' || v === '/' || v === '*') && (state.length % 2)) {
            if (copy[cur].endsWith('.')) {
                copy[cur] = copy[cur].slice(0, -1)
            }
            copy.push(v)
            return copy
        }

        if (v === 'Enter') {
            let results = [...result, currentResult]
            setResult( results )
            return copy = ['0']
        } else return copy
    }


    const numButtons = [
        {id: v1(), key: "1"},
        {id: v1(), key: "2"},
        {id: v1(), key: "3"},
        {id: v1(), key: "4"},
        {id: v1(), key: "5"},
        {id: v1(), key: "6"},
        {id: v1(), key: "7"},
        {id: v1(), key: "8"},
        {id: v1(), key: "9"},
        {id: v1(), key: "0"},
        {id: v1(), key: "."},
        {id: v1(), key: "Enter"}];
    const operatorButtons = [
        {id: v1(), key: "/"},
        {id: v1(), key: "*"},
        {id: v1(), key: "-"},
        {id: v1(), key: "+"},]

    let currentOperator = ''
    let currentResult = state.reduce((prev: any, curr: any) => {
        if (curr === '+' || curr === '-' || curr === '/' || curr === '*') {
            currentOperator = curr
            return prev
        } else {
            switch (currentOperator) {
                case '+':
                    return +prev + +curr
                case '-':
                    return +prev - +curr
                case '*':
                    return +prev * +curr
                case '/':
                    return +prev / +curr
            }
        }


    })


    return (
        <div className="App">
            <div className="container">
                <div className="numBox"> {numButtons.map((el) => <Button setState={setState}
                                                                         calc={calc}
                                                                         key={el.id} value={el.key}/>)}</div>
                <div className="operatorBox">{operatorButtons.map((el) => <Button setState={setState}
                                                                                  calc={calc}
                                                                                  key={el.id}
                                                                                  value={el.key}/>)}</div>
            </div>
            <div className="currentResult">{state.join(' ')} = {currentResult}</div>
            <div>Результаты:</div>
            <div className="results">{result.map((el: string) => <div>{el}</div>)}</div>


        </div>
    );
}

export default App;
