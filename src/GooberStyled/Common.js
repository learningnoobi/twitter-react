import React from "react";
import { setup, styled } from "goober";

setup(React.createElement);
export const Input = styled("div")(() => [
    {
     width:'100%',
     height:'50px',
     padding:10,
     background:'transparent',
     borderWidth:1,
     borderColor:'gray'

    },
  ]);

export const WarningText = styled("p")(()=>[
  {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    color:"#e0245e",
    marginTop:10,
  }
])
export const ModalContainer = styled("div")(() => [
  {
   width:'1000vh',
   height:'100vh',
   background:'#00000070',
   zIndex:20,
   padding:90,
  left:90,
   display:'flex',
   position:'absolute'

  },
]);
export const Modal = styled("div")(() => [
  {
   width:'500px',
   height:'500px',
   padding:50,
   background:'rgb(62, 64, 82)',
   zIndex:200,
  },
]);