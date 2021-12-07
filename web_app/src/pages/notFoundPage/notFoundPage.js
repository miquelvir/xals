import React, {useState} from 'react';
import './notFoundPage.css'



function NotFoundPage() {

  return(
    <>
      <div class="headerName">Error 404: Not found page</div>
      <div class= "center">
          <img src= "not_found_trees.svg" width="400" height="280"/>
          <span class = "descriptionName">The page you are trying to access doesn't exist</span>
      </div>
    </>
    )
}

export default NotFoundPage