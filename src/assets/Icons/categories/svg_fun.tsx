import { Svg, G, Path, Line, Circle } from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Fun = (Props) => {
    return (
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G scale={16}>
                <Circle 
                    cx="24" cy="9" r="4"
                    fill={Props.color}
                />
                <Line 
                    x1="24" x2="24" y1="1" y2="2"
                    stroke={Props.color}
                />
                <Line 
                    x1="24" x2="24" y1="16" y2="17"
                    stroke={Props.color}
                />
                <Line 
                    x1="17.1" x2="17.9" y1="5" y2="5.5"
                    stroke={Props.color}
                />
                <Line 
                    x1="30.9" x2="30.1" y1="13" y2="12.5"
                    stroke={Props.color}
                />
                <Line 
                    x1="30.9" x2="30.1" y1="5" y2="5.5"
                    stroke={Props.color}
                />
                <Path 
                    d="M27,31c-2.9-3.6-7.4-6-12.5-6S4.9,27.4,2,31H27z"
                    fill={Props.color}
                />
                <Path 
                    d="M11,11c-4.6,0-8.4,3.4-8.9,7.9C2,19.5,2.5,20,3.1,20h15.9c0.6,0,1.1-0.5,1-1.1C19.4,14.4,15.6,11,11,11z"
                    stroke={Props.color}
                />
                <Path 
                    d="M15,20c-0.2-5.1-1.9-9-4-9s-3.7,3.9-4,9"
                    stroke={Props.color}
                />
                <Line 
                    x1="11" x2="11" y1="20" y2="25"
                    stroke={Props.color}
                />
            </G>
        </Svg>
    )
}