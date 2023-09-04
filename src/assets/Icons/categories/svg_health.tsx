import {Svg, G, Polygon} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Health = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G>
                <Polygon
                    points="448,194 318,194 318,64 194,64 194,194 64,194 64,318 194,318 194,448 318,448 318,318 448,318"
                    fill={Props.color}
                />
            </G>
        </Svg>
    )
}