import React from 'react';

const Checkbox = ({ checked, onChange, className = '', indeterminate = false, ...props }) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            checked={checked}
            onChange={onChange}
            className={`custom-checkbox ${className}`}
            {...props}
        />
    );
};

export default Checkbox;