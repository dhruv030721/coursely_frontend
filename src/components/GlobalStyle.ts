const toastDarkStyle = (): object => {
    return {
        style: {
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontFamily: "DM Sans, sans-serif",
            fontSize: "15px"
        },
        position: 'bottom-left'
    }
}

export { toastDarkStyle };