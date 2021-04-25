import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    textfield : {
        width: '100%',
    },
  }));
const Search = () => {
    const classes = useStyles();
    const initialState = {
        searchText : '',
        amount : 15,
        url : 'https://pixabay.com/api',
        key : process.env.REACT_APP_API_KEY,
        images : [],
    }
    const [state,setState] = useState(initialState);
    const onTextChange = (e) => {
    
        setState(prevState => ({...prevState,searchText:e.target.value}))

    }
    
    return (
        <div>
            <TextField className={classes.textfield} id="standard-basic" label="Search For Images" value={state.searchText} onChange={onTextChange}  />
        </div>
    )
}

export default Search
