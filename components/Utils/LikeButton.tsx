const LikeButton = ({ liked }: any) => {
    return (
        <svg height="100%" width="100%" viewBox="0 0 16 16"
            stroke={liked ? "" : "white"}
            strokeWidth="1px"
        >
            <defs>
                <linearGradient id="Gradient1">
                    <stop offset="0%" stopColor="rgb(107, 102, 250)" />
                    <stop offset="90%" stopColor="rgb(193, 122, 255)" />
                </linearGradient>
            </defs>
            <path
                fill={liked ? "url(#Gradient1)" : 'transparent'}
                d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
        </svg >
    )
}

export default LikeButton

