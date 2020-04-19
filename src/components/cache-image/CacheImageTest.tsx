import * as React from 'react'
import { View } from 'react-native'
import { CacheImage } from './CacheImage'

export class CacheImageTest extends React.PureComponent {

    public render(): JSX.Element {
        return (
            <View>
                <CacheImage
                    url={'https://wallpapercave.com/wp/AQFHztL.jpg'}
                />
                <CacheImage
                    url={'https://wallpapercave.com/wp/7IOuvtx.jpg'}
                />
                <CacheImage
                    url={'https://wallpapercave.com/wp/TyCQucP.jpg'}
                />
            </View>
        )
    }
}
