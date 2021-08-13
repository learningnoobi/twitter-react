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