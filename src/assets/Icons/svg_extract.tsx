import {Svg, G, Path} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Extract = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G strokeWidth={5} stroke="black">
                <Path
                    d="M128,496H48V304h80Z"
                    fill={Props.color}
                />
                <Path
                    d="M352,496H272V208h80Z"
                    fill={Props.color}
                />
                <Path
                    d="M464,496H384V96h80Z"
                    fill={Props.color}
                />
                <Path
                    d="M240,496H160V16h80Z"
                    fill={Props.color}
                />
            </G>
        </Svg>
    )
}