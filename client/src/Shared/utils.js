export const dateParser = (num) => {

    let options = {

        hour: "2-digit", minute: "2-digit", year: "numeric",

        month: "short", day: "numeric"

    };




    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString('En-EN', options);


    return date.toString();




};




export const timestampParser = (num) => {

    let options = {

        hour: "2-digit", minute: "2-digit", year: "numeric",

        month: "short", day: "numeric"

    };




    let date = new Date(num).toLocaleDateString('En-EN', options);




    return date.toString();

}





export const isEmpty = (value) => {

    return (

        value === undefined ||

        value === null ||

        (typeof value === "object" && Object.keys(value).length === 0) ||

        (typeof value === "string" && value.trim().length === 0)

    );

};

