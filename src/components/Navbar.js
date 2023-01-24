import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography } from "@mui/material";
import '../css/Navbar.css'
export default function Navbar(){

      return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              eBank
            </Typography>
            <div id="links">
            <Link to="/"><button width="10px"> <u>Setup</u></button></Link>
            <Link to="/transact"><button width="10px">  <u> Credit/Debit  </u> </button></Link> 
            <Link to="/transactions"><button width="10px"> <u> My Transactions </u></button></Link>
            </div>
          </Toolbar>
        </AppBar>
      );
    }
    
   
    
    // return (
    //     <div id="navi">
    //         <Link to="/setup"><button width="10px"> Setup </button></Link>
    //         <Link to="/transact"><button width="10px"> Transact </button></Link>
    //         <Link to="/transactions"><button width="10px"> All Transact </button></Link>


    //     </div>
    // )
//}