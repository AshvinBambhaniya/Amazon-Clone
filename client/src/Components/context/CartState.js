import { useState } from "react";
import cartContext from "./cartContext";
import { toast } from "react-toastify";

const CartState = (props) => {
    const cartInitial = []
    const [carts, setCarts] = useState(cartInitial);
    const [account, setAccount] = useState(false);
    const [user, setUser] = useState({})

    const validuser = async () => {

        try {
            const res = await fetch("api/auth/validuser", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                credentials: "include"
            });

            const data = await res.json();
            // console.log(data);

            if (res.status !== 201) {
                toast.info("Please login for better experince 😃!", {
                    position: "top-center"
                });
                // console.log("first login");
            } else {
                // console.log("cart add ho gya hain");
                // console.log(data);
                setUser(data)
                setAccount(true);
                fetchAllCartProduct();
            }
        } catch (error) {
            toast.info("Please login for better experince 😃!", {
                position: "top-center"
            });
        }
    }

    const fetchAllCartProduct = async () => {
        const res = await fetch("api/cart/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data.carts);

        if (res.status !== 201) {
            alert("no data available")
        } else {
            // console.log("data cart main hain");
            setCarts(data)
        }
    };


    // Get all Notes
    // const getNotes = async () => {
    //     // API Call 
    //     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "auth-token": localStorage.getItem('token')
    //         }
    //     });
    //     const json = await response.json()
    //     setNotes(json)
    // }

    // // Add a Note
    // const addNote = async (title, description, tag) => {
    //     // TODO: API Call

    //     const response = await fetch(`${host}/api/notes/addnote`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "auth-token": localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({ title, description, tag })
    //     });
    //     const note = await response.json();
    //     setNotes(notes.concat(note))
    // }

    // // Delete a Note
    // const deleteNote = async (id) => {
    //     // TODO: API Call
    //     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "auth-token": localStorage.getItem('token')
    //         }
    //     });

    //     const json = response.json();
    //     const newNotes = notes.filter((note) => { return note._id !== id })
    //     setNotes(newNotes)
    // }


    // // Edit a Note
    // const editNote = async (id, title, description, tag) => {
    //     // API Call 
    //     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "auth-token": localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({ title, description, tag })
    //     });
    //     const json = await response.json();

    //     let newNotes = JSON.parse(JSON.stringify(notes))
    //     // Logic to edit in client
    //     for (let index = 0; index < newNotes.length; index++) {
    //         const element = newNotes[index];
    //         if (element._id === id) {
    //             newNotes[index].title = title;
    //             newNotes[index].description = description;
    //             newNotes[index].tag = tag;
    //             break;
    //         }
    //     }
    //     setNotes(newNotes);
    // }


    return (
        <cartContext.Provider value={{ carts, setCarts, account, setAccount, validuser, user, setUser, fetchAllCartProduct }}>
            {props.children}
        </cartContext.Provider>
    )
}

export default CartState;