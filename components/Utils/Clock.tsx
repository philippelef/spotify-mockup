const Clock = ({ color }: { color: string }) => {
    return (
        <div style={{ height: '16px', width: '16px' }}>
            <svg height="100%" width="100%" viewBox="0 0 16 16"
                fill={color}
                shapeRendering="geometricPrecision"
            >
                <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
                <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path>
            </svg>
        </div>
    )
}

export default Clock