import { useOutlet } from "react-router-dom";
import { useState } from "react";

const AnimatedOutlet = () => {
    const outlet = useOutlet();
    const [outletReference] = useState(outlet);

    return <>{outletReference}</>
}

export default AnimatedOutlet;