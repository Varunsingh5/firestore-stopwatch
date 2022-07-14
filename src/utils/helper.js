export const getStatusColor = (status) => {
    // let colorObj = {
    //     Available :"green",
    //     Busy:"pink",
    //     Away:"yellow"
    // }

    // const color = colorObj[status];
    // return color;

    // const status = status;

    let color = "white";
    switch (status) {
        case "Available":
            color = "Green";
            break;

        case "Busy":
            color = "Pink";
            break;

        case "Away":
            color = "Yellow";
            break;

        default:
            color = "white";
            break;
    }
    return color;
}