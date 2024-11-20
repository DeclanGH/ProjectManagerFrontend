class DateHelper {
    /**
     * Formats a Java date-time string to a readable format: "03 Nov, 2024. Time: 01:12"
     * @param {string} javaDateTime - The Java date-time string in ISO format.
     * @returns {string} - The formatted date-time string.
     */
    static convertToReadableFormat(javaDateTime) {
        if (!javaDateTime) return "";

        const dateObject = new Date(javaDateTime);

        const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(dateObject);

        const formattedTime = dateObject.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        return `${formattedDate}. Time: ${formattedTime}`;
    }

    static convertJsDateToYearMonthDateFormat(javaScriptDate) {
        const year = javaScriptDate.getFullYear();
        const month = String(javaScriptDate.getMonth() + 1).padStart(2, '0');
        const day = String(javaScriptDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
}

export default DateHelper;
