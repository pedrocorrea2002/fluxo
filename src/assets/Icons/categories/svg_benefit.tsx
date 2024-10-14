import {Svg, G, Path} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Benefit = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G scale={31}>
                <Path 
                    d="M0,12c0,1.105,0.895,2,2,2h12c1.105,0,2-0.895,2-2V7H0V12z"
                    fill={Props.color}
                />
                <Path 
                    d="M14,2H2C0.895,2,0,2.895,0,4v2h16V4C16,2.895,15.105,2,14,2z"
                    fill={Props.color}
                />
            </G>
        </Svg>
    )
}