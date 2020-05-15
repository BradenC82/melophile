import React from 'react'

export default function StatRow(props) {
    return (
        <div className={`${props.color} h-full`} style={{ width: `${100 * props.stat}%` }}>
            {props.stat}
        </div>
    )
}
