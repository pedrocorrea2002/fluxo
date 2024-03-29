import {Svg, G, Path} from 'react-native-svg'

type Props = {
    width: Number;
    height: Number;
    color: String
}

export const Market = (Props) => {
    return(
        <Svg width={Props.width} height={Props.height} viewBox="0 0 511 511">
            <G scale={4}>
                <Path 
                    d="M115.1,53.5l6.9-28.8c0.2-0.9,0-1.8-0.6-2.6c-0.6-0.7-1.4-1.1-2.4-1.1H21.5C18.8,8.7,11.3,2,11,1.7C9.7,0.7,7.8,0.8,6.8,2   C5.7,3.3,5.8,5.2,7,6.2c0.1,0.1,7.2,6.5,9,18.2l8.7,57.5c1,6.4,6.4,11.1,12.9,11.1H97c1.7,0,3-1.3,3-3s-1.3-3-3-3H37.6   c-3.5,0-6.4-2.5-6.9-6l-0.1-0.6L96,70.9C105.4,69.6,112.9,62.7,115.1,53.5z M50,59c0,1.7-1.3,3-3,3s-3-1.3-3-3V35c0-1.7,1.3-3,3-3   s3,1.3,3,3V59z M70,59c0,1.7-1.3,3-3,3s-3-1.3-3-3V35c0-1.7,1.3-3,3-3s3,1.3,3,3V59z M90,59c0,1.7-1.3,3-3,3s-3-1.3-3-3V35   c0-1.7,1.3-3,3-3s3,1.3,3,3V59z"
                    fill={Props.color}
                />
                <Path 
                    d="M31,114c0,7.2,5.8,13,13,13s13-5.8,13-13s-5.8-13-13-13S31,106.8,31,114z M51,114c0,3.9-3.1,7-7,7s-7-3.1-7-7s3.1-7,7-7   S51,110.1,51,114z"
                    fill={Props.color}
                />
                <Path 
                    d="M87,101c-7.2,0-13,5.8-13,13s5.8,13,13,13s13-5.8,13-13S94.2,101,87,101z M87,121c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7   S90.9,121,87,121z"
                    fill={Props.color}
                />
            </G>
        </Svg>
    )
}