const middleButtons = {
    gap: 2,
    '& .MuiButton-root': {
        border: 'none !important',
    },
    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
        borderRight: 'none !important',
    },
    fontFamily: "'Montserrat', sans-serif !important",
}

const rightButtons = {
    gap: 2,
    background: 'transparent',
    boxShadow: 'none',
    '& .MuiButton-root': {
        borderRadius: '7px',
        minWidth: 100,
        boxShadow: 'none',
        border: 'none',
    },
    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
        border: 'none',
    },
    fontFamily: "'Montserrat', sans-serif !important",
}

const paperStyle = {
    padding: 2,
    marginBottom: 1,
    width: 'full',
    display: 'flex',
    justifyContent: 'space-around',
    height: '60px',
    alignItems: 'center',
    fontFamily: "'Montserrat', sans-serif !important",
}

const TitleStyle = {
    fontFamily: "'Montserrat', sans-serif !important",
    fontWeight: 300,
    textAlign: 'left'
}

const buttonStyle1 = {
    color: "white",
    backgroundColor: "#EBB4D3",
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '1.1rem',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#e39bc8',
        boxShadow: 'none',
    },
    width: '140px',
    fontFamily: "'Montserrat', sans-serif !important",
};

const buttonStyle2 = {
    color: "white",
    backgroundColor: "#EBB4D3",
    borderRadius: 2,
    fontSize: '1rem',
    '&:hover': {
        backgroundColor: '#e39bc8',
    },
    width: '140px',
    textTransform: 'capitalize !important',
    fontFamily: "'Montserrat', sans-serif !important",
};

const cloudTextStyle = {
    fontFamily: "Abhaya Libre, serif",
    fontWeight: '700',
    textAlign: 'center',
    fontSize: '1rem',
    color: 'rgb(106, 62, 167)',
    marginTop: 13,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5,
}

const boxStyle = {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    background: '#fff',
    padding: '20px',
    marginTop: '100px',
    marginleft: '50px',
    marginBottom: '100px',
    fontFamily: "'Montserrat', sans-serif !important",
}

export { middleButtons, rightButtons, paperStyle, TitleStyle, buttonStyle1, buttonStyle2, cloudTextStyle, boxStyle };