import React, { useContext, useEffect, useState } from 'react'
import "../header/navbaar.css"
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import cartContext from '../context/cartContext';
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader';
import { getProducts } from '../redux/actions/action';
import { useSelector, useDispatch } from "react-redux";


const usestyle = makeStyles({
    component: {
        marginTop: 10,
        marginRight: "-50px",
        width: "300px",
        padding: 50,
        height: "300px"
    },
})


const Navbaar = () => {

    const classes = usestyle();

    const history = useHistory("");

    const [text, setText] = useState();
    // only for search
    const { products } = useSelector(state => state.getproductsdata);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])


    const [open, setOpen] = useState(false);
    const [liopen, setLiopen] = useState(true);

    const [dropen, setDropen] = useState(false);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };
    const handleClose = () => {
        setOpen(false)
    };

    const context = useContext(cartContext);
    const { account, validuser, setAccount, carts, user, setUser } = context;

    const getdetailsvaliduser = async () => {
        validuser();
    }

    useEffect(() => {
        getdetailsvaliduser();
    }, []);

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         getdetailsvaliduser();
    //     } else {
    //         console.log("hi");
    //     }
    //     // eslint-disable-next-line
    // }, [])

    // for logout
    const logoutuser = async () => {

        localStorage.removeItem('token')
        setAccount(false);
        setOpen(false)
        toast.success("user Logout 😃!", {
            position: "top-center"
        });
        history.push("/");
    }

    // for drawer

    const handelopen = () => {
        setDropen(true);
    }

    const handleClosedr = () => {
        setDropen(false)
    }

    const getText = (text) => {
        setText(text)
        setLiopen(false)
    }


    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className="hamburgur" onClick={handelopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    {/* here define the right header */}
                    <Drawer open={dropen} onClose={handleClosedr} >
                        <Rightheader userlog={logoutuser} logclose={handleClosedr} />
                    </Drawer>
                    <div className="navlogo">
                        <NavLink to="/"> <img src="./amazon_PNG25.png" alt="logo" /> </NavLink>
                    </div>
                    <div className="nav_searchbaar">
                        <input type="text" name=""
                            onChange={(e) => getText(e.target.value)}
                            placeholder="Search Your Products" />
                        <div className="search_icon">
                            <i className="fas fa-search" id="search"></i>
                        </div>
                        {
                            text &&
                            <List className="extrasearch" hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map((product, i) => (
                                        <ListItem key={i}>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className="right">
                    {
                        account ? <>

                        </> : <div className="nav_btn">
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
                    }


                    {
                        account ? <NavLink to="/buynow">
                            <div className="cart_btn">
                                <Badge badgeContent={carts.length} color="secondary">
                                    <i className="fas fa-shopping-cart" id="icon"></i>
                                </Badge>

                                <p>Cart</p>
                            </div>
                        </NavLink> : <NavLink to="/login">
                            <div className="cart_btn">
                                <Badge badgeContent={0} color="secondary">
                                    <i className="fas fa-shopping-cart" id="icon"></i>
                                </Badge>
                                <p>Cart</p>
                            </div>
                        </NavLink>
                    }

                    {
                        account ?
                            <Avatar className="avtar2"
                                onClick={handleClick} title={user.fname.toUpperCase()}>{user.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar"
                                onClick={handleClick} />
                    }

                    <div className="menu_div">
                        <Menu
                            anchorEl={open}
                            open={Boolean(open)}
                            onClose={handleClose}
                            className={classes.component}
                        >
                            <MenuItem onClick={handleClose} style={{ margin: 10 }}>My account</MenuItem>
                            {account ? <MenuItem onClick={handleClose} style={{ margin: 10 }} onClick={logoutuser}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />   Logout</MenuItem> : ""}
                        </Menu>
                    </div>
                    <ToastContainer />
                </div>
            </nav>
        </header>
    )
}

export default Navbaar;


// account ? <Button id="basic-button"
// aria-controls="basic-menu"
// aria-haspopup="true"
// aria-expanded={open ? 'true' : undefined}
// onClick={handleClick}> <Avatar className="avtar2" title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar>  </Button> : <Button id="basic-button"
//     aria-controls="basic-menu"
//     aria-haspopup="true"
//     aria-expanded={open ? 'true' : undefined}
//     onClick={handleClick}> <Avatar className="avtar" />
// </Button>