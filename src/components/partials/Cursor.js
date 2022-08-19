const Cursor = ({ className = '' }) => {
    return (
        <span className={`cursor ml-1 animate-blink ${className}`}>_</span>
    )
}

export default Cursor;