import {Svg, G, Path} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Filter = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G scale={25}>
                <Path
                    d="M12 12l8-8V0H0v4l8 8v8l4-4v-4z"
                    fill={Props.color}
                />
            </G>
        </Svg>
    )
}