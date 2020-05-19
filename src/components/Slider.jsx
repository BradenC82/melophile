

 


import React, {useState} from 'react'
import { Range } from 'react-range';

export default function Slider() {
    const [values, setValues] = useState([50])
    return (
        <Range
        step={0.1}
        min={0}
        max={100}
        values={values}
        onChange={values => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
    )
}
