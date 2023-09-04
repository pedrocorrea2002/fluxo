import {Svg, G, Polygon} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Plus = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G strokeWidth={5} stroke="black">
                <Polygon
                    points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
                    fill={Props.color}
                />
            </G>
        </Svg>
    )
}