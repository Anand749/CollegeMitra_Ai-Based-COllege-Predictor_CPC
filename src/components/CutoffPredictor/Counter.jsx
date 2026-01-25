import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

const Counter = ({ value, duration = 2, decimals = 2, suffix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);

    const spring = useSpring(0, {
        stiffness: 80,
        damping: 15,
        mass: 1,
    });

    const rounded = useTransform(spring, (latest) => {
        // Handle decimals to ensure smooth rolling of the last few digits
        return Number(latest).toFixed(decimals);
    });

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    useMotionValueEvent(rounded, "change", (latest) => {
        setDisplayValue(latest);
    });

    return (
        <motion.span>
            {displayValue}{suffix}
        </motion.span>
    );
};

export default Counter;
