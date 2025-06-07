const toastDarkStyle = (type: string) => {
    let icon = '';
    if (type == "SUCCESS") {
        return {
            style: {
                borderRadius: '50px',
                background: '#333',
                color: '#fff',
                fontFamily: "DM Sans, sans-serif",
            },
            position: 'top-right'
        }
    } else if (type == "ERROR") {
        return {
            style: {
                borderRadius: '30px',
                background: '#333',
                color: '#fff',
            },
        }
    } else {
        return {
            icon: icon,
            style: {
                borderRadius: '30px',
                background: '#333',
                color: '#fff',
            },
        }
    }
}

export { toastDarkStyle };