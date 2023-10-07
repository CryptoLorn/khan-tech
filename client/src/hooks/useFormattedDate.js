import { useState, useEffect } from 'react';

const useFormattedDate = (initialDate) => {
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        const formatDate = (dateString) => {
            const inputDate = new Date(dateString);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

            // I get value of day, month and year
            const day = inputDate.getDate();
            const monthIndex = inputDate.getMonth();
            const year = inputDate.getFullYear();

            // Return formatted date
            return `${day} ${months[monthIndex]} ${year}`;
        };

        if (initialDate) {
            const formatted = formatDate(initialDate);
            setFormattedDate(formatted);
        }
    }, [initialDate]);

    return formattedDate;
};

export default useFormattedDate;