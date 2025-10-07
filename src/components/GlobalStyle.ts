const toastDarkStyle = (): object => {
  return {
    style: {
      borderRadius: '10px',
      background: 'rgba(0,0,0,1)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: '#fff',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '15px',
    },
    position: 'top-right',
  };
};

export const brandConfig = {
  logo: "https://res.cloudinary.com/deov0brww/image/upload/v1755493154/hkrcmm6ancpnxyhfazzt_ypfayk_nogisj.webp",
  main_logo: "https://res.cloudinary.com/deov0brww/image/upload/v1755493153/r1dvwwbwxw7b98misirm_u5nt2k_fywq7d.webp",
  background_video: "https://res.cloudinary.com/deov0brww/video/upload/v1755493171/background_gemahm_j6o3yn.mp4"
}

export { toastDarkStyle };