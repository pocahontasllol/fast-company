import React from "react";
import { useState } from "react";
import api from "../api"

const Users = () => {
  const [users,setUsers] = useState(api.users.fetchAll())
  
  const handleDelete = (userId) =>{

  }
  const renderPharse = (number) => {

  }
  
}

// reactDom.render(<Users />,document.getElementById('root'))


export default Users