export const IconArrowBack = () => (
    <svg width="20" height="20" viewBox="0 0 32 49" fill="none" className="rotate-[270deg]">
        <path d="M1 20L16 1M16 1L31 20M16 1V49" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const IconCamera = () => (
    <svg width="20" height="20" viewBox="0 -2 32 32" version="1.1">
        <g stroke="#000" fill="none" fillRule="evenodd" sketch:type="MSPage">
            <g id="Icon-Set"  sketch:type="MSLayerGroup" transform="translate(-256.000000, -465.000000)" fill="#000000">
                <path strokeWidth="1" d="M272,487 C268.687,487 266,484.313 266,481 C266,477.687 268.687,475 272,475 C275.313,475 278,477.687 278,481 C278,484.313 275.313,487 272,487 L272,487 Z M272,473 C267.582,473 264,476.582 264,481 C264,485.418 267.582,489 272,489 C276.418,489 280,485.418 280,481 C280,476.582 276.418,473 272,473 L272,473 Z M286,489 C286,490.104 285.104,491 284,491 L260,491 C258.896,491 258,490.104 258,489 L258,473 C258,471.896 258.896,471 260,471 L264,471 L265,469 C265.707,467.837 265.896,467 267,467 L277,467 C278.104,467 278.293,467.837 279,469 L280,471 L284,471 C285.104,471 286,471.896 286,473 L286,489 L286,489 Z M284,469 L281,469 L280,467 C279.411,465.837 279.104,465 278,465 L266,465 C264.896,465 264.53,465.954 264,467 L263,469 L260,469 C257.791,469 256,470.791 256,473 L256,489 C256,491.209 257.791,493 260,493 L284,493 C286.209,493 288,491.209 288,489 L288,473 C288,470.791 286.209,469 284,469 L284,469 Z" sketch:type="MSShapeGroup"></path>
            </g>
        </g>
    </svg>
)

export const IconPreviousArrow = () => (
    <svg width="15" height="15" viewBox="0 0 12 22" fill="none">
        <path d="M11 21L1 11L11 1" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
)

export const IconNextArrow = () => (
    <svg width="15" height="15" viewBox="0 0 12 22" fill="none">
        <path d="M11 21L1 11L11 1" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
)

export const IconCart = ( { isButtonsEnabled } ) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <g strokeWidth="0"/>
        <g strokeLinecap="round" strokeLinejoin="round"/>
        <g>
            <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke={ isButtonsEnabled ? "#000" : "#999" } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
    </svg>
)

export const IconShare = ( { isButtonsEnabled } ) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
        <g strokeWidth="0"/>
        <g strokeLinecap="round" strokeLinejoin="round"/>
        <g>
            <g clipPath="url(#clip0_15_72)">
                <circle cx="7" cy="12" r="2" stroke={ isButtonsEnabled ? "#000" : "#999" } strokeLinejoin="round"/>
                <circle cx="17" cy="6" r="2" stroke={ isButtonsEnabled ? "#000" : "#999" } strokeLinejoin="round"/>
                <path d="M15 7L8.5 11" stroke={ isButtonsEnabled ? "#000" : "#999" }/>
                <circle cx="17" cy="18" r="2" stroke={ isButtonsEnabled ? "#000" : "#999" } strokeLinejoin="round"/>
                <path d="M8.5 13.5L15 17" stroke={ isButtonsEnabled ? "#000" : "#999" } />
            </g>
            <defs>
                <clipPath id="clip0_15_72">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
        </g>
    </svg>
)

export const IconGoogle = ()=>(
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30px" height="30px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
)