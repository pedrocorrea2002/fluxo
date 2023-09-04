import {Svg, G, Path} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Work = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G scale={11}>
                <Path 
                    d="M40 12h-8v-4c0-2.21-1.79-4-4-4h-8c-2.21 0-4 1.79-4 4v4h-8c-2.21 0-3.98 1.79-3.98 4l-.02 22c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4v-22c0-2.21-1.79-4-4-4zm-12 0h-8v-4h8v4z"                    fill={Props.color}
                />
            </G>
        </Svg>
    )
}