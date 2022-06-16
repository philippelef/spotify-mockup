import * as React from 'react';
import styles from "../../styles/VolumeSlider.module.css"
import { Range, getTrackBackground } from 'react-range'
import { initialVolume, usePlay } from '../../context/PlayContext';
import { useEffect } from 'react';

const STEP = 0.01;
const MIN = 0;
const MAX = 1;

const VolumeSlider = ({ rtl }: any) => {
    const [values, setValues] = React.useState([initialVolume]);
    const { muted, volume, setVolume } = usePlay()

    useEffect(() => {
        if (muted) {
            setValues([0])
        }
        else {
            setValues([volume])
        }
    }, [muted])


    return (
        <div
            className={styles.volumeSliderWrapper}
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                width: '100%',
            }}
        >
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                rtl={rtl}
                onChange={(values) => { setValues(values); setVolume(values[0]) }}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%'
                        }}
                    >
                        <div
                            className={styles.Range}
                            ref={props.ref}
                            style={{
                                background: getTrackBackground({
                                    values,
                                    colors: ['#c17aff', '#5e5e5e'],
                                    min: MIN,
                                    max: MAX,
                                    rtl
                                }),
                                alignSelf: 'center'
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged }) => (
                    <div
                        className={styles.Thumb}
                        {...props}
                        style={{
                            height: '12px',
                            width: '12px',
                            borderRadius: '12px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            outline: 'none',
                        }}
                    >
                    </div>
                )}
            />
        </div>
    );
};

export default VolumeSlider;