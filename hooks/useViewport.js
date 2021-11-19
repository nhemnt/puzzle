import { useEffect, useState } from 'react';
import viewportjs from 'viewportjs';

/**
 * Configured instance of viewportjs.
 * [Documentation]{@link https://github.com/ryanfitzer/ViewportJS#readme}
 */
const vps = viewportjs( [
    {
        name: 'small',
        query: '( min-width: 0em )', // 0px
    },
    {
        name: 'medium',
        query: '( min-width: 48em )', // 768px
    },
    {
        name: 'large',
        query: '( min-width: 62em )', // 992px
    },
    {
        name: 'xlarge',
        query: '( min-width: 75em )', // 1200px
    },
] );

/**
 * React hook for responding to viewport changes.
 * @returns {object} An object keyed with each viewport name and a boolean value.
 */
const useViewport = () => {

    const [ viewports, setViewports ] = useState( {
        isSmall: true,
        isMedium: false,
        isLarge: false,
        isXlarge: false,
    } );

    useEffect( () => {

        // https://github.com/facebook/react/issues/14369#issuecomment-468267798
        let didCancel = false;

        const unsubscribe = vps( ( state, vp ) => {

            if ( didCancel ) return;

            setViewports( {
                isSmall: vp.current( 'small' ),
                isMedium: vp.current( 'medium' ),
                isLarge: vp.current( 'large' ),
                isXlarge: vp.current( 'xlarge' ),
            } );

        }, [] );


        return () => {

            didCancel = true;
            unsubscribe();

        };

    }, [] );

    return viewports;

};

export default useViewport;
export { vps };
