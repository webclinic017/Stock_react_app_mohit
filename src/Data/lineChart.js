export const data = (labels = [], values = [], second = []) => {
    const labelData = JSON.parse(localStorage.getItem('labels'));
    if (labelData) {
        return {

            labels: [...labelData],
            animation: false,
            datasets: [

                ...second

            ]
        };
    } else {
        return {

            labels: [],
            animation: false,
            datasets: []

        }
    }
}
export const data1 = {

    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
        {
            label: "1",
            data: [10, 53, 85, 41, 44, 65, 60],
            fill: false,
            borderColor: "#555ACA"
        },
        {
            label: "2",
            data: [10, 25, 35, 51, 54, 76, 44],
            fill: false,
            borderColor: "#21CE99"
        }
    ]
};
export const data2 = {

    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
        {
            label: "1",
            data: [10, 53, 85, 41, 44, 65, 60],
            fill: false,
            borderColor: "#555ACA"
        },
        {
            label: "2",
            data: [10, 25, 35, 51, 54, 76, 44],
            fill: false,
            borderColor: "#21CE99"
        },
        {
            label: "3",
            data: [10, 45, 15, 31, 44, 66, 24],
            fill: false,
            borderColor: "#F45631"
        }
    ]
};
export const options = {
    plugins: {
        legend: {
            display: false,
            position: 'top',
            align: 'end',
            labels: {
                usePointStyle: true,
            }
        },
    },
    scales: {

        y: {
            display: true,
            grid: {
                borderColor: 'black',
                labels: false
            },
            ticks: { display: false }

        },
        // ticks: { min: 0, max: 100, stepSize: 25 },


        x: {
            display: true,

            grid: {
                borderColor: 'black'
            },
            ticks: { display: false }
        },


    },
    maintainAspectRatio: false,
    responsive: true
}
