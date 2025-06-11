  export const getYear = (val) => {
        if (val != undefined) {
            const date = new Date(val);
            const year = date.getFullYear();
            //console.log(year);
            if (year != NaN) {
                return year;
            } else {
                return '';
            }
        }
    }
    export const emailRegex=/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
    export const pwRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/; 