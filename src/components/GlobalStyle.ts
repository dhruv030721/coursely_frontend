const toastDarkStyle = (): object => {
    return {
        style: {
            borderRadius: '10px',
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            fontFamily: "DM Sans, sans-serif",
            fontSize: "15px"
        },
        position: 'bottom-left'
    }
}

export const brandConfig = {
    logo: "https://res.cloudinary.com/droclyuwd/image/upload/v1750704509/hkrcmm6ancpnxyhfazzt_ypfayk.webp",
    main_logo: "https://res.cloudinary.com/droclyuwd/image/upload/v1750704510/r1dvwwbwxw7b98misirm_u5nt2k.webp",
    background_video: "https://res.cloudinary.com/droclyuwd/video/upload/v1750704483/background_gemahm.mp4"
}

export { toastDarkStyle };