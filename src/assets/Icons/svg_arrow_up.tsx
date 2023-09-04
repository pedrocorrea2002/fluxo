import {Svg, G, Path} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const ArrowUp = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G strokeWidth={5} stroke="black">
                <Path
                    d="M 138.06634,165.63819 L 2.0663401,301.62717 L 2.0663401,181.62851 L 182.56634,2.1326782 L 363.06634,181.62851 L 362.31908,300.13268 L 226.06634,164.63819 L 226.06634,433.13268 L 138.06634,433.13268 L 138.06634,165.63819 z "
                    fill={Props.color}
                />
            </G>
        </Svg>
    )
}